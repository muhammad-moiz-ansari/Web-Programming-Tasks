// src/app/signin/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { loginUser } from '../../actions/auth'; 

export default function SignIn() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        
        const result = await loginUser(formData);
        if (result && result.error) {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <section className="form-card" id="login-card">
            <h2>Login</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="login-email">Email</label>
                    <input id="login-email" name="email" type="email" placeholder="Enter email" required />
                </div>
                
                <div className="form-item">
                    <label htmlFor="login-password">Password</label>
                    <input id="login-password" name="password" type="password" placeholder="Enter password" required />
                </div>
                
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            <div className="divider" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <span>
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 700 }}>
                        Sign Up
                    </Link>
                </span>
            </div>

            {error && <div className="result-msg" id="log-result" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </section>
    );
}