import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { useActionData, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import { loginErrorMessage } from "./error.server";

export const loader = async ({ request }) => {
  const result = await login(request);
  if (result instanceof Response) return result;
  const errors = loginErrorMessage(result);
  const url = new URL(request.url);
  return { errors, apiKey: process.env.SHOPIFY_API_KEY || "", shop: url.searchParams.get("shop") || "" };
};

export const action = async ({ request }) => {
  const result = await login(request);
  if (result instanceof Response) return result;
  const errors = loginErrorMessage(result);
  const formData = await request.formData();
  return { errors, apiKey: process.env.SHOPIFY_API_KEY || "", shop: formData.get("shop") || "" };
};

export default function Auth() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const { errors, apiKey, shop } = actionData || loaderData;

  return (
    <AppProvider embedded apiKey={apiKey}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        background: "#f5f5f5"
      }}>
        <div style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          width: "360px"
        }}>
          <h2 style={{ marginBottom: "8px", color: "#6B1A2A", fontFamily: "Georgia, serif" }}>
            Coperfumer
          </h2>
          <p style={{ marginBottom: "24px", color: "#888", fontSize: "14px" }}>
            Enter your shop domain to install the app.
          </p>
          <form method="post">
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#666" }}>
                Shop domain
              </label>
              <input
                type="text"
                name="shop"
                defaultValue={shop}
                placeholder="your-store.myshopify.com"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  boxSizing: "border-box"
                }}
              />
              {errors?.shop && (
                <p style={{ color: "#c00", fontSize: "13px", marginTop: "6px" }}>
                  {errors.shop}
                </p>
              )}
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#6B1A2A",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Install App
            </button>
          </form>
        </div>
      </div>
    </AppProvider>
  );
}