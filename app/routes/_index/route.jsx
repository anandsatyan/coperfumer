import { redirect } from "react-router";
import { authenticate } from "../../shopify.server";
import prisma from "../../db.server";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const idToken = url.searchParams.get("id_token");

  if (shop && idToken) {
    try {
      await authenticate.admin(request);
    } catch (response) {
      if (response instanceof Response) {
        // Check DB immediately after session creation
        try {
          const sessions = await prisma.session.findMany();
          console.log("Sessions in DB after auth:", sessions.length);
          console.log("Session IDs:", sessions.map(s => s.id));
        } catch (e) {
          console.log("DB read error:", e.message);
        }
        return response;
      }
      throw response;
    }
  }

  return redirect("/app");
}

export default function Index() {
  return null;
}