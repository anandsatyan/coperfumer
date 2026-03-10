import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function action({ request }) {
  try {
    const body = await request.json();
    const { scentProfile, shop } = body;
    const shopDomain = shop || new URL(request.url).searchParams.get("shop");

    const productsRes = await fetch(
      `https://${shopDomain}/products.json?limit=50`
    );
    const productsData = await productsRes.json();
    const products = productsData.products.map((p) => ({
      title: p.title,
      description: p.body_html?.replace(/<[^>]*>/g, "").slice(0, 300) || "",
      price: `$${parseFloat(p.variants[0]?.price || 0).toFixed(2)}`,
      image: p.images[0]?.src || "",
      variantId: p.variants[0]?.id || "",
    }));

    if (products.length === 0) {
      return Response.json({ matches: [] });
    }

    const productList = products
      .map((p, i) => `${i + 1}. "${p.title}": ${p.description}`)
      .join("\n");

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

    return Response.json(
      { matches: result },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Quiz match error:", error.message);
    return Response.json(
      { matches: [], error: error.message },
      { status: 500 }
    );
  }
}

export async function loader({ request }) {
  return Response.json({ status: "ok" });
}