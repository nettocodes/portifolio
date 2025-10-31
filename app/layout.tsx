import type { Metadata } from 'next'
import '@/styles/globals.css'
import ClientLayout from '@/components/layout/ClientLayout'

export const metadata: Metadata = {
  title: 'Ivo Braatz | Software Developer',
  description: 'Portfólio de Ivo Braatz - Desenvolvedor de Software especializado em soluções modernas e inovadoras',
  keywords: ['Ivo Braatz', 'Software Developer', 'Desenvolvedor', 'Portfolio', 'Web Development'],
  authors: [{ name: 'Ivo Braatz' }],
  openGraph: {
    title: 'Ivo Braatz | Software Developer',
    description: 'Portfólio de Ivo Braatz - Desenvolvedor de Software',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
