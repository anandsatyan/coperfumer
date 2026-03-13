import { redirect } from "react-router";

/**
 * GET /auth?shop=store.myshopify.com → redirect to Shopify OAuth install.
 * This route runs when the user hits /auth exactly (no /auth/login).
 */
export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const apiKey = process.env.SHOPIFY_API_KEY;

  if (request.method !== "GET" || !shop?.trim() || !apiKey) {
    return redirect("/auth/login" + (shop ? `?shop=${encodeURIComponent(shop)}` : ""));
  }

  const host = shop.replace(/^https?:\/\//, "").replace(/\/$/, "").trim();
  const shopDomain = host.includes(".") ? host : `${host}.myshopify.com`;
  const installUrl = `https://${shopDomain}/admin/oauth/install?client_id=${apiKey}`;

  throw redirect(installUrl);
}
