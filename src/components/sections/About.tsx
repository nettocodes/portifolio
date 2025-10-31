'use client'

import { PERSONAL_INFO } from '@/constants/data'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollReveal from '@/components/ui/ScrollReveal'
import styles from './About.module.css'

export default function About() {
  const { t, language } = useLanguage()
  
  const values = language === 'pt' 
    ? [
        {
          title: 'Clean Code',
          description: 'Código legível, maintível e bem documentado é fundamental para o sucesso de qualquer projeto.'
        },
        {
          title: 'Performance First',
          description: 'Otimização não é opcional - cada milissegundo importa na experiência do usuário.'
        },
        {
          title: 'Continuous Learning',
          description: 'Tecnologia evolui rápido. Aprender constantemente é essencial para entregar as melhores soluções.'
        }
      ]
    : [
        {
          title: 'Clean Code',
          description: 'Readable, maintainable, and well-documented code is essential for any project\'s success.'
        },
        {
          title: 'Performance First',
          description: 'Optimization isn\'t optional - every millisecond matters in user experience.'
        },
        {
          title: 'Continuous Learning',
          description: 'Technology evolves fast. Constant learning is essential to deliver the best solutions.'
        }
      ]

  return (
    <section id="about" className="section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">{t('about.title')}</h2>
            <p className="section-subtitle">
              {t('about.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.aboutContent}>
          <ScrollReveal delay={200}>
            <div className={styles.aboutText}>
              <p className={styles.lead}>
                {t('about.lead')}
              </p>
              <p className={styles.paragraph}>
                {t('about.paragraph1')}
              </p>
              <p className={styles.paragraph}>
                {t('about.paragraph2')}
              </p>
              <p className={styles.paragraph}>
                {t('about.paragraph3')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className={styles.values}>
              <h3 className={styles.valuesTitle}>{t('about.valuesTitle')}</h3>
              <div className={styles.valuesList}>
                {values.map((value, index) => (
                  <div key={index} className={styles.valueCard}>
                    <div className={styles.valueNumber}>/{index + 1}</div>
                    <h4 className={styles.valueTitle}>{value.title}</h4>
                    <p className={styles.valueDescription}>{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
