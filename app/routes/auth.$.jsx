import { redirect } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  // Do NOT redirect when Shopify is sending the user back to /auth/callback (OAuth code exchange).
  const isCallback = url.pathname.endsWith("/callback");
  // GET /auth?shop=... or /auth/login?shop=... → redirect to Shopify OAuth install.
  if (!isCallback && shop && request.method === "GET") {
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
