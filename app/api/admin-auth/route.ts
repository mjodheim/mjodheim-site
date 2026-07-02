import { NextRequest, NextResponse } from "next/server";
import { issueAdminToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const MAX_AGE = 60 * 60 * 8; // 8 heures

export async function POST(req: NextRequest) {
  // Anti-brute-force : 5 tentatives / 10 min par IP.
  if (!rateLimit(`admin-auth:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez plus tard." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  const password = body?.password;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || typeof password !== "string" || password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Cookie SIGNÉ (HMAC) : le serveur peut vérifier qu'il l'a réellement émis.
  const token = await issueAdminToken(MAX_AGE);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}
