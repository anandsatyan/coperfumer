import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider as ShopifyAppProvider } from "@shopify/shopify-app-react-router/react";
import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  const sessions = await prisma.session.findMany();
  console.log("Sessions in DB BEFORE auth:", sessions.length, sessions.map(s => s.id));
  try {
    await authenticate.admin(request);
    console.log("Sessions in DB AFTER auth:", sessions.length);
    return { apiKey: process.env.SHOPIFY_API_KEY || "" };
  } catch (e) {
    if (e instanceof Response) {
      console.log("/app auth redirect:", e.status, e.headers.get("Location"));
    } else {
      console.log("/app auth error:", e?.message || String(e));
    }
    throw e;
  }
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <ShopifyAppProvider embedded apiKey={apiKey}>
      <PolarisAppProvider i18n={enTranslations}>
        <s-app-nav>
          <s-link href="/app">Home</s-link>
          <s-link href="/app/quiz">Quiz Builder</s-link>
        </s-app-nav>
        <Outlet />
      </PolarisAppProvider>
    </ShopifyAppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};