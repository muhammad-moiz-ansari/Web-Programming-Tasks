'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
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
    if (!form.email) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
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

    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setServerError('Invalid email or password. Please try again.');
      return;
    }

    // Fetch session to determine role-based redirect
    const res = await fetch('/api/auth/session');
    const session = await res.json();
    const role = session?.user?.role;

    router.push(role === 'ADMIN' ? '/admin' : '/agent');
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1e293b] flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-indigo-600/20" />
        <div className="absolute bottom-[-60px] left-[-60px] w-48 h-48 rounded-full bg-indigo-500/10" />

        <div className="relative z-10 text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-900/50">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          <h2 className="text-white text-3xl font-bold mb-3">CRM System</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Streamline your sales pipeline, manage leads, and track team performance — all in one place.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 text-left">
            {['Role-based Access', 'Real-time Analytics', 'Lead Management', 'Team Insights'].map((f) => (
              <div key={f} className="bg-slate-800 rounded-xl px-3 py-2 text-slate-300 text-xs font-medium flex items-center gap-2">
                <span className="text-indigo-400">✓</span> {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Sign in to your account</h1>
            <p className="text-slate-500 text-sm mt-1">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-indigo-600 font-medium hover:underline">
                Create one
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
              placeholder="••••••••"
              required
            />

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
                    Signing in…
                  </span>
                ) : (
                  'Sign in'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
