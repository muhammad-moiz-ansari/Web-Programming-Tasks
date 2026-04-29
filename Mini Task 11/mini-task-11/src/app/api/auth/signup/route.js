// app/api/auth/signup/route.js

import { connectDB } from "@/lib/db"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, password, role } = body

    // === Validation ==============================================================
    if (!name || !email || !password) {
			let errorString;
      let errCount = 0;
      if (!name) {
        errorString = "Name";
        errCount++;
      }
      if (!email)
        errCount++;
      if (!password)
        errCount++;

      if (!email) {
        if (errCount == 1)
          errorString = "Email";
        else if (errCount == 2)
          errorString += " and email";
        else
          errorString += ", Email";
      }

      if (!password) {
        if (errCount == 1)
          errorString = "Password";
        else if (errCount == 2)
          errorString += " and password";
        else
          errorString += ", Password";
      }

      if (errCount == 1)
        errorString += " is required";
      else if (errCount == 2)
        errorString += " are required";

      /*
			if (!name)
				errorString = "Name is missing";
			else if (!email)
				errorString = "Email is required";
			else if (!password)
				errorString = "Password is missing";
      else if (!name && !email)
        errorString = "Name and email are required";
      else if (!name && !password)
        errorString = "Name and password are required";
      else if (!email && !password)
        errorString = "Email and password are required";
      else
        errorString = "Name, email and password are required";
      */

      return NextResponse.json(
        { error: errorString },
        { status: 400 }		// 400: Bad Request
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }		// 400: Bad Request
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }		// 400: Bad Request
      )
    }

    await connectDB()

    // === Check duplicate =========================================================
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 } 	// 409: Conflict
      )
    }

    // === Create user ============================================================
    // Password hashing done in pre-save hook in User model
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role === "owner" ? "owner" : "employee",
    })

    // Returns user without password
    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }		// 201: Created (Success)
    )
  } 
	catch (error) {
    console.error("Signup error: ", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }		// 500: Internal Server Error
    )
  }
}