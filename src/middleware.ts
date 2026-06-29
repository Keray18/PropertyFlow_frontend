import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = [
  "/dashboard",
  "/properties",
  "/leads",
  "/profile",
  "/settings",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isLogin = pathname.startsWith("/login");

  if (!isProtected && !isLogin) {
    return NextResponse.next();
  }

  const sessionUrl = new URL("/api/auth/me", request.url);
  const cookie = request.headers.get("cookie") || "";

  let isAuthed = false;

  try {
    const response = await fetch(sessionUrl, {
      headers: { cookie },
      cache: "no-store",
    });
    isAuthed = response.ok;
  } catch {
    isAuthed = false;
  }

  if (isProtected && !isAuthed) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLogin && isAuthed) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/properties/:path*",
    "/leads/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
  ],
};
