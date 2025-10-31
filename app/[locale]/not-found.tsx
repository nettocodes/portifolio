import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ParticleBackground from '@/components/ui/ParticleBackground';
import styles from './not-found.module.css';

export default function NotFound() {
  const t = useTranslations('notFound');
  
  return (
    <>
      <ParticleBackground />
      <Header />
      <main className={styles.container}>
        <div className="container">
          <div className={styles.content}>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>{t('title')}</h2>
            <p className={styles.description}>{t('description')}</p>
            <Link href="/" className="btn btn-primary">
              {t('backHome')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
