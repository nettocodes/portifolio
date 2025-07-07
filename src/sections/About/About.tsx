import React from 'react';
import styles from './About.module.scss';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaAward, 
  FaMusic, 
  FaCamera, 
  FaPlane, 
  FaCoffee, 
  FaFutbol,
  FaCode,
  FaLightbulb,
  FaUsers,
  FaCalendarAlt,
  FaFolderOpen,
  FaMugHot,
} from 'react-icons/fa';

const infoData = [
  {
    icon: <FaGraduationCap />,
    title: 'Formação',
    text: 'Gestão da Tecnologia da Informação pelo Centro Universitário Leonardo da Vinci'
  },
  {
    icon: <FaBriefcase />,
    title: 'Experiência',
    text: '5+ anos em projetos web modernos e times ágeis'
  },
  {
    icon: <FaAward />,
    title: 'Conquistas',
    text: 'Finalista em hackathons e mais de 30 certificados de cursos'
  }
];

const hobbies = [
  { icon: <FaMusic />, label: 'Música' },
  { icon: <FaCamera />, label: 'Fotografia' },
  { icon: <FaPlane />, label: 'Viagens' },
  { icon: <FaCoffee />, label: 'Café especial' },
  { icon: <FaFutbol />, label: 'Esportes' },
  { icon: <FaCode />, label: 'Coding' },
  { icon: <FaLightbulb />, label: 'Criatividade' },
  { icon: <FaUsers />, label: 'Networking' },
  { icon: <FaAward />, label: 'Prêmios' },
  { icon: <FaBriefcase />, label: 'Negócios' },
  { icon: <FaGraduationCap />, label: 'Aprendizado' },
];

// Variantes de animação otimizadas
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
      ease: "easeOut"
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
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Substituir quickStats por uma lista com ícones
const stats = [
  {
    icon: <FaCalendarAlt />,
    number: '5+',
    label: 'Anos',
  },
  {
    icon: <FaFolderOpen />,
    number: '50+',
    label: 'Projetos',
  },
  {
    icon: <FaMugHot />,
    number: '∞',
    label: 'Café',
  },
];

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
          {/* Profile Section */}
          <motion.div 
            className={styles.profileSection} 
            variants={itemVariants}
          >
            <div className={styles.profileRow}>
              <motion.div 
                className={styles.avatar}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
              >
                <img 
                  src="https://api.dicebear.com/7.x/identicon/svg?seed=Ivo" 
                  alt="Avatar ilustrativo de Ivo Netto"
                  loading="lazy"
                />
              </motion.div>
              <motion.div 
                className={styles.nameBlock}
                variants={itemVariants}
              >
                <h1>Ivo Netto</h1>
                <span className={styles.title}>Desenvolvedor Full Stack</span>
              </motion.div>
              <motion.div 
                className={styles.quickStats}
                variants={itemVariants}
              >
                {stats.map((stat, idx) => (
                  <div className={styles.stat} key={stat.label}>
                    <span className={styles.statIcon}>{stat.icon}</span>
                    <span className={styles.number}>{stat.number}</span>
                    <span className={styles.label}>{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div 
              className={styles.hobbiesSection} 
              variants={itemVariants}
            >
              <div className={styles.hobbiesList}>
                <div className={styles.hobbiesFadeLeft}></div>
                <div className={styles.hobbiesMarquee}>
                  {[...hobbies, ...hobbies].map((hobby, index) => (
                    <div
                      key={hobby.label + index}
                      className={styles.hobbyItem}
                    >
                      <span className={styles.hobbyIcon}>{hobby.icon}</span>
                      <span>{hobby.label}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.hobbiesFadeRight}></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bio Section */}
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

        {/* Info Cards Grid */}
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