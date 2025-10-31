import type { ReactNode } from 'react'
import '@/styles/globals.css'

// Root layout - Define as tags HTML obrigatórias
export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
