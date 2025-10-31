import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ClientLayout from '@/components/layout/ClientLayout'
import { routing } from '@/i18n/routing';

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Valida que o locale é suportado
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Carrega as mensagens para o locale atual
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ClientLayout>
        {children}
      </ClientLayout>
    </NextIntlClientProvider>
  )
}
