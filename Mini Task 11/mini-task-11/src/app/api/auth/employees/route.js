// app/api/employees/route.js

import { connectDB } from "@/lib/db"
import User from "@/models/User"
import { requireAuth } from "@/lib/getSession"
import { NextResponse } from "next/server"

// === GET /api/employees =======================================================
// Only Owner can get list of all employees for assignment dropdown
export async function GET() {
  const { error } = await requireAuth(["owner"])
  if (error) 
    return error

  await connectDB()

  const employees = await User.find({ role: "employee" }).select("name email").sort({ name: 1 })

  return NextResponse.json(employees)
}