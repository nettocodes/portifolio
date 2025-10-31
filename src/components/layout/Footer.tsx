'use client'

import { PERSONAL_INFO, NAV_ITEMS, SOCIAL_LINKS } from '@/constants/data'
import { useLanguage } from '@/contexts/LanguageContext'
import { GitHubIcon, LinkedInIcon, EmailIcon, MapPinIcon } from '@/components/ui/Icons'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useLanguage()
  
  const getSocialIcon = (name: string) => {
    switch(name) {
      case 'GitHub': return <GitHubIcon />
      case 'LinkedIn': return <LinkedInIcon />
      case 'Email': return <EmailIcon />
      default: return null
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <span>{PERSONAL_INFO.name.split(' ')[0]}</span>
              <span className={styles.dot}>.</span>
            </div>
            <p className={styles.tagline}>{PERSONAL_INFO.title}</p>
            <p className={styles.bio}>{t('hero.bio')}</p>
            <div className={styles.location}>
              <MapPinIcon />
              <span>{t('footer.location')}</span>
            </div>
          </div>

          <div className={styles.footerNav}>
            <h4>{t('footer.navigation')}</h4>
            {NAV_ITEMS.map((item, index) => (
              <a key={item.href} href={item.href}>{t(`nav.${['about', 'experience', 'projects', 'contact'][index]}`)}</a>
            ))}
          </div>

          <div className={styles.footerSocial}>
            <h4>{t('footer.social')}</h4>
            {SOCIAL_LINKS.map(link => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                {getSocialIcon(link.name)}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. {t('footer.rights')}</p>
          <div className={styles.footerMeta}>
            <span>Next.js</span>
            <span className={styles.separator}>•</span>
            <span>TypeScript</span>
            <span className={styles.separator}>•</span>
            <span>Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
