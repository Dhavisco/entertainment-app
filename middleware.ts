

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token and accessing a protected route, redirect to login
  const protectedRoutes = ["/home", "/movies", "/tv-series","/bookmarked"]; // Define protected routes
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Change to your login path
  }

  return NextResponse.next();
}

// Define routes where middleware should run
export const config = {
  matcher: [
    "/home", // Protect home
    "/movies", // Protect movies
    "/tv-series", // Protect tv-series
    "/bookmarked" // protect bookmarked
  ],
};
