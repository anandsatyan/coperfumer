import Anthropic from "@anthropic-ai/sdk";
import { authenticate } from "../shopify.server";

const JSON_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

function jsonResponse(data, status = 200) {
  return Response.json(data, { status, headers: { ...JSON_HEADERS } });
}

export async function action({ request }) {
  try {
    if (!process.env.ANTHROPIC_API_KEY?.trim()) {
      console.error("Quiz match: ANTHROPIC_API_KEY is not set");
      return jsonResponse(
        { matches: [], error: "Server misconfiguration: Claude API key not set. Please contact the store owner." },
        500
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Quiz match: invalid request body", parseError);
      return jsonResponse(
        { matches: [], error: "Invalid request. Please try again." },
        400
      );
    }
    const { scentProfile } = body || {};
    const profileText = typeof scentProfile === "string" ? scentProfile : (scentProfile ? String(scentProfile) : "");

    console.log("Quiz match called with profile:", profileText || "(empty)");

    let products = [];

    try {
      const proxyContext = await authenticate.public.appProxy(request);
      const { admin, session } = proxyContext;
      const shopDomain = session?.shop ?? new URL(request.url).searchParams.get("shop");

      if (admin) {
        console.log("App proxy authenticated with session, using Admin API");
        const productsResponse = await admin.graphql(`
          query {
            products(first: 50) {
              edges {
                node {
                  title
                  descriptionHtml
                  priceRangeV2 {
                    minVariantPrice { amount currencyCode }
                  }
                  featuredImage { url }
                  variants(first: 1) {
                    edges { node { id } }
                  }
                }
              }
            }
          }
        `);
        const data = await productsResponse.json();
        products = (data.data?.products?.edges ?? []).map(({ node }) => ({
          title: node.title,
          description: node.descriptionHtml?.replace(/<[^>]*>/g, "").slice(0, 300) || "",
          price: `$${parseFloat(node.priceRangeV2?.minVariantPrice?.amount ?? 0).toFixed(2)}`,
          image: node.featuredImage?.url || "",
          variantId: node.variants?.edges?.[0]?.node?.id?.split("/").pop() || "",
        }));
      } else if (shopDomain) {
        console.log("App proxy validated, no session – fetching products from storefront:", shopDomain);
        const normalizedShop = shopDomain.includes(".") ? shopDomain : `${shopDomain}.myshopify.com`;
        const productsRes = await fetch(`https://${normalizedShop}/products.json?limit=50`);
        const productsData = await productsRes.json();
        products = (productsData.products ?? []).map((p) => ({
          title: p.title,
          description: p.body_html?.replace(/<[^>]*>/g, "").slice(0, 300) || "",
          price: `$${parseFloat(p.variants?.[0]?.price ?? 0).toFixed(2)}`,
          image: p.images?.[0]?.src ?? "",
          variantId: String(p.variants?.[0]?.id ?? ""),
        }));
      } else {
        console.error("App proxy: no admin and no shop in request");
        return jsonResponse(
          { matches: [], error: "Could not identify store. Open the app in Shopify admin once, then try again." },
          403
        );
      }

      console.log("Product count:", products.length);
    } catch (authError) {
      console.error("Auth/products error:", authError.message);
      return jsonResponse({ matches: [], error: "Auth failed: " + authError.message }, 403);
    }

    if (products.length === 0) {
      console.log("No products found");
      return jsonResponse({ matches: [], error: "No products found" });
    }

    const productList = products
      .map((p, i) => `${i + 1}. "${p.title}": ${p.description}`)
      .join("\n");

    console.log("Calling Claude with", products.length, "products");

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    let message;
    try {
      message = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `You are a perfume expert helping match customers to fragrances.

Customer scent profile: ${profileText || "Not provided"}

Available perfumes:
${productList}

Return ONLY a valid JSON array of exactly 3 matches, no markdown, no explanation. Use 1-based index into the list above. Format:
[{"index":1,"reason":"reason here"},{"index":2,"reason":"reason here"},{"index":3,"reason":"reason here"}]

Keep reasons under 15 words, poetic and personal.`,
          },
        ],
      });
    } catch (apiError) {
      const msg = apiError?.message ?? String(apiError);
      console.error("Claude API error:", msg);
      const userMsg =
        msg.includes("api_key") || msg.includes("API key") || msg.includes("401")
          ? "Server misconfiguration: invalid Claude API key. Please contact the store owner."
          : msg.includes("429") || msg.includes("rate")
            ? "Too many requests. Please try again in a moment."
            : "Matching is temporarily unavailable. Please try again.";
      return jsonResponse({ matches: [], error: userMsg }, 500);
    }

    const content = message?.content;
    if (!Array.isArray(content) || content.length === 0) {
      console.error("Claude response: empty content", content);
      return jsonResponse({ matches: [], error: "No response from matching service. Please try again." }, 500);
    }

    const textBlock = content.find((b) => b.type === "text" && b.text);
    const responseText = textBlock?.text?.trim() ?? "";
    if (!responseText) {
      console.error("Claude response: no text block", content.map((b) => b.type));
      return jsonResponse({ matches: [], error: "Invalid response from matching service. Please try again." }, 500);
    }

    console.log("Claude response:", responseText.slice(0, 200));

    const clean = responseText.replace(/```json|```/g, "").trim();
    let matches;
    try {
      const arrayMatch = clean.match(/\[[\s\S]*\]/);
      const jsonStr = arrayMatch ? arrayMatch[0] : clean;
      matches = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error("Claude response parse error:", parseErr.message, "raw:", responseText.slice(0, 300));
      return jsonResponse(
        { matches: [], error: "Could not read match results. Please try again." },
        500
      );
    }

    if (!Array.isArray(matches)) {
      console.error("Claude response: not an array", typeof matches);
      return jsonResponse({ matches: [], error: "Invalid match format. Please try again." }, 500);
    }

    const result = matches
      .filter((m) => m && Number.isInteger(m.index) && m.index >= 1 && m.index <= products.length && m.reason)
      .slice(0, 3)
      .map((match) => {
        const product = products[match.index - 1];
        return {
          title: product.title,
          price: product.price,
          image: product.image,
          variantId: String(product.variantId),
          reason: String(match.reason).slice(0, 200),
        };
      });

    console.log("Returning matches:", result.length);

    return Response.json(
      { matches: result },
      {
        headers: {
          ...JSON_HEADERS,
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Quiz match error:", error?.message ?? error);
    return jsonResponse(
      { matches: [], error: error?.message ?? "Something went wrong. Please try again." },
      500
    );
  }
}

export async function loader({ request }) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
  return Response.json({ status: "ok" });
}