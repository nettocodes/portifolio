import React, { useRef, useEffect } from 'react';
import styles from './Skills.module.scss';
import { FaReact, FaNodeJs, FaDatabase, FaSass, FaGitAlt, FaFigma, FaHtml5, FaCss3Alt, FaJs, FaAws, FaLinux } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiRedux, SiVite, SiJest, SiStorybook, SiExpress, SiMongodb, SiPostgresql, SiDocker, SiPrisma, SiGraphql, SiNestjs, SiCypress, SiWebpack, SiAngular, SiVuedotjs, SiLaravel, SiPhp, SiFirebase, SiSupabase, SiRedis, SiKubernetes, SiJenkins, SiVercel, SiNetlify, SiHeroku, SiSlack, SiTrello, SiNotion, SiCanva, SiSketch } from 'react-icons/si';
import SectionWrapper from '../../components/SectionWrapper';

// Definir um estilo padrão para todos os ícones
const iconStyle = { width: 32, height: 32 };

const frontend = [
  { name: 'React', icon: <FaReact style={iconStyle} /> },
  { name: 'Next.js', icon: <SiNextdotjs style={iconStyle} /> },
  { name: 'TypeScript', icon: <SiTypescript style={iconStyle} /> },
  { name: 'JavaScript', icon: <FaJs style={iconStyle} /> },
  { name: 'HTML5', icon: <FaHtml5 style={iconStyle} /> },
  { name: 'CSS3', icon: <FaCss3Alt style={iconStyle} /> },
  { name: 'Sass', icon: <FaSass style={iconStyle} /> },
  { name: 'Redux', icon: <SiRedux style={iconStyle} /> },
  { name: 'Vite', icon: <SiVite style={iconStyle} /> },
  { name: 'Webpack', icon: <SiWebpack style={iconStyle} /> },
  { name: 'Jest', icon: <SiJest style={iconStyle} /> },
  { name: 'Storybook', icon: <SiStorybook style={iconStyle} /> },
  { name: 'Cypress', icon: <SiCypress style={iconStyle} /> },
  { name: 'Angular', icon: <SiAngular style={iconStyle} /> },
  { name: 'Vue.js', icon: <SiVuedotjs style={iconStyle} /> },
];

const backend = [
  { name: 'Node.js', icon: <FaNodeJs style={iconStyle} /> },
  { name: 'Express', icon: <SiExpress style={iconStyle} /> },
  { name: 'NestJS', icon: <SiNestjs style={iconStyle} /> },
  { name: 'SQL/NoSQL', icon: <FaDatabase style={iconStyle} /> },
  { name: 'MongoDB', icon: <SiMongodb style={iconStyle} /> },
  { name: 'PostgreSQL', icon: <SiPostgresql style={iconStyle} /> },
  { name: 'Prisma', icon: <SiPrisma style={iconStyle} /> },
  { name: 'GraphQL', icon: <SiGraphql style={iconStyle} /> },
  { name: 'Docker', icon: <SiDocker style={iconStyle} /> },
  { name: 'PHP', icon: <SiPhp style={iconStyle} /> },
  { name: 'Laravel', icon: <SiLaravel style={iconStyle} /> },
  { name: 'Firebase', icon: <SiFirebase style={iconStyle} /> },
  { name: 'Supabase', icon: <SiSupabase style={iconStyle} /> },
  { name: 'Redis', icon: <SiRedis style={iconStyle} /> },
  { name: 'AWS', icon: <FaAws style={iconStyle} /> },
  { name: 'Linux', icon: <FaLinux style={iconStyle} /> },
];

const tools = [
  { name: 'Git', icon: <FaGitAlt style={iconStyle} /> },
  { name: 'Figma', icon: <FaFigma style={iconStyle} /> },
  { name: 'Sketch', icon: <SiSketch style={iconStyle} /> },
  { name: 'Canva', icon: <SiCanva style={iconStyle} /> },
  { name: 'Kubernetes', icon: <SiKubernetes style={iconStyle} /> },
  { name: 'Jenkins', icon: <SiJenkins style={iconStyle} /> },
  { name: 'Vercel', icon: <SiVercel style={iconStyle} /> },
  { name: 'Netlify', icon: <SiNetlify style={iconStyle} /> },
  { name: 'Heroku', icon: <SiHeroku style={iconStyle} /> },
  { name: 'Slack', icon: <SiSlack style={iconStyle} /> },
  { name: 'Trello', icon: <SiTrello style={iconStyle} /> },
  { name: 'Notion', icon: <SiNotion style={iconStyle} /> },
];

// InfiniteMarquee com scroll infinito suave
const InfiniteMarquee: React.FC<{
  items: { icon: React.ReactNode; name: string }[];
  reverse?: boolean;
  speed?: number;
}> = ({ items, reverse = false, speed = 50 }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicar itens para criar o efeito infinito
    const duplicatedItems = [...items, ...items, ...items]; // triplica para suavizar
    let translateX = 0;
    const itemWidth = 200;
    const resetPoint = -((duplicatedItems.length / 3) * itemWidth);

    const animate = () => {
      if (reverse) {
        translateX += speed / 60;
        if (translateX >= 0) {
          translateX = resetPoint;
        }
      } else {
        translateX -= speed / 60;
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
  }, [items, reverse, speed]);

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
          <InfiniteMarquee items={frontend} speed={30} />
          <div className={styles.marqueeLabel}>Backend &larr;</div>
          <InfiniteMarquee items={backend} reverse speed={40} />
          <div className={styles.marqueeLabel}>Ferramentas & Design &rarr;</div>
          <InfiniteMarquee items={tools} speed={35} />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;