import { redirect } from "react-router";
import { authenticate } from "../../shopify.server";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const hmac = url.searchParams.get("hmac");

  // If this is an OAuth callback, let authenticate.admin handle it
  if (shop && hmac) {
    await authenticate.admin(request);
    return redirect("/app");
  }

  // Otherwise redirect to app
  return redirect("/app");
}

export default function Index() {
  return null;
}