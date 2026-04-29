// src/app/(auth)/login/page.jsx

"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
        email: formData.email,              // copy existing email value
        password: formData.password,        // copy existing password value
        [e.target.name]: e.target.value,    // update the changed field (email or password)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        setError("Invalid email or password.")
      } 
			else {
        setError("Something went wrong. Please try again.")
      }
      return
    }

		
    // Get session to know which dashboard to redirect to
    const session = await fetch("/api/auth/session").then(r => r.json())
    if (session?.user?.role === "owner")
      router.push("/owner")
    else
      router.push("/employee")
  }

	let errorMessage = "";
	if (error) {
		errorMessage = (
		<div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
      {error}
    </div>);
	}


	return (
		<section className="form-card">
        <h2>Register</h2>

				{errorMessage}

				<form onSubmit={handleSubmit} className="form">
					<div className="form-item">
							<label for="reg-username">Username</label>
							<input id="reg-username" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com"/>
					</div>
					<div className="form-item">
							<label for="reg-password">Password</label>
							<input id="reg-password" type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="******"/>
					</div>
					<button className="submit-btn" type="submit" disabled={loading}>
						{loading ? "Signing in..." : "Sign in"}
					</button>
					<div className="divider" style={{ marginTop: "10px", marginBottom: "10px" }}>
						<span>Already have an account? <a href="#login-card" style={{ color: "var(--primary-color)", textDecoration: "none", fontWeight: "700" }}>Sign In</a></span>
					</div>
					<p className="text-sm text-gray-500 text-center mt-6">
						Don&apos;t have an account?{" "}
						<Link href="/signup" className="text-blue-600 hover:underline font-medium">Sign up</Link>
					</p>
					<div className="result-msg" id="reg-result"></div>
				</form>
    </section>
	);
}