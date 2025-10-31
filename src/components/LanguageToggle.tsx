'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import styles from './LanguageToggle.module.css'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const toggleLanguage = () => {
    const nextLocale = locale === 'pt' ? 'en' : 'pt'
    
    startTransition(() => {
      // Remove o prefixo do locale atual da URL
      const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
      router.replace(`/${nextLocale}${pathWithoutLocale}`)
    })
  }

  return (
    <button
      onClick={toggleLanguage}
      className={styles.toggle}
      aria-label={locale === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      title={locale === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      disabled={isPending}
    >
      <span className={styles.flag}>{locale === 'pt' ? '🇺🇸' : '🇧🇷'}</span>
      <span className={styles.code}>{locale === 'pt' ? 'EN' : 'PT'}</span>
    </button>
  )
}
