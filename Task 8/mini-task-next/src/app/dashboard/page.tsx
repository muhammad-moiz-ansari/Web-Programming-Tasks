// src/app/dashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutUser } from '../../actions/auth';

export default async function Dashboard() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session) {
        redirect('/signin');
    }

    return (
        <section>
            <div className="dashboard-card">
                <h2>Welcome to your Dashboard!</h2>
                
                <p>
                    You are securely logged in as: <br/>
                    <strong>{session.value}</strong>
                </p>

                <form action={logoutUser}>
                    <button type="submit" className="outline-btn">
                        Log Out Safely
                    </button>
                </form>
            </div>
        </section>
    );
}