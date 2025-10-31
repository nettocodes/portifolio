'use client'

import { SKILLS } from '@/constants/data'
import styles from './TechMarquee.module.css'

export default function TechMarquee() {
  // Duplicar array para criar efeito infinito
  const technologies = SKILLS.map(skill => skill.name)
  const duplicatedTechs = [...technologies, ...technologies]

  return (
    <div className={styles.marqueeSection}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          {duplicatedTechs.map((tech, index) => (
            <span key={index} className={styles.marqueeItem}>
              {tech}
            </span>
          ))}
        </div>
        <div className={styles.marqueeContent} aria-hidden="true">
          {duplicatedTechs.map((tech, index) => (
            <span key={index} className={styles.marqueeItem}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
