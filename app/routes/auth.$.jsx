import { redirect } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  // GET /auth?shop=store.myshopify.com → redirect straight to Shopify OAuth install.
  // The library's login() throws redirect(); we do it ourselves so the redirect always runs.
  if (shop && request.method === "GET") {
    const host = shop
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "")
      .trim();
    const shopDomain = host.includes(".") ? host : `${host}.myshopify.com`;
    const apiKey = process.env.SHOPIFY_API_KEY;
    if (apiKey) {
      const installUrl = `https://${shopDomain}/admin/oauth/install?client_id=${apiKey}`;
      throw redirect(installUrl);
    }
  }

  await authenticate.admin(request);
  return null;
};

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
