import { makeRouteHandler } from "@keystatic/next/route-handler";
import { notFound } from "next/navigation";
import config from "../../../../keystatic.config";

const { GET: _GET, POST: _POST } = makeRouteHandler({ config });

export async function GET(req: Request) {
  if (process.env.KEYSTATIC_DISABLE === "true") notFound();
  return _GET(req);
}

export async function POST(req: Request) {
  if (process.env.KEYSTATIC_DISABLE === "true") notFound();
  return _POST(req);
}
