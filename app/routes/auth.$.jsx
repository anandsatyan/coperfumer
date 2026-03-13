import { boundary } from "@shopify/shopify-app-react-router/server";
import { Outlet, useRouteError } from "react-router";

export async function loader({ request }) {
  return null;
}

export default function AuthLayout() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};