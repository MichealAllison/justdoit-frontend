import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Just Do It',
  description: ' Make your life better'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className=''>{children}</body>
    </html>
  )
}
