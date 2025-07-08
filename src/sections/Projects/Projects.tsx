import React, { useState, useMemo, useEffect, useRef } from 'react';
import styles from './Projects.module.scss';
import { motion, easeOut } from 'framer-motion';
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
      duration: 1,
      ease: easeOut
    }
  },
};

const Projects: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const filteredProjects = projects;

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % filteredProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, filteredProjects.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#f59e0b';
      case 'coming-soon': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in-progress': return 'Em Andamento';
      case 'coming-soon': return 'Em Breve';
      default: return status;
    }
  };

  // SVGs minimalistas para cada stat
  const statIcons = [
    // Projetos
    (
      <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    // Concluídos
    (
      <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="1.5"/><path d="M9 12l2 2l4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    // Em Andamento
    (
      <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="1.5"/><path d="M12 6v6l4 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    // Tecnologias
    (
      <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14.7 6.3a5 5 0 0 0-6.6 6.6l-5.1 5.1a2 2 0 1 0 2.8 2.8l5.1-5.1a5 5 0 0 0 6.6-6.6z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  ];

  // Animação de count-up para cada stat
  const [countedStats, setCountedStats] = useState([0, 0, 0, 0]);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    // Detecta se stats estão visíveis na tela
    function onScroll() {
      if (!statsRef.current) return;
      const rect = statsRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setStatsVisible(true);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const intervals: number[] = [];
    stats.forEach((stat, idx) => {
      let current = 0;
      const increment = Math.max(1, Math.ceil(stat.number / 40));
      intervals[idx] = window.setInterval(() => {
        current += increment;
        setCountedStats(prev => {
          const arr = [...prev];
          arr[idx] = current > stat.number ? stat.number : current;
          return arr;
        });
        if (current >= stat.number) clearInterval(intervals[idx]);
      }, 18 + idx * 10);
    });
    return () => intervals.forEach(i => clearInterval(i));
  }, [statsVisible, stats]);

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

        {filteredProjects.length > 0 ? (
          <div 
            className={styles.panoramaContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Auto-play indicator */}
            <div className={styles.autoPlayIndicator}>
              {!isPaused ? '● Auto-play' : '⏸ Pausado'}
            </div>

            {/* Panoramic track */}
            <div className={styles.panoramaTrack}>
              <motion.div
                key={filteredProjects[currentSlide].id}
                className={styles.panoramaSlide}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                aria-hidden="false"
              >
                <img
                  src={filteredProjects[currentSlide].image}
                  alt={filteredProjects[currentSlide].title}
                  className={styles.slideImage}
                />
                <div className={styles.slideContent}>
                  <div className={styles.slideContentBg} />
                  <div className={styles.slideTags}>
                    {filteredProjects[currentSlide].tags.map((tag, i) => (
                      <span className={styles.slideTag} key={i}>{tag}</span>
                    ))}
                  </div>
                  <h3 className={styles.slideTitle}>{filteredProjects[currentSlide].title}</h3>
                  <p className={styles.slideDescription}>{filteredProjects[currentSlide].description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{
                      display: 'inline-block',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: getStatusColor(filteredProjects[currentSlide].status),
                      marginRight: 6
                    }} />
                    <span style={{ fontSize: 14, color: getStatusColor(filteredProjects[currentSlide].status), fontWeight: 600 }}>
                      {getStatusText(filteredProjects[currentSlide].status)}
                    </span>
                  </div>
                  <div className={styles.slideLinks}>
                    {filteredProjects[currentSlide].github && (
                      <a
                        href={filteredProjects[currentSlide].github}
                        className={styles.slideLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub de ${filteredProjects[currentSlide].title}`}
                      >
                        GitHub
                      </a>
                    )}
                    {filteredProjects[currentSlide].link && filteredProjects[currentSlide].link !== '#' && (
                      <a
                        href={filteredProjects[currentSlide].link}
                        className={styles.slideLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver projeto ${filteredProjects[currentSlide].title}`}
                      >
                        Ver Projeto
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navegação */}
            <div className={styles.panoramaNavigation}>
              <button
                className={styles.navButton}
                onClick={prevSlide}
                aria-label="Anterior"
                tabIndex={0}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button
                className={styles.navButton}
                onClick={nextSlide}
                aria-label="Próximo"
                tabIndex={0}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

            {/* Dots de paginação */}
            <div className={styles.panoramaPagination}>
              {filteredProjects.map((_, idx) => (
                <div
                  key={idx}
                  className={
                    idx === currentSlide
                      ? `${styles.paginationDot} ${styles.active}`
                      : styles.paginationDot
                  }
                  onClick={() => goToSlide(idx)}
                  aria-label={`Ir para slide ${idx + 1}`}
                  tabIndex={0}
                  role="button"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>��</span>
            <div className={styles.emptyText}>Nenhum projeto encontrado</div>
            <div className={styles.emptySubtext}>Em breve novos projetos serão adicionados.</div>
          </div>
        )}

        {/* Estatísticas */}
        <div ref={statsRef} className={styles.statsRow}>
          {stats.map((stat, idx) => (
            <div
              className={
                styles.statBar + ' ' + (idx % 2 === 0 ? styles.fromLeft : styles.fromRight)
              }
              key={idx}
            >
              {statIcons[idx]}
              <span className={styles.statNumber}>{countedStats[idx]}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;