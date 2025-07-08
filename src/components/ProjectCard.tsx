import React, { useState } from 'react';
import styles from './ProjectCard.module.scss';
import { motion, easeOut } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  link?: string;
  tags?: string[];
  featured?: boolean;
  status?: 'completed' | 'in-progress' | 'coming-soon';
  github?: string;
  demo?: string;
  technologies?: string[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: easeOut } }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  link, 
  tags = [], 
  featured = false,
  status = 'completed',
  github,
  demo,
  technologies = []
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'in-progress':
        return 'Em Andamento';
      case 'coming-soon':
        return 'Em Breve';
      default:
        return 'Concluído';
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'completed':
        return styles.completed;
      case 'in-progress':
        return styles.inProgress;
      case 'coming-soon':
        return styles.comingSoon;
      default:
        return styles.completed;
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      className={`${styles.card} ${getStatusClass()} ${featured ? styles.featured : ''} ${!imageLoaded ? styles.loading : ''}`}
      role="article"
      aria-label={`Projeto: ${title}`}
      tabIndex={0}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.imageContainer}>
        {imageError ? (
          <div className={styles.errorIcon} aria-label="Erro ao carregar imagem">📷</div>
        ) : (
          <>
            <img 
              className={styles.image} 
              src={image} 
              alt={title}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
            {!imageLoaded && !imageError && (
              <div className={styles.imagePlaceholder} aria-label="Carregando imagem" />
            )}
            <div className={styles.imageOverlay} aria-hidden="true">
              <div className={styles.overlayIcon}>
                {status === 'completed' && '🚀'}
                {status === 'in-progress' && '⚡'}
                {status === 'coming-soon' && '🔮'}
              </div>
            </div>
          </>
        )}
        <div className={`${styles.statusBadge} ${getStatusClass()}`}>
          {getStatusText()}
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.map((tag, idx) => (
              <li key={idx}>{tag}</li>
            ))}
          </ul>
        )}
        <div className={styles.actions}>
          {(link || github) && status !== 'coming-soon' && (
            <a 
              className={`${styles.actionButton} ${styles.primary}`}
              href={demo || link || github} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`Ver projeto ${title}`}
              tabIndex={0}
            >
              {demo ? 'Ver Demo' : 'Ver Projeto'}
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10"/>
                <path d="M7 17 17 7"/>
              </svg>
            </a>
          )}
          {github && github !== link && status !== 'coming-soon' && (
            <a 
              className={`${styles.actionButton} ${styles.secondary}`}
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`Ver código do projeto ${title} no GitHub`}
              tabIndex={0}
            >
              GitHub
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          )}
          {status === 'coming-soon' && (
            <button 
              className={`${styles.actionButton} ${styles.disabled}`}
              disabled
              aria-label="Projeto em breve"
              tabIndex={0}
            >
              Em Breve
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </button>
          )}
        </div>
        {technologies.length > 0 && (
          <div className={styles.techStack}>
            <div className={styles.techTitle}>Stack Técnico</div>
            <div className={styles.techList}>
              {technologies.map((tech, idx) => (
                <span key={idx} className={styles.techItem}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;