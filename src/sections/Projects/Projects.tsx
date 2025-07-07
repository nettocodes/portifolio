import React from 'react';
import styles from './Projects.module.scss';
import ProjectCard from '../../components/ProjectCard';
import { motion } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper';

const projects = [
  {
    id: '1',
    title: 'Portfólio Moderno',
    description: 'Site pessoal com animações fluídas, dark mode inteligente, responsividade total e integração completa com GitHub API.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    link: 'https://ivonetto.dev',
    tags: ['React', 'Next.js', 'Framer Motion', 'SCSS', 'TypeScript']
  },
  {
    id: '2',
    title: 'API Node.js Escalável',
    description: 'Backend robusto com autenticação JWT, middleware personalizado, testes automatizados e documentação Swagger interativa.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    link: 'https://github.com/ivonetto/api-node',
    tags: ['Node.js', 'Express', 'JWT', 'Swagger', 'MongoDB']
  },
  {
    id: '3',
    title: 'Dashboard Analytics',
    description: 'Painel administrativo responsivo com gráficos interativos, filtros dinâmicos em tempo real e exportação de dados avançada.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    link: 'https://github.com/ivonetto/dashboard-react',
    tags: ['React', 'Recharts', 'Styled Components', 'Vite', 'Redux']
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
};

const headerVariants = {
  hidden: { 
    opacity: 0, 
    y: -30 
  },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
};

const Projects: React.FC = () => {
  return (
    <SectionWrapper id="projects" className={styles.projects}>
      <div className="container">
        <motion.div
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className={styles.title}>Projetos em Destaque</h2>
          <p className={styles.subtitle}>
            Uma curadoria dos meus principais projetos, focados em performance, design moderno e experiências interativas. 
            Cada projeto representa uma solução única, desenvolvida com as melhores práticas e tecnologias atuais.
          </p>
        </motion.div>
        
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={cardVariants}
              className={styles.cardWrapper}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;