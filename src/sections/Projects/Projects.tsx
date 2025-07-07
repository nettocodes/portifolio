import React from 'react';
import styles from './Projects.module.scss';
import ProjectCard from '../../components/ProjectCard';
import { motion, easeOut } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper';
import ordeskImg from '../../assets/ordesk.png';
import dataImg from '../../assets/data.png';

const projects = [
  {
    id: '1',
    title: 'Ordesk',
    description: 'Ferramenta empressarial para controle de ordens de serviço.',
    image: ordeskImg,
    link: 'https://github.com/IvoBraatz/Ordesk',
    tags: ['Vue.js', 'Javascript', 'Node.js', 'Express', 'Cors', 'API Rest', 'Chart.js']
  },
  {
    id: '2',
    title: 'DataRunner',
    description: 'Sistema de login seguro para gerenciamento de dados.',
    image: dataImg,
    link: 'https://github.com/IvoBraatz/DataRunner',
    tags: ['Next.js', 'Nest.js', 'JWT', 'Swagger', 'MySQL', 'Prisma','Redis', 'Linux']
  },
  {
    id: '3',
    title: 'Em Breve...',
    description: 'Novos projetos em desenvolvimento. Se tiver uma ideia entre em contato!',
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
      ease: easeOut
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
      ease: easeOut
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