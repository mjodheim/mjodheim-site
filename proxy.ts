import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/keystatic") || pathname.startsWith("/api/keystatic")) {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    // Cookie SIGNÉ vérifié (HMAC + expiration) : un cookie forgé est rejeté.
    if (!(await verifyAdminToken(token))) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin-login";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};
