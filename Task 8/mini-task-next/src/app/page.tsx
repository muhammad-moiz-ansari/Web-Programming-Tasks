// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className="dashboard-card" style={{ backgroundColor: 'var(--cream-color)', border: '2px solid var(--primary-color)' }}>
        <h2 style={{ color: 'var(--primary-color)' }}>Welcome to AuthApp</h2>
        <p style={{ color: 'var(--dark-color)' }}>
          A secure, full-stack authentication system built with Next.js and MongoDB.
        </p>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
          <Link href="/signup" className="submit-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '10px 25px' }}>
            Get Started
          </Link>
          <Link href="/signin" className="outline-btn" style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}>
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
}