import { NextIntlClientProvider } from 'next-intl';
import { headers } from 'next/headers';
import NotFoundContent from './NotFoundContent';

export default async function NotFound() {
  // Detecta o locale da URL
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  // Extrai o locale da URL (pt ou en)
  const locale = pathname.startsWith('/en') ? 'en' : 'pt';
  
  // Carrega as mensagens do locale detectado
  const messages = (await import(`../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <NotFoundContent />
    </NextIntlClientProvider>
  );
}
