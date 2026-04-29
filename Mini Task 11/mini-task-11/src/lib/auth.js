// src/lib/auth.js

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import { authConfig } from "@/lib/auth.config"
import { CredentialsSignin } from "next-auth"

// Custom error class
class CustomAuthError extends CredentialsSignin {
  constructor(message) {
    super()
    this.code = message
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,    // Automatically copies pages and callbacks from config file
  // This is equal to manually importing pieces from config file
  //pages: authConfig.pages,
  //callbacks: authConfig.callbacks,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Runs when user submits login form

        if (!credentials?.email) {
          throw new CustomAuthError("Email is required")
        }
				if (!credentials?.password) {
          throw new CustomAuthError("Password is missing")
        }

        await connectDB()

        const user = await User.findOne({ email: credentials.email }).select("+password")

        if (!user) {
          throw new CustomAuthError("No account found with this email")
        }

        if (!user.isActive) {
          throw new CustomAuthError("Your account has been deactivated")
        }

        const isPasswordValid = await user.comparePassword(credentials.password)

        if (!isPasswordValid) {
          throw new CustomAuthError("Incorrect password")
        }

        // Do NOT return the password
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",    			// Using JWT
    maxAge: 7 * 24 * 60 * 60, // Session expiry date: 7 days
  },

  secret: process.env.NEXTAUTH_SECRET,
})