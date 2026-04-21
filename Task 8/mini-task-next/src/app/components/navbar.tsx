// src/app/components/navbar.tsx
import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <span className="logo">AuthApp</span>
            </Link>
            
            <div className="nav-status">
                <Link href="/signin" className="outline-btn">
                    Sign In
                </Link>

                <Link href="/signup" className="solid-btn">
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}