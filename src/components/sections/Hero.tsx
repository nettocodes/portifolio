'use client'

import { PERSONAL_INFO } from '@/constants/data'
import { useTranslations, useLocale } from 'next-intl'
import TypingEffect from '@/components/ui/TypingEffect'
import styles from './Hero.module.css'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  
  const roles = locale === 'pt' 
    ? [
        'Desenvolvedor de Software',
        'Engenheiro Full Stack',
        'Arquiteto de Sistemas',
        'Solucionador de Problemas'
      ]
    : [
        'Software Developer',
        'Full Stack Engineer',
        'System Architect',
        'Problem Solver'
      ]

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.grid}>
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className={styles.gridItem} />
          ))}
        </div>
      </div>

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <div className={styles.heroLabel}>
            <span className={styles.labelDot}></span>
            <span>{t('label')}</span>
          </div>

          <h1 className={styles.heroTitle}>
            {PERSONAL_INFO.name}
          </h1>

          <div className={styles.heroSubtitle}>
            <TypingEffect texts={roles} />
          </div>

          <p className={styles.heroBio}>
            {t('bio')}
          </p>

          <div className={styles.heroActions}>
            <button onClick={scrollToContact} className={styles.btnPrimary}>
              <span>{t('contactButton')}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                <path d="M1 8h14M8 1l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button onClick={scrollToProjects} className={styles.btnSecondary}>
              <span>{t('projectsButton')}</span>
            </button>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>5+</div>
              <div className={styles.statLabel}>{t('yearsExperience')}</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <div className={styles.statValue}>50+</div>
              <div className={styles.statLabel}>{t('projectsCompleted')}</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <div className={styles.statValue}>20+</div>
              <div className={styles.statLabel}>{t('happyClients')}</div>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeDot} style={{ background: '#ff5f56' }}></span>
              <span className={styles.codeDot} style={{ background: '#ffbd2e' }}></span>
              <span className={styles.codeDot} style={{ background: '#27c93f' }}></span>
            </div>
            <div className={styles.codeContent}>
              <div className={styles.codeLine}>
                <span className={styles.codeKeyword}>const</span>{' '}
                <span className={styles.codeVariable}>developer</span>{' '}
                <span className={styles.codeOperator}>=</span> {'{'}
              </div>
              <div className={styles.codeLine} style={{ paddingLeft: '20px' }}>
                <span className={styles.codeProperty}>name</span>
                <span className={styles.codeOperator}>:</span>{' '}
                <span className={styles.codeString}>'{PERSONAL_INFO.name}'</span>,
              </div>
              <div className={styles.codeLine} style={{ paddingLeft: '20px' }}>
                <span className={styles.codeProperty}>skills</span>
                <span className={styles.codeOperator}>:</span> [
              </div>
              <div className={styles.codeLine} style={{ paddingLeft: '40px' }}>
                <span className={styles.codeString}>'React'</span>,{' '}
                <span className={styles.codeString}>'Next.js'</span>,
              </div>
              <div className={styles.codeLine} style={{ paddingLeft: '40px' }}>
                <span className={styles.codeString}>'TypeScript'</span>,{' '}
                <span className={styles.codeString}>'Node.js'</span>
              </div>
              <div className={styles.codeLine} style={{ paddingLeft: '20px' }}>
                ],
              </div>
              <div className={styles.codeLine} style={{ paddingLeft: '20px' }}>
                <span className={styles.codeProperty}>passion</span>
                <span className={styles.codeOperator}>:</span>{' '}
                <span className={styles.codeString}>'Code & Innovation'</span>
              </div>
              <div className={styles.codeLine}>
                {'}'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel}></div>
        </div>
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  )
}
