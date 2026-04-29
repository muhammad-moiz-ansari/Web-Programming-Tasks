// lib/getSession.js

import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function getSession() {
  const session = await auth()
  return session
}

// Used in API routes to check auth + role in one call
export async function requireAuth(allowedRoles = []) {
  const session = await auth()

  if (!session) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),     // 401: Unauthorized
      session: null,
    }
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),        // 403: Forbidden
      session: null,
    }
  }

  return { error: null, session }
}