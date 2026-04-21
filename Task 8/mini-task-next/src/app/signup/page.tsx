// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { signupUser } from '../../actions/auth';
import Link from 'next/link';

export default function SignUp() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Grab the form data and send it to our server action
        const formData = new FormData(e.currentTarget);
        const result = await signupUser(formData);

        if (result && result.error) {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <section className="form-card">
            <h2>Register</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="reg-email">Email</label>
                    <input id="reg-email" name="email" type="email" placeholder="Enter email" required />
                </div>
                
                <div className="form-item">
                    <label htmlFor="reg-password">Password</label>
                    <input id="reg-password" name="password" type="password" placeholder="Enter password" required />
                </div>
                
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Account'}
                </button>
            </form>

            <div className="divider" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <span>
                    Already have an account?{' '}
                    <Link href="/signin" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 700 }}>
                        Sign In
                    </Link>
                </span>
            </div>
            
            {error && <div className="result-msg" id="reg-result" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </section>
    );
}