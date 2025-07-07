import React, { useRef, useEffect, useState } from 'react';
import styles from './Skills.module.scss';
import { FaReact, FaNodeJs, FaDatabase, FaSass, FaGitAlt, FaFigma, FaHtml5, FaCss3Alt, FaJs, FaAws, FaLinux } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiVite,  SiExpress, SiMongodb,  SiDocker, SiPrisma,  SiNestjs, SiVuedotjs, SiRedis, SiVercel, SiTrello, SiNotion, SiCanva, } from 'react-icons/si';
import SectionWrapper from '../../components/SectionWrapper';

// Definir um estilo padrão para todos os ícones
const iconStyle = { width: 28, height: 28 };

const frontend = [
  { name: 'React', icon: <FaReact style={iconStyle} /> },
  { name: 'Next.js', icon: <SiNextdotjs style={iconStyle} /> },
  { name: 'TypeScript', icon: <SiTypescript style={iconStyle} /> },
  { name: 'JavaScript', icon: <FaJs style={iconStyle} /> },
  { name: 'HTML5', icon: <FaHtml5 style={iconStyle} /> },
  { name: 'CSS3', icon: <FaCss3Alt style={iconStyle} /> },
  { name: 'Sass', icon: <FaSass style={iconStyle} /> },
  { name: 'Vite', icon: <SiVite style={iconStyle} /> },
  { name: 'Vue.js', icon: <SiVuedotjs style={iconStyle} /> },
];

const backend = [
  { name: 'Node.js', icon: <FaNodeJs style={iconStyle} /> },
  { name: 'Express', icon: <SiExpress style={iconStyle} /> },
  { name: 'NestJS', icon: <SiNestjs style={iconStyle} /> },
  { name: 'SQL', icon: <FaDatabase style={iconStyle} /> },
  { name: 'MongoDB', icon: <SiMongodb style={iconStyle} /> },
  { name: 'Prisma', icon: <SiPrisma style={iconStyle} /> },
  { name: 'Docker', icon: <SiDocker style={iconStyle} /> },
  { name: 'Redis', icon: <SiRedis style={iconStyle} /> },
  { name: 'AWS', icon: <FaAws style={iconStyle} /> },
  { name: 'Linux', icon: <FaLinux style={iconStyle} /> },
];

const tools = [
  { name: 'Git', icon: <FaGitAlt style={iconStyle} /> },
  { name: 'Figma', icon: <FaFigma style={iconStyle} /> },
  { name: 'Canva', icon: <SiCanva style={iconStyle} /> },
  { name: 'Vercel', icon: <SiVercel style={iconStyle} /> },
  { name: 'Trello', icon: <SiTrello style={iconStyle} /> },
  { name: 'Notion', icon: <SiNotion style={iconStyle} /> },
];

// Hook para detectar o tamanho da tela
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return screenSize;
};

// InfiniteMarquee com scroll infinito suave e responsivo
const InfiniteMarquee: React.FC<{
  items: { icon: React.ReactNode; name: string }[];
  reverse?: boolean;
  speed?: number;
}> = ({ items, reverse = false, speed = 50 }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const { width } = useScreenSize();

  // Ajustar velocidade baseada no tamanho da tela
  const getAdjustedSpeed = () => {
    if (width < 480) return speed * 0.6; // Mobile pequeno - mais lento
    if (width < 768) return speed * 0.8; // Mobile grande - um pouco mais lento
    if (width < 1024) return speed * 0.9; // Tablet - ligeiramente mais lento
    return speed; // Desktop - velocidade normal
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicar itens para criar o efeito infinito
    const duplicatedItems = [...items, ...items, ...items]; // triplica para suavizar
    let translateX = 0;
    const itemWidth = width < 480 ? 120 : width < 768 ? 140 : 160; // Largura baseada na tela
    const resetPoint = -((duplicatedItems.length / 3) * itemWidth);
    const adjustedSpeed = getAdjustedSpeed();

    const animate = () => {
      if (reverse) {
        translateX += adjustedSpeed / 60;
        if (translateX >= 0) {
          translateX = resetPoint;
        }
      } else {
        translateX -= adjustedSpeed / 60;
        if (translateX <= resetPoint) {
          translateX = 0;
        }
      }
      if (track) {
        track.style.transform = `translateX(${translateX}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [items, reverse, speed, width]);

  // Triplica os itens para suavizar o looping
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marqueeMaskLeft} />
      <div className={styles.marqueeMaskRight} />
      <div className={styles.marqueeTrack} ref={trackRef}>
        {duplicatedItems.map((item, idx) => (
          <div className={styles.marqueeItem} key={`${item.name}-${idx}`}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const { width } = useScreenSize();

  // Ajustar velocidades baseadas no tamanho da tela
  const getSpeed = (baseSpeed: number) => {
    if (width < 480) return baseSpeed * 0.7;
    if (width < 768) return baseSpeed * 0.85;
    return baseSpeed;
  };

  return (
    <SectionWrapper id="skills" className={styles.skills}>
      <div className={styles.visualBg} aria-hidden="true" />
      <div className="container">
        <div className={styles.header}>
          <h2>Skills & Tecnologias</h2>
          <p className={styles.subtitle}>
            Conheça as principais tecnologias, frameworks e ferramentas que domino para criar soluções digitais modernas, performáticas e criativas.
          </p>
        </div>
        <div className={styles.marqueeSection}>
          <div className={styles.marqueeLabel}>Frontend &rarr;</div>
          <InfiniteMarquee items={frontend} speed={getSpeed(30)} />
          <div className={styles.marqueeLabel}>Backend &larr;</div>
          <InfiniteMarquee items={backend} reverse speed={getSpeed(40)} />
          <div className={styles.marqueeLabel}>Ferramentas & Design &rarr;</div>
          <InfiniteMarquee items={tools} speed={getSpeed(35)} />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;