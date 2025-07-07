import React from 'react';
import styles from './ProjectGrid.module.scss';

interface Project {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => (
  <div className={styles.grid}>
    {projects.map((project) => (
      <div key={project.id} className={styles.item}>
        {/* Substitua por <Card ... /> se desejar */}
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.icon && <span>{project.icon}</span>}
      </div>
    ))}
  </div>
);

export default ProjectGrid; 