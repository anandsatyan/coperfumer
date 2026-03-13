import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { useState } from "react";
import { Form, useActionData, useLoaderData, redirect } from "react-router";
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
        <Form method="post" action="/auth/login">
          <s-section heading="Log in">
            <input type="hidden" name="shop" value={shop} />
            <s-text-field
              label="Shop domain"
              details="example.myshopify.com"
              value={shop}
              onChange={(e) => setShop(e.currentTarget.value)}
              autocomplete="on"
              error={errors?.shop}
            ></s-text-field>
            <s-button type="submit">Log in</s-button>
          </s-section>
        </Form>
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
