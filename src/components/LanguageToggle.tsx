'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import styles from './LanguageToggle.module.css'

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className={styles.toggle}
      aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <span className={styles.flag}>{language === 'pt' ? '🇺🇸' : '🇧🇷'}</span>
      <span className={styles.code}>{language === 'pt' ? 'EN' : 'PT'}</span>
    </button>
  )
}
