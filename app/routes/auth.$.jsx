import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate, login } from "../shopify.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  // If shop is in the URL (e.g. /auth?shop=store.myshopify.com), start OAuth immediately
  // instead of redirecting to the login form. This fixes the "stuck on same page" loop.
  if (shop && request.method === "GET") {
    const loginResult = await login(request);
    if (loginResult instanceof Response) return loginResult;
  }

  await authenticate.admin(request);
  return null;
};

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
