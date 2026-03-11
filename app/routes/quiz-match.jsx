import Anthropic from "@anthropic-ai/sdk";
import { authenticate } from "../shopify.server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function action({ request }) {
  try {
    const body = await request.json();
    const { scentProfile } = body;

    console.log("Quiz match called with profile:", scentProfile);

    let products = [];

    try {
      const { admin } = await authenticate.public.appProxy(request);
      console.log("App proxy authenticated");

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
      console.log("Products fetched:", JSON.stringify(data).slice(0, 200));

      products = data.data.products.edges.map(({ node }) => ({
        title: node.title,
        description: node.descriptionHtml?.replace(/<[^>]*>/g, "").slice(0, 300) || "",
        price: `$${parseFloat(node.priceRangeV2.minVariantPrice.amount).toFixed(2)}`,
        image: node.featuredImage?.url || "",
        variantId: node.variants.edges[0]?.node.id.split("/").pop() || "",
      }));

      console.log("Product count:", products.length);
    } catch (authError) {
      console.error("Auth/products error:", authError.message);
      return Response.json(
        { matches: [], error: "Auth failed: " + authError.message },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (products.length === 0) {
      console.log("No products found");
      return Response.json(
        { matches: [], error: "No products found" },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
    }

    const productList = products
      .map((p, i) => `${i + 1}. "${p.title}": ${p.description}`)
      .join("\n");

    console.log("Calling Claude with", products.length, "products");

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `You are a perfume expert helping match customers to fragrances.

Customer scent profile: ${scentProfile}

Available perfumes:
${productList}

Return ONLY a valid JSON array of top 3 matches, no markdown, no explanation:
[{"index":1,"reason":"reason here"},{"index":2,"reason":"reason here"},{"index":3,"reason":"reason here"}]

Keep reasons under 15 words, poetic and personal.`,
        },
      ],
    });

    const responseText = message.content[0].text.trim();
    console.log("Claude response:", responseText);
    const clean = responseText.replace(/```json|```/g, "").trim();
    const matches = JSON.parse(clean);

    const result = matches.map((match) => {
      const product = products[match.index - 1];
      return {
        title: product.title,
        price: product.price,
        image: product.image,
        variantId: String(product.variantId),
        reason: match.reason,
      };
    });

    console.log("Returning matches:", result.length);

    return Response.json(
      { matches: result },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Quiz match error:", error.message);
    return Response.json(
      { matches: [], error: error.message },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
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