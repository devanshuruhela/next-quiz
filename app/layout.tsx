import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

const nuntino = Nunito({weight:"400", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Quiz',
  description: 'Quiz web app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nuntino.className}>{children}</body>
    </html>
  )
}
