import React, { useEffect, useState } from 'react';
import styles from './Hero.module.scss';
import AnimatedButton from '../../components/AnimatedButton';
import { motion } from 'framer-motion';

const typingText = 'Olá, eu sou Ivo.';

const Hero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(typingText.slice(0, i + 1));
      i++;
      if (i === typingText.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero} aria-label="Seção de introdução" role="region">
      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {displayedText}
          <span className={styles.cursor} aria-hidden="true">|</span>
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          Desenvolvedor Full Stack apaixonado por tecnologia e design elegante.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <AnimatedButton aria-label="Ver projetos">Ver Projetos</AnimatedButton>
        </motion.div>
      </div>
      <div className={styles.background} aria-hidden="true">{/* Efeito parallax ou glitch aqui futuramente */}</div>
    </section>
  );
};

export default Hero; 