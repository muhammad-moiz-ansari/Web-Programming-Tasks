// app/(auth)/signup/page.jsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "agent",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error)
      return
    }

    // If signed up, redirect to login
    router.push("/login?registered=true")
  }

	let errorMessage = "";
	if (error) {
		errorMessage = (
		<div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
      {error}
    </div>);
	}

  return (
    <main>
      <section id="signup-section">
        <section id="form-container" className="form-card">
          <h2>Create account</h2>
          
          {error && (
            <div className="result-msg error">
              {error}
            </div>
          )}

          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className="form-item">
                <label>
                  Full Name:
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Light Yagami" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="form-item">
                <label>
                  Email:
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="name@example.com" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="form-item">
                <label>
                  Password:
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="Min 6 characters" 
                    required 
                    value={formData.password}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="form-item">
                <label>
                  Role:
                  <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
              </div>

              <div className="form-item">
                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </div>
            </form>
          </div>

          <div className="divider">
            <hr />
            <span></span>
            <hr />
          </div>

          <p className="redirect-text">
            Already have an account?{" "}
            <Link href="/login" className="redirect-link">
              Sign in
            </Link>
          </p>

        </section>
      </section>
    </main>
  );
}