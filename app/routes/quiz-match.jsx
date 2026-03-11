import Anthropic from "@anthropic-ai/sdk";
import { authenticate } from "../shopify.server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function action({ request }) {
  try {
    const body = await request.json();
    const { scentProfile } = body;

    // Use app proxy authentication to get admin API access
    const { admin } = await authenticate.public.appProxy(request);

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
    const products = data.data.products.edges.map(({ node }) => ({
      title: node.title,
      description: node.descriptionHtml?.replace(/<[^>]*>/g, "").slice(0, 300) || "",
      price: `$${parseFloat(node.priceRangeV2.minVariantPrice.amount).toFixed(2)}`,
      image: node.featuredImage?.url || "",
      variantId: node.variants.edges[0]?.node.id.split("/").pop() || "",
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
    const clean = responseText.replace(/```json|```/g