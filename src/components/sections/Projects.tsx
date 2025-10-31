'use client'

import Link from 'next/link'
import { PROJECTS } from '@/constants/data'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { GitHubIcon, ExternalLinkIcon, CodeIcon } from '@/components/ui/Icons'
import styles from './Projects.module.css'

export default function Projects() {
  const { t, translateProject } = useLanguage()
  const featured = PROJECTS.filter(p => p.featured)
  const others = PROJECTS.filter(p => !p.featured)

  return (
    <section id="projects" className={`section ${styles.projectsSection}`}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">{t('projects.title')}</h2>
            <p className="section-subtitle">
              {t('projects.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.featuredProjects}>
          {featured.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 150}>
              <Link href={`/projeto/${project.slug}`} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <div className={styles.imagePlaceholder}>
                    <CodeIcon />
                    <span>{project.title.split(' ')[0]}</span>
                  </div>
                </div>
                <div className={styles.projectContent}>
                  <div className={styles.projectHeader}>
                    <div className={styles.projectNumber}>0{index + 1}</div>
                    <div className={styles.projectLinks}>
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.projectLink}
                          aria-label="Ver código no GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GitHubIcon />
                        </a>
                      )}
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.projectLink}
                          aria-label="Ver projeto ao vivo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLinkIcon />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{translateProject(project.id, 'description')}</p>
                  <div className={styles.projectTech}>
                    {project.technologies.map(tech => (
                      <span key={tech} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {others.length > 0 && (
          <>
            <ScrollReveal delay={500}>
              <h3 className={styles.sectionSubtitle}>{t('projects.other')}</h3>
            </ScrollReveal>

            <div className={styles.otherProjects}>
              {others.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 100}>
                  <div className={styles.projectSmall}>
                    <div className={styles.projectSmallHeader}>
                      <h4>{project.title}</h4>
                      <div className={styles.projectSmallLinks}>
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Ver código"
                          >
                            <GitHubIcon />
                          </a>
                        )}
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Ver demo"
                          >
                            <ExternalLinkIcon />
                          </a>
                        )}
                      </div>
                    </div>
                    <p>{translateProject(project.id, 'description')}</p>
                    <div className={styles.projectTechSmall}>
                      {project.technologies.map(tech => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
