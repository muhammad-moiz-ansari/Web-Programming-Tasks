'use client';

import { useSession, signOut } from 'next-auth/react';

const roleBadgeStyles = {
  ADMIN: 'bg-purple-100 text-purple-700 border border-purple-200',
  AGENT: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
};

export default function Topbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role || 'AGENT';

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Left: Page breadcrumb */}
      <div>
        <h1 className="text-slate-800 font-semibold text-base leading-tight">
          Welcome back,{' '}
          <span className="text-indigo-600">{user?.name ?? 'User'}</span>
        </h1>
        <p className="text-slate-400 text-xs mt-0.5">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Right: Badge + Avatar + Sign out */}
      <div className="flex items-center gap-3">
        {/* Role badge */}
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${roleBadgeStyles[role]}`}
        >
          {role}
        </span>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold select-none">
          {initials}
        </div>

        {/* Sign out button */}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          title="Sign out"
          className="flex items-center gap-1.5 text-slate-500 hover:text-red-600 transition-colors text-sm font-medium px-2 py-1 rounded-lg hover:bg-red-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>
    </header>
  );
}
