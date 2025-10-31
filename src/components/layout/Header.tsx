'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, SOCIAL_LINKS } from '@/constants/data'
import { useTranslations, useLocale } from 'next-intl'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'
import styles from './Header.module.css'

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  
  // Check if we're on the home page
  const isHomePage = pathname === `/${locale}` || pathname === '/'

  const getNavLabel = (label: string) => {
    const labelMap: { [key: string]: string } = {
      'Sobre': 'about',
      'Experiência': 'experience',
      'Projetos': 'projects',
      'Contato': 'contact'
    }
    return t(labelMap[label] || label.toLowerCase())
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Detect active section
      const sections = NAV_ITEMS.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <a href={isHomePage ? '#hero' : `/${locale}#hero`} className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoText}>IVO</span>
          <span className={styles.logoDot}>.</span>
        </a>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          {NAV_ITEMS.map((item, index) => {
            // If not on home page, link to home with anchor, otherwise just anchor
            const href = isHomePage ? item.href : `/${locale}${item.href}`
            
            return (
              <a
                key={item.href}
                href={href}
                className={`${styles.navLink} ${activeSection === item.href.substring(1) ? styles.active : ''}`}
                onClick={closeMenu}
                style={{ transitionDelay: isMenuOpen ? `${index * 0.1}s` : '0s' }}
              >
                <span className={styles.navNumber}>0{index + 1}</span>
                <span className={styles.navLabel}>{getNavLabel(item.label)}</span>
              </a>
            )
          })}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <LanguageToggle />
          
          <div className={styles.socialLinks}>
            {SOCIAL_LINKS.slice(0, 2).map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={link.name}
              >
                {link.name === 'GitHub' && <GitHubIcon />}
                {link.name === 'LinkedIn' && <LinkedInIcon />}
              </a>
            ))}
          </div>

          <button
            className={`${styles.menuBtn} ${isMenuOpen ? styles.menuBtnOpen : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
