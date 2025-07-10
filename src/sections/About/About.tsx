import React from 'react';
import styles from './About.module.scss';
import { motion, easeOut, easeInOut } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  Trophy,
} from 'phosphor-react';

const infoData = [
  {
    icon: <GraduationCap weight="duotone" />, 
    title: 'Formação',
    text: 'Gestão da Tecnologia da Informação pelo Centro Universitário Leonardo da Vinci'
  },
  {
    icon: <Briefcase weight="duotone" />, 
    title: 'Experiência',
    text: '3+ anos em projetos web modernos'
  },
  {
    icon: <Trophy weight="duotone" />, 
    title: 'Conquistas',
    text: 'Mais de 30 certificados de cursos'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut
    }
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: easeInOut
    }
  }
};

const About: React.FC = () => {
  return (
    <section 
      className={styles.about} 
      aria-label="Seção sobre mim" 
      role="region"
      id="about"
    >
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.aboutRow}>
          <motion.div 
            className={styles.bioSection} 
            variants={itemVariants}
          >
            <motion.h2 
              className={styles.sectionTitle}
              variants={itemVariants}
            >
              Sobre Mim
            </motion.h2>
            <motion.p 
              className={styles.bioText}
              variants={itemVariants}
            >
              Sou movido por desafios e adoro aprender coisas novas. Acredito que tecnologia é uma ponte para 
              transformar vidas e criar experiências incríveis. Valorizo <strong>design minimalista</strong>, 
              código limpo e soluções criativas que fazem a diferença.
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          className={styles.infoGrid}
          variants={containerVariants}
        >
          {infoData.map((info, index) => (
            <motion.div
              key={index}
              className={styles.infoCard}
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className={styles.cardIcon}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 10
                }}
                transition={{ duration: 0.3 }}
              >
                {info.icon}
              </motion.div>
              <h3 className={styles.cardTitle}>{info.title}</h3>
              <p className={styles.cardText}>{info.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
