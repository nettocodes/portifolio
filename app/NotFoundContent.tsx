'use client'

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/ui/ParticleBackground'
import { ThemeProvider } from '@/contexts/ThemeContext'
import styles from './not-found.module.css';

export default function NotFoundContent() {
  const t = useTranslations('notFound');

  return (
    <ThemeProvider>
      <ParticleBackground />
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
          <Link href="/" className={styles.button}>
            {t('backHome')}
          </Link>
        </div>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
