'use client'

import { SKILLS } from '@/constants/data'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { CodeIcon } from '@/components/ui/Icons'
import styles from './Skills.module.css'

export default function Skills() {
  const categories = {
    frontend: SKILLS.filter(s => s.category === 'frontend'),
    backend: SKILLS.filter(s => s.category === 'backend'),
    database: SKILLS.filter(s => s.category === 'database'),
    devops: SKILLS.filter(s => s.category === 'devops'),
    cloud: SKILLS.filter(s => s.category === 'cloud'),
    tools: SKILLS.filter(s => s.category === 'tools')
  }

  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    devops: 'DevOps',
    cloud: 'Cloud',
    tools: 'Tools'
  }

  return (
    <section id="skills" className={`section ${styles.skillsSection}`}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">Tecnologias</h2>
            <p className="section-subtitle">
              Stack e ferramentas que utilizo no dia a dia
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.skillsContainer}>
          {Object.entries(categories).map(([key, skills], categoryIndex) => {
            if (skills.length === 0) return null
            
            return (
              <ScrollReveal key={key} delay={categoryIndex * 100}>
                <div className={styles.skillCategory}>
                  <h3 className={styles.categoryTitle}>
                    {categoryLabels[key as keyof typeof categoryLabels]}
                  </h3>
                  <div className={styles.skillsGrid}>
                    {skills.map((skill, index) => (
                      <div key={skill.name} className={styles.skillCard} style={{ animationDelay: `${index * 50}ms` }}>
                        <div className={styles.skillIcon}>
                          <CodeIcon />
                        </div>
                        <span className={styles.skillName}>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
