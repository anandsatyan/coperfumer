import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { useState } from "react";
import { Form, useActionData, useLoaderData } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { login } from "../../shopify.server";
import { loginErrorMessage } from "./error.server";

export const loader = async ({ request }) => {
  const result = await login(request);
  if (result instanceof Response) return result;

  const errors = loginErrorMessage(result);
  return { errors, apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export const action = async ({ request }) => {
  const result = await login(request);
  if (result instanceof Response) return result;

  const errors = loginErrorMessage(result);
  return { errors, apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function Auth() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const [shop, setShop] = useState("");
  const { errors, apiKey } = actionData || loaderData;

  return (
    <AppProvider embedded apiKey={apiKey}>
      <s-page>
        <Form method="post">
          <s-section heading="Log in">
            <s-text-field
              name="shop"
              label="Shop domain"
              details="example.myshopify.com"
              value={shop}
              onChange={(e) => setShop(e.currentTarget.value)}
              autocomplete="on"
              error={errors.shop}
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
