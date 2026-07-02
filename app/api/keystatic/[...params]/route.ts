import { makeRouteHandler } from "@keystatic/next/route-handler";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import config from "../../../../keystatic.config";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

const { GET: _GET, POST: _POST } = makeRouteHandler({ config });

// Défense en profondeur : on revérifie le cookie admin signé DANS le handler,
// pas seulement dans proxy.ts. Ainsi un éventuel contournement du middleware
// (cf. advisories Next.js segment-prefetch) ne donne pas accès à l'API du CMS.
async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

export async function GET(req: Request) {
  if (process.env.KEYSTATIC_DISABLE === "true") notFound();
  if (!(await isAdmin())) notFound();
  return _GET(req);
}

export async function POST(req: Request) {
  if (process.env.KEYSTATIC_DISABLE === "true") notFound();
  if (!(await isAdmin())) notFound();
  return _POST(req);
}
