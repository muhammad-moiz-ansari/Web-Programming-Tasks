// src/app/components/footer.tsx
export default function Footer() {
    return (
        <footer>
            <div className="logo" style={{ marginBottom: '8px', fontSize: '20px' }}>
                MA<span style={{ color: 'var(--dark-color)' }}>DEV</span>
            </div>
            <p>&copy; 2026 Moiz Ansari. All rights reserved.</p>
        </footer>
    );
}