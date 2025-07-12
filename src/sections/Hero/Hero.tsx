import React, { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.scss';
import AnimatedButton from '../../components/AnimatedButton';
import gsap from 'gsap';

const typingText = 'Olá, eu sou Ivo.';

const Hero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Função para scroll suave para seção de projetos
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(typingText.slice(0, i + 1));
      i++;
      if (i === typingText.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animações de entrada GSAP
    if (titleRef.current && subtitleRef.current && buttonRef.current) {
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], { opacity: 0, y: 40 });
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7
      });
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'expo.out',
        delay: 1.2
      });
    }
    // Parallax leve no background
    if (bgRef.current) {
      const onScroll = () => {
        const scrollY = window.scrollY;
        gsap.to(bgRef.current, {
          y: scrollY * 0.15,
          ease: 'power1.out',
          overwrite: 'auto',
          duration: 0.6
        });
      };
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, []);

  return (
    <section className={styles.hero} aria-label="Seção de introdução" role="region">
      <div className={styles.content}>
        <h1
          className={styles.title}
          ref={titleRef}
        >
          {displayedText}
          <span className={styles.cursor} aria-hidden="true">|</span>
        </h1>
        <p
          className={styles.subtitle}
          ref={subtitleRef}
        >
          Desenvolvedor Full Stack apaixonado por tecnologia e design elegante.
        </p>
        <div ref={buttonRef} className={styles.buttonWrapper}>
          <AnimatedButton aria-label="Ver projetos" onClick={scrollToProjects}>Ver Projetos</AnimatedButton>
        </div>
      </div>
      <div className={styles.background} ref={bgRef} aria-hidden="true"></div>
    </section>
  );
};

export default Hero;