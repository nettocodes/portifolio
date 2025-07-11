import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import styles from './Projects.module.scss';
import { motion, AnimatePresence, useScroll, useTransform, easeOut } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper';
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
  {
    id: '7',
    title: 'Real-time Chat',
    description: 'Sistema de chat em tempo real com rooms, mensagens privadas e compartilhamento de arquivos.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    tags: ['Socket.io', 'React', 'Node.js', 'MongoDB'],
    technologies: ['Socket.io', 'React', 'Node.js', 'MongoDB', 'JWT', 'Multer'],
    category: 'fullstack',
    featured: false,
    status: 'completed'
  },
  {
    id: '8',
    title: 'Task Manager Pro',
    description: 'Gerenciador de tarefas avançado com colaboração em equipe, cronogramas e relatórios de produtividade.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    tags: ['Vue.js', 'Express', 'PostgreSQL', 'Redis'],
    technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Redis', 'JWT', 'Websockets'],
    category: 'fullstack',
    featured: true,
    status: 'completed'
  }
];

const headerVariants = {
  hidden: { 
    opacity: 0, 
    y: -40 
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Otimizar scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const filteredProjects = useMemo(() => projects, []);

  // Otimizar funções de navegação
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  }, [filteredProjects.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Otimizar mouse handlers
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Auto-play otimizado
  useEffect(() => {
    if (isPaused || !isVisible) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isVisible, nextSlide]);

  // Intersection Observer para otimizar performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Memoizar estatísticas
  const stats = useMemo(() => {
    const completed = projects.filter(p => p.status === 'completed').length;
    const inProgress = projects.filter(p => p.status === 'in-progress').length;
    const totalTechnologies = [...new Set(projects.flatMap(p => p.technologies))].length;
    
    return [
      { number: projects.length, label: 'Projetos' },
      { number: completed, label: 'Concluídos' },
      { number: inProgress, label: 'Em Andamento' },
      { number: totalTechnologies, label: 'Tecnologias' }
    ];
  }, []);

  // Memoizar funções de status
  const getStatusText = useCallback((status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in-progress': return 'Em Andamento';
      case 'coming-soon': return 'Em Breve';
      default: return status;
    }
  }, []);

  // Memoizar ícones das estatísticas
  const statIcons = useMemo(() => [
    // Projetos
    (
      <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    // Concluídos
    (
      <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
        <path d="M9 12l2 2l4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    // Em Andamento
    (
      <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
        <path d="M12 6v6l4 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    // Tecnologias
    (
      <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M14.7 6.3a5 5 0 0 0-6.6 6.6l-5.1 5.1a2 2 0 1 0 2.8 2.8l5.1-5.1a5 5 0 0 0 6.6-6.6z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  ], []);

  // Animação count-up otimizada
  const [countedStats, setCountedStats] = useState([0, 0, 0, 0]);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;

    const timeouts: NodeJS.Timeout[] = [];
    
    stats.forEach((stat, idx) => {
      let current = 0;
      const increment = Math.max(1, Math.ceil(stat.number / 30));
      
      const animate = () => {
        current += increment;
        setCountedStats(prev => {
          const arr = [...prev];
          arr[idx] = current > stat.number ? stat.number : current;
          return arr;
        });
        
        if (current < stat.number) {
          timeouts[idx] = setTimeout(animate, 50);
        }
      };
      
      timeouts[idx] = setTimeout(animate, idx * 100);
    });

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, [statsVisible, stats]);

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

            {/* Slide principal */}
            <div className={styles.panoramaTrack}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredProjects[currentSlide].id}
                  className={styles.panoramaSlide}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  whileHover={{ scale: 1.01 }}
                  aria-hidden="false"
                >
                  <motion.img
                    src={filteredProjects[currentSlide].image}
                    alt={filteredProjects[currentSlide].title}
                    className={styles.slideImage}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div 
                    className={styles.slideContent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <div className={styles.slideContentBg} />
                    <motion.div 
                      className={styles.slideTags}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {filteredProjects[currentSlide].tags.map((tag, i) => (
                        <span 
                          className={styles.slideTag} 
                          key={i}
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
                      {filteredProjects[currentSlide].title}
                    </motion.h3>
                    <motion.p 
                      className={styles.slideDescription}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {filteredProjects[currentSlide].description}
                    </motion.p>
                    <motion.div 
                      className={styles.statusContainer}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span 
                        className={`${styles.statusDot} ${styles[`status-${filteredProjects[currentSlide].status}`]}`}
                      />
                      <span className={`${styles.statusText} ${styles[`status-${filteredProjects[currentSlide].status}`]}`}>
                        {getStatusText(filteredProjects[currentSlide].status)}
                      </span>
                    </motion.div>
                    <motion.div 
                      className={styles.slideLinks}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {filteredProjects[currentSlide].github && (
                        <motion.a
                          href={filteredProjects[currentSlide].github}
                          className={styles.slideLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub de ${filteredProjects[currentSlide].title}`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          GitHub
                        </motion.a>
                      )}
                      {filteredProjects[currentSlide].link && filteredProjects[currentSlide].link !== '#' && (
                        <motion.a
                          href={filteredProjects[currentSlide].link}
                          className={styles.slideLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver projeto ${filteredProjects[currentSlide].title}`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Ver Projeto
                        </motion.a>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navegação */}
            <div className={styles.panoramaNavigation}>
              <motion.button
                className={styles.navButton}
                onClick={prevSlide}
                aria-label="Anterior"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
              <motion.button
                className={styles.navButton}
                onClick={nextSlide}
                aria-label="Próximo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>

            {/* Paginação */}
            <div className={styles.panoramaPagination}>
              {filteredProjects.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={
                    idx === currentSlide
                      ? `${styles.paginationDot} ${styles.active}`
                      : styles.paginationDot
                  }
                  onClick={() => goToSlide(idx)}
                  aria-label={`Ir para slide ${idx + 1}`}
                  role="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
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

        {/* Estatísticas otimizadas */}
        <motion.div 
          ref={statsRef} 
          className={styles.statsRow}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              className={styles.statBar}
              key={idx}
              initial={{ 
                opacity: 0, 
                y: 20,
                scale: 0.9
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                scale: 1
              }}
              transition={{ 
                duration: 0.4, 
                delay: idx * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                transition: { duration: 0.2 }
              }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div>
                {statIcons[idx]}
              </div>
              <motion.span 
                className={styles.statNumber}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: idx * 0.1 + 0.2
                }}
              >
                {countedStats[idx]}
              </motion.span>
              <motion.span 
                className={styles.statLabel}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
              >
                {stat.label}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
