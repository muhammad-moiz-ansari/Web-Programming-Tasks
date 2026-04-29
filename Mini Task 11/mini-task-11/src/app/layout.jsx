// app/layout.jsx

import AuthProvider from "@/components/providers/SessionProvider"
import "./globals.css"

export const metadata = {
  title: "Mini Task 11 - Owner Employee System",
  description: "Mini task 11 for Web Programming - Owner Employee System with Next.js and NextAuth",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}