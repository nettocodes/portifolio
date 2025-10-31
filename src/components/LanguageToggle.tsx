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
      // Remove todos os prefixos de locale da URL (caso tenha múltiplos)
      let pathWithoutLocale = pathname
      
      // Remove /pt e /en do início do path repetidamente
      while (pathWithoutLocale.startsWith('/pt') || pathWithoutLocale.startsWith('/en')) {
        pathWithoutLocale = pathWithoutLocale.replace(/^\/(pt|en)/, '')
      }
      
      // Se ficou vazio ou não tem locale, volta para home
      if (!pathWithoutLocale || pathWithoutLocale === '' || !pathname.match(/^\/(pt|en)/)) {
        pathWithoutLocale = '/'
      }
      
      // Se não começar com /, adiciona
      if (!pathWithoutLocale.startsWith('/')) {
        pathWithoutLocale = '/' + pathWithoutLocale
      }
      
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
