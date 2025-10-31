'use client'

import { EXPERIENCES } from '@/constants/data'
import { useTranslations } from 'next-intl'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { BriefcaseIcon, CalendarIcon } from '@/components/ui/Icons'
import styles from './Experience.module.css'

export default function Experience() {
  const t = useTranslations('experience')
  
  return (
    <section id="experience" className={`section ${styles.experienceSection}`}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">{t('title')}</h2>
            <p className="section-subtitle">
              {t('subtitle')}
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
                      <h3 className={styles.position}>{t(`${exp.id}.position`)}</h3>
                      {exp.current && <span className={styles.currentBadge}>{t('current')}</span>}
                    </div>
                    <div className={styles.company}>{exp.company}</div>
                    <div className={styles.period}>
                      <CalendarIcon />
                      <span>{t(`${exp.id}.period`)}</span>
                    </div>
                    <p className={styles.description}>{t(`${exp.id}.description`)}</p>
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
