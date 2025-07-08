import React from 'react';
import styles from './ProjectGrid.module.scss';
import ProjectCard from './ProjectCard';
import { motion, easeOut } from 'framer-motion';

// Importar o tipo Project igual ao de Projects.tsx
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  tags?: string[];
  category?: string;
  featured?: boolean;
  status?: 'completed' | 'in-progress' | 'coming-soon';
  github?: string;
  demo?: string;
  technologies?: string[];
}

interface ProjectGridProps {
  projects: Project[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: easeOut } }
};

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => (
  <div className={styles.grid}>
    {projects.map((project, idx) => (
      <motion.div
        key={project.id}
        className={styles.item}
        variants={cardVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: idx * 0.08 }}
      >
        <ProjectCard {...project} />
      </motion.div>
    ))}
  </div>
);

export default ProjectGrid; 