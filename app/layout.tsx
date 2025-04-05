import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/providers'

export const metadata: Metadata = {
  title: 'Just Do It',
  description: 'Make your life better',
  manifest: '/manifest.json',
  themeColor: '#000000',
  viewport:
    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Just Do It'
  },
  icons: {
    icon: [
      { url: '/justdoit.svg', sizes: '192x192', type: 'image/svg' },
      { url: '/justdoit.svg', sizes: '512x512', type: 'image/svg' }
    ],
    apple: [{ url: '/justdoit.svg' }]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='bg-[#1e1e1e]'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
