import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Assignment for Ankush',
  description: 'Created by Ankush'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
