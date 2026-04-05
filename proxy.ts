import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "mjodheim_admin_auth";
const COOKIE_VALUE = "granted";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/keystatic") || pathname.startsWith("/api/keystatic")) {
    const cookie = req.cookies.get(COOKIE_NAME);
    if (cookie?.value !== COOKIE_VALUE) {
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
