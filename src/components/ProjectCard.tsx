import React from 'react';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  link?: string;
  tags?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, link, tags }) => {
  return (
    <div className={styles.card}>
      {image && <img className={styles.image} src={image} alt={title} />}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {tags && (
          <ul className={styles.tags}>
            {tags.map((tag, idx) => (
              <li key={idx}>{tag}</li>
            ))}
          </ul>
        )}
        {link && (
          <a className={styles.link} href={link} target="_blank" rel="noopener noreferrer">
            Ver Projeto
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 