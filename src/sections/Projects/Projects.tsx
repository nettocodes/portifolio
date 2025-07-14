import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import styles from './Projects.module.scss';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper';
import HeaderSection from '../../components/HeaderSection';
import RubiksCube from '../../components/RubiksCube/RubiksCube';
import ordeskImg from '../../assets/ordesk.png';
import dataImg from '../../assets/data.png';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  category: string;
  featured?: boolean;
  status: 'completed' | 'in-progress' | 'coming-soon';
  github?: string;
  demo?: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Ordesk',
    description: 'Ferramenta empresarial completa para controle de ordens de serviço com dashboard interativo, relatórios em tempo real e sistema de notificações.',
    image: ordeskImg,
    link: 'https://github.com/IvoBraatz/Ordesk',
    github: 'https://github.com/IvoBraatz/Ordesk',
    tags: ['Vue.js', 'Node.js', 'Express', 'Chart.js', 'API Rest'],
    technologies: ['Vue.js', 'JavaScript', 'Node.js', 'Express', 'Cors', 'Chart.js'],
    category: 'fullstack',
    featured: true,
    status: 'completed'
  },
  {
    id: '2',
    title: 'DataRunner',
    description: 'Sistema robusto de agendamento e execução de queries SQL com interface moderna, autenticação JWT e documentação Swagger.',
    image: dataImg,
    link: 'https://github.com/IvoBraatz/DataRunner',
    github: 'https://github.com/IvoBraatz/DataRunner',
    tags: ['Next.js', 'Nest.js', 'MySQL', 'Prisma', 'Redis'],
    technologies: ['Next.js', 'Nest.js', 'JWT', 'Swagger', 'MySQL', 'Prisma', 'Redis', 'Linux'],
    category: 'backend',
    featured: true,
    status: 'completed'
  },
  {
    id: '3',
    title: 'Dashboard Analytics',
    description: 'Dashboard interativo para análise de dados em tempo real com gráficos dinâmicos, filtros avançados e exportação de relatórios.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    link: 'https://github.com/ivonetto/dashboard-react',
    github: 'https://github.com/ivonetto/dashboard-react',
    tags: ['React', 'TypeScript', 'Recharts', 'Styled Components'],
    technologies: ['React', 'TypeScript', 'Recharts', 'Styled Components', 'Vite', 'Redux'],
    category: 'frontend',
    featured: false,
    status: 'in-progress'
  },
  {
    id: '4',
    title: 'E-commerce Platform',
    description: 'Plataforma completa de e-commerce com sistema de pagamentos, gestão de estoque e painel administrativo avançado.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Socket.io'],
    category: 'fullstack',
    featured: true,
    status: 'coming-soon'
  },
  {
    id: '5',
    title: 'AI Chat Bot',
    description: 'Bot inteligente com processamento de linguagem natural para atendimento automatizado e integração com APIs.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    tags: ['Python', 'FastAPI', 'OpenAI', 'Redis'],
    technologies: ['Python', 'FastAPI', 'OpenAI', 'Redis', 'PostgreSQL', 'Docker'],
    category: 'ai',
    featured: false,
    status: 'coming-soon'
  },
  {
    id: '6',
    title: 'Mobile App React Native',
    description: 'Aplicativo mobile cross-platform com autenticação, push notifications e sincronização offline.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    tags: ['React Native', 'Expo', 'AsyncStorage', 'Push Notifications'],
    technologies: ['React Native', 'Expo', 'AsyncStorage', 'Firebase', 'Redux Toolkit'],
    category: 'mobile',
    featured: false,
    status: 'in-progress'
  },
];

const Projects: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  // Otimizar scroll animations - reduzir cálculos
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Simplificar transformações para melhor performance
  const y = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Memoizar projetos para evitar re-renders
  const filteredProjects = useMemo(() => projects, []);

  // Otimizar funções de navegação com useCallback
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  }, [filteredProjects.length]);

  const goToSlide = useCallback((index: number) => {
    if (index !== currentSlide) { // Só muda se for diferente
      setCurrentSlide(index);
    }
  }, [currentSlide]);

  // Otimizar mouse handlers
  const handleMouseEnter = useCallback(() => {
    if (!isPaused) setIsPaused(true);
  }, [isPaused]);

  const handleMouseLeave = useCallback(() => {
    if (isPaused) setIsPaused(false);
  }, [isPaused]);

  // Auto-play otimizado com cleanup melhorado
  useEffect(() => {
    if (isPaused || !isVisible || filteredProjects.length <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(nextSlide, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, isVisible, nextSlide, filteredProjects.length]);

  // Intersection Observer otimizado com thresholds menores
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: "50px 0px" // Preload quando próximo
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Memoizar função de status para evitar re-renders
  const getStatusText = useCallback((status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in-progress': return 'Em Andamento';
      case 'coming-soon': return 'Em Breve';
      default: return status;
    }
  }, []);

  // Memoizar o projeto atual para evitar re-renders desnecessários
  const currentProject = useMemo(() => 
    filteredProjects[currentSlide], 
    [filteredProjects, currentSlide]
  );

  return (
    <SectionWrapper id="projects" className={styles.projects}>
      <div ref={sectionRef} className={styles.backgroundAnimations}>
        {/* Animações de background simplificadas */}
        {isVisible && (
          <motion.div 
            className={styles.floatingElements}
            style={{ y, opacity }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.floatingElement}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.1, 0.2, 0.1], 
                  scale: [0.8, 1, 0.8],
                  y: [-10, 10, -10]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: i * 0.8
                }}
                style={{
                  top: `${20 + i * 20}%`,
                  left: `${10 + i * 30}%`
                }}
              >
                {i % 3 === 0 && '</>'}
                {i % 3 === 1 && '{}'}
                {i % 3 === 2 && '⚛️'}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="container">
        <HeaderSection 
          title="Projetos em Destaque"
          subtitle="Uma curadoria dos meus principais projetos, focados em performance, design moderno e experiências interativas. Cada projeto representa uma solução única, desenvolvida com as melhores práticas e tecnologias atuais."
          variant="light"
        />

        {filteredProjects.length > 0 ? (
          <motion.div 
            className={styles.panoramaContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Indicador de auto-play simplificado */}
            <motion.div 
              className={styles.autoPlayIndicator}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className={styles.autoPlayIcon}>
                {!isPaused ? '●' : '⏸'}
              </span>
              {!isPaused ? 'Auto-play' : 'Pausado'}
            </motion.div>

            {/* Slide principal otimizado */}
            <div className={styles.panoramaTrack}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  className={styles.panoramaSlide}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  whileHover={{ scale: 1.005 }}
                  aria-hidden="false"
                >
                  <motion.img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className={styles.slideImage}
                    initial={{ scale: 1.02 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                    loading="lazy"
                    decoding="async"
                  />
                  <motion.div 
                    className={styles.slideContent}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <div className={styles.slideContentBg} />
                    <motion.div 
                      className={styles.slideTags}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      {currentProject.tags.map((tag, i) => (
                        <span 
                          className={styles.slideTag} 
                          key={`${currentProject.id}-tag-${i}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                    <motion.h3 
                      className={styles.slideTitle}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentProject.title}
                    </motion.h3>
                    <motion.p 
                      className={styles.slideDescription}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                    >
                      {currentProject.description}
                    </motion.p>
                    <motion.div 
                      className={styles.statusContainer}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span 
                        className={`${styles.statusDot} ${styles[`status-${currentProject.status}`]}`}
                      />
                      <span className={`${styles.statusText} ${styles[`status-${currentProject.status}`]}`}>
                        {getStatusText(currentProject.status)}
                      </span>
                    </motion.div>
                    <motion.div 
                      className={styles.slideLinks}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                    >
                      {currentProject.github && (
                        <motion.a
                          href={currentProject.github}
                          className={styles.slideLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub de ${currentProject.title}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          GitHub
                        </motion.a>
                      )}
                      {currentProject.link && currentProject.link !== '#' && (
                        <motion.a
                          href={currentProject.link}
                          className={styles.slideLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver projeto ${currentProject.title}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Ver Projeto
                        </motion.a>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navegação otimizada */}
            <div className={styles.panoramaNavigation}>
              <motion.button
                className={styles.navButton}
                onClick={prevSlide}
                aria-label="Anterior"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
              <motion.button
                className={styles.navButton}
                onClick={nextSlide}
                aria-label="Próximo"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>

            {/* Paginação otimizada */}
            <div className={styles.panoramaPagination}>
              {filteredProjects.map((_, idx) => (
                <motion.div
                  key={`pagination-${idx}`}
                  className={
                    idx === currentSlide
                      ? `${styles.paginationDot} ${styles.active}`
                      : styles.paginationDot
                  }
                  onClick={() => goToSlide(idx)}
                  aria-label={`Ir para slide ${idx + 1}`}
                  role="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📁</span>
            <div className={styles.emptyText}>Nenhum projeto encontrado</div>
            <div className={styles.emptySubtext}>Em breve novos projetos serão adicionados.</div>
          </div>
        )}

        {/* Transforming Ideas Section */}
        <motion.div 
          className={styles.transformingSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className={styles.transformingContent}>
            <motion.div 
              className={styles.transformingText}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p 
                className={styles.transformingTagline}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Let's make things happen
              </motion.p>
              <motion.h2 
                className={styles.transformingTitle}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Transformando <span className={styles.highlight}>Ideias</span> em 
                <br />
                <span className={styles.highlight}>Produtos Digitais</span> que brilham
              </motion.h2>
              <motion.p 
                className={styles.transformingSubtitle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Criamos soluções digitais inovadoras que ajudam empresas a prosperar na era digital, 
                combinando design excepcional com tecnologia de ponta.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className={styles.cubeContainer}
              initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <RubiksCube />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
