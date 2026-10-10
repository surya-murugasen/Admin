import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Central Admin',
  description: 'Centralized Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
