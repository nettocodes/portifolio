'use client'

import { notFound, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PROJECTS } from '@/constants/data'
import { useLanguage } from '@/contexts/LanguageContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GitHubIcon, ExternalLinkIcon, ArrowRightIcon } from '@/components/ui/Icons'
import styles from './page.module.css'

export default function ProjetoPage({ params }: { params: { slug: string } }) {
  const { t, translateProject } = useLanguage()
  const router = useRouter()
  const project = PROJECTS.find(p => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className={styles.projectPage}>
        <div className="container">
          <button onClick={() => router.back()} className={styles.backLink}>
            <ArrowRightIcon />
            <span>{t('project.back')}</span>
          </button>

          <div className={styles.projectHero}>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.description}>{translateProject(project.id, 'description')}</p>
            
            <div className={styles.meta}>
              <div className={styles.technologies}>
                {project.technologies.map(tech => (
                  <span key={tech} className={styles.tech}>{tech}</span>
                ))}
              </div>
              
              <div className={styles.links}>
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <GitHubIcon />
                    <span>{t('project.viewCode')}</span>
                  </a>
                )}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <ExternalLinkIcon />
                    <span>{t('project.viewDemo')}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {project.videoUrl && (
            <div className={styles.videoSection}>
              <h2 className={styles.sectionTitle}>{t('project.demonstration')}</h2>
              <div className={styles.videoWrapper}>
                <iframe
                  src={project.videoUrl}
                  title={`${project.title} - ${t('project.demonstration')}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.video}
                />
              </div>
            </div>
          )}

          {project.longDescription && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('project.about')}</h2>
              <p className={styles.longDescription}>{translateProject(project.id, 'longDescription')}</p>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('project.features')}</h2>
              <ul className={styles.highlights}>
                {project.highlights.map((highlight, index) => (
                  <li key={index} className={styles.highlight}>
                    <span className={styles.highlightIcon}>→</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('project.challenges')}</h2>
              <div className={styles.challenges}>
                {project.challenges.map((challenge, index) => (
                  <div key={index} className={styles.challenge}>
                    <h3 className={styles.challengeTitle}>{challenge.title}</h3>
                    <div className={styles.challengeContent}>
                      <div className={styles.challengeBlock}>
                        <span className={styles.label}>{t('project.challenge')}</span>
                        <p>{challenge.description}</p>
                      </div>
                      <div className={styles.challengeBlock}>
                        <span className={styles.label}>{t('project.solution')}</span>
                        <p>{challenge.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.navigation}>
            <Link href="/#projects" className={styles.navButton}>
              {t('project.allProjects')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
