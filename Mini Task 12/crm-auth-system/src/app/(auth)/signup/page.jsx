'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'AGENT',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setServerError('');
  }

  function validate() {
    const errs = {};
    if (!form.name || form.name.trim().length < 2)
      errs.name = 'Name must be at least 2 characters';
    if (!form.email) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      errs.email = 'Invalid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6)
      errs.password = 'Password must be at least 6 characters';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || 'Something went wrong. Please try again.');
        return;
      }

      // Redirect to login on success
      router.push('/login?registered=true');
    } catch {
      setServerError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1e293b] flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-indigo-600/20" />
        <div className="absolute bottom-[-60px] left-[-60px] w-48 h-48 rounded-full bg-indigo-500/10" />

        <div className="relative z-10 text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-900/50">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          <h2 className="text-white text-3xl font-bold mb-3">Join CRM System</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Create your account and start managing your sales pipeline with powerful tools built for modern teams.
          </p>

          <div className="mt-8 space-y-3 text-left">
            {[
              { icon: '🔒', text: 'Secure role-based authentication' },
              { icon: '📊', text: 'Real-time performance analytics' },
              { icon: '🚀', text: 'Built for speed and scale' },
            ].map((item) => (
              <div key={item.text} className="bg-slate-800 rounded-xl px-4 py-3 text-slate-300 text-sm flex items-center gap-3">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Signup form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Create your account</h1>
            <p className="text-slate-500 text-sm mt-1">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {serverError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
              <span>⚠️</span> {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FormField
              label="Full Name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Jane Smith"
              required
            />
            <FormField
              label="Email address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              required
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="At least 6 characters"
              required
            />

            {/* Role selector */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="role" className="text-sm font-medium text-slate-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg text-sm border border-slate-300 bg-white text-slate-800
                  hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  transition-all duration-200"
              >
                <option value="AGENT">Agent</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-full py-3"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating account…
                  </span>
                ) : (
                  'Create account'
                )}
              </Button>
            </div>
          </form>

          <p className="text-slate-400 text-xs text-center mt-6">
            By signing up, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
