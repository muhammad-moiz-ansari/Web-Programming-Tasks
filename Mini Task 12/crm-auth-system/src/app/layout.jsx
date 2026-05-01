import './globals.css';
import { SessionProvider } from '@/components/providers/SessionProvider';

export const metadata = {
  title: 'CRM System',
  description: 'Customer Relationship Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
