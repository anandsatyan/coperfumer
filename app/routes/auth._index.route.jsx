import { redirect } from "react-router";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  if (shop) {
    return redirect(`/auth/login?shop=${encodeURIComponent(shop)}`);
  }
  return redirect("/auth/login");
}