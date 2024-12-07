// import NextAuth from "next-auth";
// import { authConfig } from "./src/app/(auth)/auth.config";

// export default NextAuth(authConfig).auth;

// export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] };

 import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware to check authentication
export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value;

  // If token exists, continue to the requested route
  if (token) {
    return NextResponse.next();
  }

  // Redirect to login if token is missing or invalid
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("callbackUrl", req.url); // Optionally, redirect back to the original page after login
  return NextResponse.redirect(loginUrl);
}

// Configuration to match protected routes
export const config = {
  matcher: [
    "/home", // Protect home
    "/movies", // Protect movies
    "/tv-series", // Protect tv-series
    "/bookmarked" // protect bookmarked
  ],
};
