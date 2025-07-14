import React from 'react';
import styles from './About.module.scss';
import HeaderSection from '../../components/HeaderSection';
import Profile from '../Profile/Profile';
import ContactFloating from '../ContactFloating/ContactFloating';
import { motion, easeOut, easeInOut } from 'framer-motion';
import { Icon } from '@iconify/react';

const infoData = [
  {
    icon: <Icon icon="pixelarticons:book-open" width="32" height="32" style={{color: 'white'}} />, 
    title: 'Formação',
    text: 'Gestão da Tecnologia da Informação pelo Centro Universitário Leonardo da Vinci'
  },
  {
    icon: <Icon icon="pixelarticons:briefcase" width="32" height="32" style={{color: 'white'}} />, 
    title: 'Experiência',
    text: '3+ anos em projetos web modernos'
  },
  {
    icon: <Icon icon="pixelarticons:trophy" width="32" height="32" style={{color: 'white'}} />, 
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
        className={`container ${styles.unifiedContainer}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Profile />
        
        <HeaderSection 
          title="Sobre Mim"
          subtitle="Sou movido por desafios e adoro aprender coisas novas. Acredito que tecnologia é uma ponte para transformar vidas e criar experiências incríveis. Valorizo design minimalista, código limpo e soluções criativas que fazem a diferença."
        />

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

        <ContactFloating />
      </motion.div>
    </section>
  );
};

export default About;
