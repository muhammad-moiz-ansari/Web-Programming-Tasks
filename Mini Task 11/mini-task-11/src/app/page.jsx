// app/page.jsx

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function RootPage() {
  const session = await auth()

  // Not logged in
  if (!session || !session.user) {
    redirect("/login")
  }

  // Logged in
  if (session.user.role === "owner") {
    redirect("/owner")
  } 
  else {
    redirect("/employee")
  }
}