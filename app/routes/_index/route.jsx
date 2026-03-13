import { redirect } from "react-router";
import { authenticate } from "../../shopify.server";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const idToken = url.searchParams.get("id_token");

  // If Shopify is sending back OAuth/session params, process them
  if (shop && idToken) {
    try {
      await authenticate.admin(request);
    } catch (response) {
      // authenticate.admin throws redirects — let them through
      if (response instanceof Response) return response;
      throw response;
    }
  }

  return redirect("/app");
}

export default function Index() {
  return null;
}