import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { useState } from "react";
import { useActionData, useLoaderData, redirect } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { login } from "../../shopify.server";
import { loginErrorMessage } from "./error.server";

const API_KEY = process.env.SHOPIFY_API_KEY;

function buildInstallRedirect(shopRaw) {
  if (!API_KEY || !shopRaw || typeof shopRaw !== "string") return null;
  const host = shopRaw.replace(/^https?:\/\//, "").replace(/\/$/, "").trim();
  const shopDomain = host.includes(".") ? host : `${host}.myshopify.com`;
  return `https://${shopDomain}/admin/oauth/install?client_id=${API_KEY}`;
}

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  if (request.method === "GET" && shop) {
    const installUrl = buildInstallRedirect(shop);
    if (installUrl) throw redirect(installUrl);
  }
  const result = await login(request);
  if (result instanceof Response) return result;
  const errors = loginErrorMessage(result);
  return { errors, apiKey: API_KEY || "", shop: url.searchParams.get("shop") || "" };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const shopFromForm = formData.get("shop");
  if (shopFromForm) {
    const installUrl = buildInstallRedirect(String(shopFromForm));
    if (installUrl) throw redirect(installUrl);
  }
  const result = await login(request);
  if (result instanceof Response) return result;
  const errors = loginErrorMessage(result);
  return { errors, apiKey: API_KEY || "", shop: String(shopFromForm || "") };
};

export default function Auth() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const { errors, apiKey, shop: shopFromUrl } = actionData || loaderData;
  const [shop, setShop] = useState(shopFromUrl || "");

  return (
    <AppProvider embedded apiKey={apiKey}>
      <s-page>
        {/* Native form so submit does a full page POST; browser then follows 302 to Shopify. */}
        <form method="post" action="/auth/login">
          <s-section heading="Log in">
            <label htmlFor="shop-domain">Shop domain</label>
            <input
              id="shop-domain"
              type="text"
              name="shop"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              placeholder="example.myshopify.com"
              autoComplete="on"
              style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%", maxWidth: "320px" }}
            />
            {errors?.shop && <p style={{ color: "#c00", marginTop: 0 }}>{errors.shop}</p>}
            <button type="submit">Log in</button>
          </s-section>
        </form>
      </s-page>
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error();
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
