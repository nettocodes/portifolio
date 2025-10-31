'use client'

import { EXPERIENCES } from '@/constants/data'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { BriefcaseIcon, CalendarIcon } from '@/components/ui/Icons'
import styles from './Experience.module.css'

export default function Experience() {
  const { t, translateExperience } = useLanguage()
  
  return (
    <section id="experience" className={`section ${styles.experienceSection}`}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">{t('experience.title')}</h2>
            <p className="section-subtitle">
              {t('experience.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.timeline}>
          {EXPERIENCES.map((exp, index) => (
            <ScrollReveal key={exp.id} delay={index * 150}>
              <div className={`${styles.timelineItem} ${exp.current ? styles.current : ''} ${index % 2 === 0 ? styles.left : styles.right}`}>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineCard}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.position}>{translateExperience(exp.id, 'position')}</h3>
                      {exp.current && <span className={styles.currentBadge}>{t('experience.current')}</span>}
                    </div>
                    <div className={styles.company}>{exp.company}</div>
                    <div className={styles.period}>
                      <CalendarIcon />
                      <span>{translateExperience(exp.id, 'period')}</span>
                    </div>
                    <p className={styles.description}>{translateExperience(exp.id, 'description')}</p>
                  </div>
                </div>
                <div className={styles.timelineDot}>
                  <BriefcaseIcon />
                  {exp.current && (
                    <>
                      <span className={styles.pulse}></span>
                      <span className={styles.pulse} style={{ animationDelay: '0.5s' }}></span>
                    </>
                  )}
                </div>
                <div className={styles.timelineSpacer}></div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
