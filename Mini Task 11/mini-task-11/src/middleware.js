// src/middleware.js

import NextAuth from "next-auth"
import { authConfig } from "./lib/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl, auth: session } = req
  const isLoggedIn = Boolean(session)

  const isOwnerRoute = nextUrl.pathname.startsWith("/owner")
  const isEmployeeRoute = nextUrl.pathname.startsWith("/employee")
  const isAuthRoute = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/signup")

  // === If not logged in =======================================================
  if (!isLoggedIn) {
    // If route is for auth pages, access allowed
    if (isAuthRoute) 
			return NextResponse.next()

    // If route is anything else, redirect to login
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  // === If logged in ===========================================================
  const role = session.user.role

	// Logged in useds redirected to their dashboards
  if (isAuthRoute) {
    return NextResponse.redirect(new URL(role === "owner" ? "/owner" : "/employee", nextUrl))
  }

  // Employee trying to access owner routes, access denied
  if (isOwnerRoute && role !== "owner") {
    return NextResponse.redirect(new URL("/employee", nextUrl))
  }

  // Owner trying to access employee routes, nopes!
  if (isEmployeeRoute && role !== "employee") {
    return NextResponse.redirect(new URL("/owner", nextUrl))
  }

  return NextResponse.next()
})

// Middleware runs on these routes
export const config = {
  matcher: [
    "/owner/:path*",
    "/employee/:path*",
    "/login",
    "/signup",
  ],
}