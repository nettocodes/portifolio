'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Mail, 
  MapPin, 
  Send
} from 'lucide-react';
import { 
  FaLinkedin, 
  FaGithub, 
  FaDiscord,
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare
} from 'react-icons/fa';
import { 
  SiThreads,
  SiTypescript,
  SiNextdotjs,
  SiNuxtdotjs,
  SiDotnet,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiExpress,
  SiNestjs,
  SiGraphql,
  SiRedis,
  SiKubernetes,
  SiJenkins,
  SiGithubactions,
  SiGitlab,
  SiTerraform,
  SiPrometheus,
  SiGrafana,
  SiElasticsearch,
  SiKibana,
  SiSentry,
  SiDatadog,
  SiHelm,
  SiFlutter,
  SiFirebase,
  SiAndroidstudio,
  SiXcode,
  SiWebpack,
  SiVite,
  SiBabel,
  SiEslint,
  SiPrettier,
  SiSass,
  SiCircleci,
  SiPulumi,
  SiLogstash
} from 'react-icons/si';

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Custom cursor
  useEffect(() => {
    // Check if we should show custom cursor (desktop only)
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        const shouldShow = window.innerWidth > 768;
        setShowCustomCursor(shouldShow);
        
        if (shouldShow) {
          document.documentElement.classList.add('cursor-enabled');
        } else {
          document.documentElement.classList.remove('cursor-enabled');
        }
      };

      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);

      const handleMouseMove = (e: MouseEvent) => {
        if (cursorRef.current && showCustomCursor) {
          cursorRef.current.style.left = e.clientX + 'px';
          cursorRef.current.style.top = e.clientY + 'px';
        }
      };

      const handleMouseDown = () => {
        if (cursorRef.current && showCustomCursor) {
          cursorRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
        }
      };

      const handleMouseUp = () => {
        if (cursorRef.current && showCustomCursor) {
          cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('resize', checkScreenSize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        document.documentElement.classList.remove('cursor-enabled');
      };
    }
  }, [showCustomCursor]);

  // Loading sequence - mais rápido, apenas para garantir que o conteúdo foi montado
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Quase instantâneo

    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for active sections - otimizado para detectar todas as seções
  useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Filtrar apenas seções visíveis
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Pegar a seção mais visível (maior intersectionRatio)
          const mostVisible = visibleEntries.reduce((prev, current) => {
            return current.intersectionRatio > prev.intersectionRatio ? current : prev;
          });
          
          setActiveSection(mostVisible.target.id);
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: '-100px 0px -66% 0px'
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isLoaded]);

  const navigation = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'experience', label: 'Experiência' },
    { id: 'projects', label: 'Projetos' },
    { id: 'contact', label: 'Contato' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Custom Cursor - Only show on desktop */}
      {showCustomCursor && (
        <div 
          ref={cursorRef}
          className="cursor-custom"
          style={{
            position: 'fixed',
            width: '24px',
            height: '24px',
            border: `2px solid var(--brand-black)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 10000,
            transform: 'translate(-50%, -50%)',
            transition: 'transform 0.1s ease',
            mixBlendMode: 'difference',
            display: 'block'
          }}
        />
      )}

      {/* Wrapper com classe de animação */}
      <div className={`page-content ${isLoaded ? 'loaded' : ''}`}>
      
      {/* Navigation */}
      <Navigation 
        navigation={navigation}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Content */}
      <main ref={mainRef} className="main-content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
      </div>
    </>
  );
}

// Navigation Component
interface NavigationProps {
  navigation: Array<{ id: string; label: string }>;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

function Navigation({ navigation, activeSection, scrollToSection, isMenuOpen, setIsMenuOpen }: NavigationProps) {
  return (
    <>
      <header className="header navigation">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('home')}
              className="logo"
              style={{ background: 'none', border: 'none', padding: 0 }}
              aria-label="Logo IBN"
            >
              <div className="logo-container">
                <Image
                  src="/images/logo-dark.svg" 
                  alt="Logo IBN"
                  width={100}
                  height={40}
                  priority
                  style={{ display: 'block' }}
                />
                <span className="logo-text">netto</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="nav-desktop">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-button"
              aria-label="Toggle menu"
            >
              <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
          <div className="nav-mobile-content">
            {navigation.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-mobile-link"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(250, 250, 250, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--color-border);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-6) 0;
        }

        .logo {
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          font-family: var(--font-family-mono);
          font-size: 1.2rem;
          font-weight: 900;
          letter-spacing: 3px;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-text {
          font-family: var(--font-family-mono);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--brand-black);
          letter-spacing: 1px;
          text-transform: lowercase;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: linear-gradient(135deg, var(--brand-black) 0%, var(--brand-gray-600) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo:hover {
          transform: translateY(-1px);
        }

        .logo:hover .logo-text {
          transform: scale(1.05);
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: var(--space-8);
        }

        .nav-link {
          background: none;
          border: none;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          cursor: pointer;
          padding: var(--space-2) 0;
          position: relative;
          transition: color 0.2s ease;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--brand-black);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--brand-black);
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }

        .menu-button {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-2);
          z-index: 1001;
        }

        .menu-icon {
          width: 24px;
          height: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .menu-icon span {
          display: block;
          width: 100%;
          height: 2px;
          background: var(--brand-black);
          transition: all 0.3s ease;
        }

        .menu-icon.open span:first-child {
          transform: rotate(45deg) translate(7px, 7px);
        }

        .menu-icon.open span:last-child {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        .nav-mobile {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100vw;
          height: 100vh;
          background: var(--color-bg-primary);
          z-index: 999;
          transition: right 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-mobile.open {
          right: 0;
        }

        .nav-mobile-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-8);
        }

        .nav-mobile-link {
          background: none;
          border: none;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--brand-black);
          cursor: pointer;
          letter-spacing: 1px;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(20px);
          animation: fade-in-up 0.5s ease forwards;
        }

        @keyframes fade-in-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .nav-desktop {
            display: none;
          }

          .menu-button {
            display: block;
          }
        }
      `}</style>
    </>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-greeting">
              <span className="font-mono text-sm font-medium text-secondary">
                &gt; Olá mundo_
              </span>
            </div>
            
            <h1 className="hero-title">
              <span className="hero-name">Ivo Netto</span>
              <span className="hero-profession">Full-Stack Developer</span>
            </h1>

            <p className="hero-description">
              Crio soluções digitais modernas que unem tecnologia, design e performance. Minha missão é transformar ideias em produtos funcionais e intuitivos.
            </p>
            
            <div className="hero-actions">
              <button onClick={() => {
                const element = document.getElementById('projects');
                element?.scrollIntoView({ behavior: 'smooth' });
              }} className="btn-primary">
                Ver Trabalhos
                <ArrowUpRight size={16} />
              </button>
              
              <button onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }} className="btn-secondary">
                Contato
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="code-block">
              <CodeDisplay />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 100px;
          position: relative;
          background: var(--color-bg-primary);
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-32);
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .hero-greeting {
          margin-bottom: var(--space-8);
          opacity: 0;
          animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
        }

        .hero-title {
          margin-bottom: var(--space-12);
          opacity: 0;
          animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards;
          font-size: clamp(4rem, 12vw, 7rem);
        }

        .hero-name {
          display: block;
          font-size: inherit;
          font-weight: 900;
          line-height: 0.85;
          color: var(--brand-black);
          margin-bottom: var(--space-6);
          letter-spacing: -4px;
        }

        .hero-profession {
          display: block;
          font-size: clamp(1.4rem, 4vw, 2.2rem);
          font-weight: 400;
          color: var(--color-text-secondary);
          font-family: var(--font-family-mono);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--color-text-secondary);
          margin-bottom: var(--space-12);
          opacity: 0;
          animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards;
          max-width: 90%;
        }

        .hero-actions {
          display: flex;
          gap: var(--space-6);
          flex-wrap: wrap;
          opacity: 0;
          animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s forwards;
        }

        .btn-primary,
        .btn-secondary {
          padding: var(--space-5) var(--space-10);
          border-radius: var(--radius-xl);
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: inline-flex;
          align-items: center;
          gap: var(--space-3);
          font-size: 1rem;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: var(--brand-black);
          color: var(--brand-white);
          border: 2px solid var(--brand-black);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .btn-primary:hover::before {
          transform: translateX(100%);
        }

        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
        }

        .btn-secondary {
          background: transparent;
          color: var(--brand-black);
          border: 2px solid var(--color-border);
        }

        .btn-secondary:hover {
          background: var(--brand-black);
          color: var(--brand-white);
          border-color: var(--brand-black);
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
        }

        .hero-visual {
          opacity: 0;
          animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s forwards;
          perspective: 1500px;
          position: relative;
          width: 120%;
          margin-left: -10%;
          overflow: visible;
        }

        .hero-visual::after {
          content: '';
          position: absolute;
          bottom: -40%;
          left: 5%;
          right: 5%;
          height: 80%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.03) 0%,
            transparent 70%
          );
          transform: scaleY(-1) translateY(100%) rotateX(80deg);
          pointer-events: none;
          opacity: 0.5;
          filter: blur(20px);
          z-index: -1;
        }

        .code-block {
          background: var(--color-bg-secondary);
          border: none;
          border-radius: var(--radius-2xl);
          padding: var(--space-12);
          position: relative;
          overflow: visible;
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.15),
            0 15px 35px rgba(0, 0, 0, 0.1),
            0 5px 15px rgba(0, 0, 0, 0.08);
          
          /* Perspectiva 3D - como se estivesse em um chão inclinado */
          transform: 
            perspective(1500px)
            rotateX(8deg)
            rotateY(-12deg)
            rotateZ(2deg)
            translateZ(20px)
            scale(1.05);
          
          transform-style: preserve-3d;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          
          /* Efeito de profundidade com gradiente */
          background: linear-gradient(
            135deg,
            var(--color-bg-secondary) 0%,
            var(--brand-gray-100) 100%
          );
        }

        .code-block:hover {
          transform: 
            perspective(1500px)
            rotateX(4deg)
            rotateY(-8deg)
            rotateZ(1deg)
            translateZ(40px)
            scale(1.08);
          
          box-shadow: 
            0 35px 80px rgba(0, 0, 0, 0.2),
            0 20px 45px rgba(0, 0, 0, 0.15),
            0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .code-block::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50px;
          background: linear-gradient(
            180deg,
            var(--color-border) 0%,
            var(--brand-gray-200) 100%
          );
          display: flex;
          align-items: center;
          padding: 0 var(--space-6);
          border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .code-block::after {
          content: '● ● ●';
          position: absolute;
          top: 16px;
          left: var(--space-6);
          font-size: 0.9rem;
          color: var(--color-text-muted);
          letter-spacing: 6px;
          z-index: 1;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        @keyframes fade-in-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .hero-visual {
            width: 110%;
            margin-left: -5%;
          }

          .code-block {
            transform: 
              perspective(1200px)
              rotateX(6deg)
              rotateY(-10deg)
              rotateZ(1deg)
              translateZ(15px)
              scale(1.03);
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: var(--space-12);
            text-align: center;
          }

          .hero-visual {
            width: 100%;
            margin-left: 0;
            margin-top: var(--space-8);
            order: 2;
          }

          .hero-text {
            order: 1;
          }

          .code-block {
            transform: 
              perspective(800px)
              rotateX(4deg)
              rotateY(-5deg)
              rotateZ(0deg)
              translateZ(10px)
              scale(1);
            
            max-width: 100%;
          }

          .code-block:hover {
            transform: 
              perspective(800px)
              rotateX(2deg)
              rotateY(-3deg)
              rotateZ(0deg)
              translateZ(20px)
              scale(1.02);
          }

          .hero-actions {
            justify-content: center;
            flex-direction: column;
            gap: var(--space-4);
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-content {
            gap: var(--space-8);
          }

          .hero-actions {
            gap: var(--space-3);
          }

          .code-block {
            transform: 
              perspective(600px)
              rotateX(2deg)
              rotateY(0deg)
              rotateZ(0deg)
              translateZ(5px)
              scale(1);
          }

          .code-block:hover {
            transform: 
              perspective(600px)
              rotateX(1deg)
              rotateY(0deg)
              rotateZ(0deg)
              translateZ(15px)
              scale(1.01);
          }
        }
      `}</style>
    </section>
  );
}

// Code Display Component
function CodeDisplay() {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const codeLines = useMemo(() => [
    { text: "const developer = {", indent: 0 },
    { text: "  name: 'Ivo Netto',", indent: 1 },
    { text: "  role: 'Full-Stack Developer',", indent: 1 },
    { text: "  location: 'Santa Catarina, Brasil',", indent: 1 },
    { text: "  skills: [", indent: 1 },
    { text: "    'React', 'Next.js', 'TypeScript',", indent: 2 },
    { text: "    'Node.js', 'Python', 'Docker',", indent: 2 },
    { text: "    'GraphQL', 'PostgreSQL', 'MongoDB'", indent: 2 },
    { text: "  ],", indent: 1 },
    { text: "  passion: 'Clean Code & Innovation',", indent: 1 },
    { text: "  available: true,", indent: 1 },
    { text: "  workStyle: {", indent: 1 },
    { text: "    mindset: 'Problem Solver',", indent: 2 },
    { text: "    focus: 'User Experience',", indent: 2 },
    { text: "    approach: 'Agile & Collaborative'", indent: 2 },
    { text: "  }", indent: 1 },
    { text: "};", indent: 0 },
    { text: "", indent: 0 },
    { text: "// Inicializando...", indent: 0 },
    { text: "developer.startCoding();", indent: 0 },
    { text: "console.log('Pronto para novos desafios! 🚀');", indent: 0 }
  ], []);

  useEffect(() => {
    if (displayedLines < codeLines.length) {
      const currentLine = codeLines[displayedLines];
      const typingSpeed = 30; // velocidade de digitação em ms
      
      if (currentCharIndex < currentLine.text.length) {
        const timer = setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1);
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        // Linha completa, passar para a próxima após uma pausa
        const lineDelay = setTimeout(() => {
          setDisplayedLines(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 100);
        return () => clearTimeout(lineDelay);
      }
    }
  }, [displayedLines, currentCharIndex, codeLines]);

  // Auto-scroll suave
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [displayedLines, currentCharIndex]);

  const renderLine = (line: { text: string; indent: number }, index: number) => {
    const isCurrentLine = index === displayedLines;
    const displayText = isCurrentLine 
      ? line.text.substring(0, currentCharIndex)
      : line.text;
    
    const shouldShow = index < displayedLines || (index === displayedLines && currentCharIndex > 0);

    if (!shouldShow) return null;

    return (
      <div key={index} className={`code-line code-indent-${line.indent}`}>
        {highlightSyntax(displayText)}
        {isCurrentLine && currentCharIndex < line.text.length && (
          <span className="cursor-blink">|</span>
        )}
      </div>
    );
  };

  const highlightSyntax = (text: string) => {
    // Palavras-chave
    const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else'];
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    
    // Strings
    const stringRegex = /'([^']*)'/g;
    
    // Propriedades
    const propertyRegex = /(\w+):/g;
    
    // Métodos
    const methodRegex = /\.(\w+)\(/g;
    
    // Comentários
    const commentRegex = /(\/\/.*)/g;
    
    // Booleanos
    const booleanRegex = /\b(true|false)\b/g;

    const result: React.ReactNode[] = [];
    let lastIndex = 0;

    // Encontrar todas as correspondências
    const matches = [
      ...Array.from(text.matchAll(keywordRegex)).map(m => ({ text: m[0], type: 'keyword', start: m.index!, end: m.index! + m[0].length })),
      ...Array.from(text.matchAll(stringRegex)).map(m => ({ text: m[0], type: 'string', start: m.index!, end: m.index! + m[0].length })),
      ...Array.from(text.matchAll(propertyRegex)).map(m => ({ text: m[1], type: 'property', start: m.index!, end: m.index! + m[1].length })),
      ...Array.from(text.matchAll(methodRegex)).map(m => ({ text: m[1], type: 'method', start: m.index! + 1, end: m.index! + 1 + m[1].length })),
      ...Array.from(text.matchAll(commentRegex)).map(m => ({ text: m[0], type: 'comment', start: m.index!, end: m.index! + m[0].length })),
      ...Array.from(text.matchAll(booleanRegex)).map(m => ({ text: m[0], type: 'boolean', start: m.index!, end: m.index! + m[0].length }))
    ].sort((a, b) => a.start - b.start);

    // Construir resultado
    matches.forEach((match, i) => {
      // Adicionar texto antes da correspondência
      if (match.start > lastIndex) {
        result.push(
          <span key={`text-${i}`} className="code-text">
            {text.substring(lastIndex, match.start)}
          </span>
        );
      }

      // Adicionar correspondência com estilo
      result.push(
        <span key={`match-${i}`} className={`code-${match.type}`}>
          {match.text}
        </span>
      );

      lastIndex = match.end;
    });

    // Adicionar texto restante
    if (lastIndex < text.length) {
      result.push(
        <span key="text-end" className="code-text">
          {text.substring(lastIndex)}
        </span>
      );
    }

    return result.length > 0 ? result : <span className="code-text">{text}</span>;
  };

  return (
    <div className="code-display" ref={scrollContainerRef}>
      {codeLines.map((line: { text: string; indent: number }, index: number) => renderLine(line, index))}
      {displayedLines >= codeLines.length && (
        <div className="code-line">
          <span className="cursor-blink">|</span>
        </div>
      )}

      <style jsx>{`
        .code-display {
          font-family: var(--font-family-mono);
          font-size: 0.9rem;
          line-height: 1.9;
          padding-top: 40px;
          position: relative;
          z-index: 1;
          max-height: 380px;
          overflow-y: auto;
          overflow-x: hidden;
          padding-right: var(--space-4);
        }

        .code-display::-webkit-scrollbar {
          width: 6px;
        }

        .code-display::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 3px;
        }

        .code-display::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .code-display::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .code-line {
          display: block;
          margin-bottom: 3px;
          white-space: pre-wrap;
          word-break: break-word;
          transition: all 0.2s ease;
          opacity: 1;
        }

        .code-line:hover {
          background: rgba(0, 0, 0, 0.02);
          padding-left: 4px;
          margin-left: -4px;
          border-radius: 4px;
        }

        .code-indent-0 { padding-left: 0; }
        .code-indent-1 { padding-left: var(--space-6); }
        .code-indent-2 { padding-left: var(--space-12); }

        .cursor-blink {
          color: var(--brand-black);
          font-weight: 700;
          animation: blink 1s infinite;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .code-text {
          color: var(--color-text-primary);
        }

        .code-keyword {
          color: #d73a49;
          font-weight: 700;
        }

        .code-variable {
          color: #6f42c1;
          font-weight: 700;
        }

        .code-property {
          color: #005cc5;
          font-weight: 600;
        }

        .code-string {
          color: #032f62;
          font-weight: 500;
        }

        .code-boolean {
          color: #d73a49;
          font-weight: 600;
        }

        .code-method {
          color: #6f42c1;
          font-weight: 600;
        }

        .code-comment {
          color: #6a737d;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .code-display {
            font-size: 0.8rem;
            line-height: 1.7;
            max-height: 300px;
          }

          .code-indent-1 { padding-left: var(--space-4); }
          .code-indent-2 { padding-left: var(--space-8); }
        }

        @media (max-width: 480px) {
          .code-display {
            font-size: 0.75rem;
            max-height: 250px;
          }
        }
      `}</style>
    </div>
  );
}

// About Section
function AboutSection() {
  // Mapeamento de tecnologias para ícones
  const techIcons: { [key: string]: React.ReactNode } = {
    'JavaScript': <FaJsSquare />,
    'TypeScript': <SiTypescript />,
    'HTML5': <FaHtml5 />,
    'CSS3': <FaCss3Alt />,
    'SCSS': <SiSass />,
    'React': <FaReact />,
    'Vue.js': <FaVuejs />,
    'Next.js': <SiNextdotjs />,
    'Nuxt.js': <SiNuxtdotjs />,
    'Webpack': <SiWebpack />,
    'Vite': <SiVite />,
    'Babel': <SiBabel />,
    'Figma': <FaFigma />,
    'ESLint': <SiEslint />,
    'Prettier': <SiPrettier />,
    'C#': <SiDotnet />,
    'Python': <FaPython />,
    'Node.js': <FaNodeJs />,
    '.NET Core': <SiDotnet />,
    'Entity Framework': <SiDotnet />,
    'Django': <SiDjango />,
    'Flask': <SiFlask />,
    'FastAPI': <SiFastapi />,
    'Express': <SiExpress />,
    'NestJS': <SiNestjs />,
    'GraphQL': <SiGraphql />,
    'Redis': <SiRedis />,
    'Docker': <FaDocker />,
    'Kubernetes': <SiKubernetes />,
    'Git': <FaGitAlt />,
    'GitHub Actions': <SiGithubactions />,
    'GitLab CI': <SiGitlab />,
    'Jenkins': <SiJenkins />,
    'CircleCI': <SiCircleci />,
    'Terraform': <SiTerraform />,
    'Pulumi': <SiPulumi />,
    'Prometheus': <SiPrometheus />,
    'Grafana': <SiGrafana />,
    'Elasticsearch': <SiElasticsearch />,
    'Kibana': <SiKibana />,
    'Sentry': <SiSentry />,
    'Datadog': <SiDatadog />,
    'Helm': <SiHelm />,
    'React Native': <FaReact />,
    'Flutter': <SiFlutter />,
    'Xamarin': <SiDotnet />,
    'Firebase': <SiFirebase />,
    'Android Studio': <SiAndroidstudio />,
    'Xcode': <SiXcode />
  };

  const skills = [
    { 
      name: 'Frontend', 
      icon: '</>',
      tech: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'Next.js', 'HTML5', 'CSS3'],
      description: 'Interfaces modernas e responsivas'
    },
    { 
      name: 'Backend', 
      icon: '{ }',
      tech: ['C#', 'Python', 'Node.js', '.NET Core', 'Django', 'Express', 'GraphQL'],
      description: 'APIs robustas e escaláveis'
    },
    { 
      name: 'DevOps', 
      icon: '[]',
      tech: ['Docker', 'Kubernetes', 'Git', 'GitHub Actions', 'Terraform', 'Prometheus'],
      description: 'Infraestrutura e automação'
    },
    { 
      name: 'Mobile', 
      icon: '()',
      tech: ['React Native', 'Flutter', 'Xamarin', 'Firebase', 'Android Studio'],
      description: 'Apps multiplataforma'
    }
  ];  return (
    <section id="about" className="section-lg bg-secondary">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">
              Sobre <span className="font-mono">&lt;/mim&gt;</span>
            </h2>
            
            <div className="about-description">
              <p>
                Sou um desenvolvedor full-stack com foco em criar experiências digitais funcionais e intuitivas. Tenho experiência no desenvolvimento de aplicações web e mobile, sempre buscando unir desempenho, boas práticas e uma interface agradável ao usuário.
              </p>
              <p>
                Minha motivação está em transformar ideias em soluções reais, explorando constantemente novas tecnologias e aprimorando meu processo de desenvolvimento. Além do código, valorizo a colaboração, a troca de conhecimento e o impacto positivo que a tecnologia pode gerar.
              </p>
            </div>
          </div>
          
          <div className="skills-grid">
            {skills.map((category, index) => (
              <div key={category.name} className="skill-category" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="skill-header">
                  <div className="skill-icon">
                    <span className="skill-symbol">{category.icon}</span>
                  </div>
                  <div className="skill-info">
                    <h3 className="skill-category-title">{category.name}</h3>
                    <p className="skill-description">{category.description}</p>
                  </div>
                </div>
                <div className="skill-tags">
                  {category.tech.map((tech) => (
                    <span key={tech} className="skill-tag">
                      <span className="skill-tag-icon">
                        {techIcons[tech] || <span>•</span>}
                      </span>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-20);
          align-items: start;
        }

        .section-title {
          font-size: clamp(3.5rem, 8vw, 6rem);
          font-weight: 900;
          margin-bottom: var(--space-12);
          color: var(--brand-black);
          letter-spacing: -3px;
          line-height: 0.9;
        }

        .about-description {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .about-description p {
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--color-text-secondary);
        }

        .skills-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .skill-category {
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .skill-category:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--brand-black);
        }

        .skill-header {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .skill-icon {
          width: 50px;
          height: 50px;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }

        .skill-category:hover .skill-icon {
          background: var(--brand-black);
          border-color: var(--brand-black);
        }

        .skill-symbol {
          font-family: var(--font-family-mono);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--brand-black);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          letter-spacing: -1px;
        }

        .skill-category:hover .skill-symbol {
          color: var(--brand-white);
        }

        .skill-info {
          flex: 1;
        }

        .skill-category-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: var(--space-1);
          color: var(--brand-black);
          letter-spacing: -0.5px;
        }

        .skill-description {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          font-weight: 500;
          line-height: 1.4;
          margin-bottom: var(--space-3);
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .skill-tag {
          background: var(--brand-black);
          color: var(--brand-white);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 600;
          font-family: var(--font-family-mono);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 1px solid var(--brand-black);
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }

        .skill-tag-icon {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
        }

        .skill-category:hover .skill-tag {
          background: var(--color-bg-primary);
          color: var(--brand-black);
          transform: translateY(-1px);
          box-shadow: var(--shadow-xs);
        }

        @media (max-width: 1024px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: var(--space-16);
          }

          .section-title {
            font-size: clamp(3rem, 8vw, 5rem);
            margin-bottom: var(--space-12);
            text-align: center;
          }

          .about-description {
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
          }

          .about-description p {
            font-size: 1.1rem;
          }

          .skills-grid {
            gap: var(--space-4);
            margin: 0 auto;
          }

          .skill-category {
            padding: var(--space-6);
          }

          .skill-header {
            gap: var(--space-5);
          }

          .skill-icon {
            width: 60px;
            height: 60px;
          }

          .skill-symbol {
            font-size: 1.4rem;
          }

          .skill-category-title {
            font-size: 1.2rem;
          }

          .skill-description {
            font-size: 0.9rem;
          }

          .skill-tags {
            gap: var(--space-2);
          }

          .skill-tag {
            padding: var(--space-2) var(--space-3);
            font-size: 0.75rem;
          }
        }

        @media (max-width: 768px) {
          .about-content {
            gap: var(--space-12);
          }

          .section-title {
            font-size: clamp(2.5rem, 8vw, 4rem);
            margin-bottom: var(--space-10);
          }

          .about-description p {
            font-size: 1rem;
          }

          .skills-grid {
            gap: var(--space-3);
            max-width: 100%;
          }

          .skill-category {
            padding: var(--space-5);
          }

          .skill-header {
            gap: var(--space-4);
          }

          .skill-icon {
            width: 50px;
            height: 50px;
          }

          .skill-symbol {
            font-size: 1.2rem;
          }

          .skill-category-title {
            font-size: 1.1rem;
          }

          .skill-description {
            font-size: 0.85rem;
          }

          .skill-tags {
            gap: var(--space-1);
          }

          .skill-tag {
            padding: var(--space-1) var(--space-2);
            font-size: 0.7rem;
            gap: 2px;
          }

          .skill-tag-icon {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .about-content {
            gap: var(--space-10);
          }

          .section-title {
            font-size: clamp(2rem, 8vw, 3rem);
            margin-bottom: var(--space-8);
          }

          .about-description p {
            font-size: 0.95rem;
          }

          .skills-grid {
            gap: var(--space-3);
          }

          .skill-category {
            padding: var(--space-4);
          }

          .skill-header {
            gap: var(--space-3);
            flex-direction: column;
            text-align: center;
          }

          .skill-info {
            text-align: center;
          }

          .skill-icon {
            width: 45px;
            height: 45px;
          }

          .skill-symbol {
            font-size: 1.1rem;
          }

          .skill-category-title {
            font-size: 1rem;
            margin-bottom: var(--space-2);
          }

          .skill-description {
            font-size: 0.8rem;
            margin-bottom: var(--space-3);
          }

          .skill-tags {
            justify-content: center;
            gap: var(--space-1);
          }

          .skill-tag {
            padding: var(--space-1) var(--space-2);
            font-size: 0.65rem;
          }
        }
      `}</style>
    </section>
  );
}

// Experience Section
// Experience Section
function ExperienceSection() {
  const experiences = [
    {
      period: '2022 - Atual',
      position: 'Técnico de TI Pleno',
      company: 'Selbetti',
      description: 'Atuação no suporte técnico de primeiro nível, acompanhando a administração de infraestrutura de TI e auxiliando em projetos de migração e melhorias.',
      achievements: [
        'Acompanhamento de migração para cloud com redução de custos',
        'Suporte na implementação de sistemas internos para otimização de processos',
        'Criação de scripts para automação de tarefas',
        'Colaboração técnica com uma equipe de 8 profissionais'
      ],
      skills: ['VMware Cloud', 'Linux', 'Zabbix', 'Veeam', 'SQL']
    },
    {
      period: '2024 - Atualmente',
      position: 'Desenvolvedor Full-Stack',
      company: 'Freelancer & Projetos Próprios',
      description: 'Desenvolvimento de aplicações web e mobile personalizadas, com foco em soluções escaláveis e de alta performance para diversos clientes.',
      achievements: [
        'Entrega de mais de 25 projetos com alta satisfação dos clientes',
        'Criação de sistemas de gestão utilizados por mais de 15 empresas',
        'Lançamento de aplicativo mobile com mais de 10k downloads'
      ],
      skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'MySQL']
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title text-center">
          Jornada <span className="font-mono">&lt;/profissional&gt;</span>
        </h2>
        
        <div className="timeline-content-wrapper">
          <div className="timeline-line"></div>
          
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-year">{exp.period}</div>
              <div className="timeline-node"></div>
              
              <div className="timeline-content">
                <h3 className="timeline-position">{exp.position}</h3>
                <div className="timeline-company">{exp.company}</div>
                <p className="timeline-description">{exp.description}</p>
                
                <ul className="timeline-achievements">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
                
                <div className="timeline-skills">
                  {exp.skills.map((skill) => (
                    <span key={skill} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const projects = [
    {
      title: 'Workee',
      category: 'Sistema de Gestão',
      description: 'Controlador de ordens de serviço com gestão completa de fluxo de trabalho, atribuição de tarefas e acompanhamento de status em tempo real.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
      image: '/images/Workee.webp',
    link: 'https://wa.me/554788036516',
    },
    {
      title: 'ChatBot WhatsApp',
      category: 'Automação & IA',
      description: 'Bot inteligente para WhatsApp com processamento de linguagem natural, integração com APIs e automação de atendimento ao cliente.',
      tech: ['Node.js', 'WhatsApp API', 'OpenAI'],
      image: '/images/ChatBot.webp',
    link: 'https://wa.me/554788036516?text=digite%20.commands%20para%20listar%20todos%20comando',
    }
  ];

  return (
    <section id="projects" className="section-lg bg-secondary">
      <div className="container">
        <h2 className="section-title text-center">
          Projetos <span className="font-mono">&lt;/destacados&gt;</span>
        </h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.category}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  priority={index < 2}
                />
              </div>
              
              <div className="project-content">
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  <a href={project.link} className="project-link">
                    Ver Projeto <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section-title {
          font-size: clamp(3.5rem, 8vw, 6rem);
          font-weight: 900;
          margin-bottom: var(--space-20);
          color: var(--brand-black);
          letter-spacing: -3px;
          line-height: 0.9;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-6);
        }

        .project-card {
          background: var(--color-bg-primary);
          border: none;
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0;
          transform: translateY(30px);
          animation: fade-in-up 0.8s ease forwards;
          box-shadow: var(--shadow-md);
        }

        .project-card:nth-child(1) { animation-delay: 0.1s; }
        .project-card:nth-child(2) { animation-delay: 0.3s; }
        .project-card:nth-child(3) { animation-delay: 0.5s; }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }

        .project-image {
          aspect-ratio: 16/10;
          background: var(--color-bg-secondary);
          border-bottom: 1px solid var(--color-border);
          position: relative;
          overflow: hidden;
        }

        .project-image img {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .project-card:hover .project-image img {
          transform: scale(1.05);
        }

        .project-content {
          padding: var(--space-8);
          text-align: center;
        }

        .project-category {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--brand-black);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: var(--space-3);
          display: inline-block;
          background: var(--color-bg-secondary);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--brand-black);
          margin-bottom: var(--space-4);
          line-height: 1.2;
          letter-spacing: -1px;
        }

        .project-description {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
          max-width: 95%;
          margin-left: auto;
          margin-right: auto;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
          justify-content: center;
        }

        .tech-tag {
          background: var(--brand-black);
          color: var(--brand-white);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tech-tag:hover {
          background: var(--color-text-secondary);
          transform: translateY(-2px);
        }

        .project-links {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-4) var(--space-6);
          border-radius: var(--radius-full);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
          min-width: 120px;
          justify-content: center;
        }
          @media (max-width: 480px) {
            .project-link {
              padding: var(--space-2) var(--space-4);
            }
          }

        .project-link:not(.secondary) {
          background: var(--brand-black);
          color: var(--brand-white);
          border: 2px solid var(--brand-black);
        }

        .project-link:not(.secondary):hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .project-link.secondary {
          background: transparent;
          color: var(--brand-black);
          border: 2px solid var(--color-border);
        }

        .project-link.secondary:hover {
          background: var(--brand-black);
          color: var(--brand-white);
          border-color: var(--brand-black);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
}

// Contact Section
function ContactSection() {
  // Adiciona o import do emailjs
  // import emailjs from '@emailjs/browser';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Envia o e-mail via EmailJS no frontend
      await import('@emailjs/browser').then(emailjs =>
        emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )
      );
      setSubmitStatus('success');
      setStatusMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
      setStatusMessage('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 5000);
    }
  };
  return (
    <section id="contact" className="section-lg">
      <div className="container">
        <div className="contact-content">
          <div className="contact-text">
            <h2 className="section-title">
              Vamos <span className="font-mono">&lt;/colaborar&gt;</span>
            </h2>
            
            <p className="contact-description">
              Tem um projeto em mente? Quer discutir uma oportunidade ou apenas 
              trocar uma ideia sobre tecnologia? Estou sempre aberto a novas 
              conversas e desafios interessantes.
            </p>
            
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={20} />
                <span>nettocodes@outlook.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={20} />
                <span>SC, Brasil</span>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Conte-me sobre seu projeto ou ideia..."
                ></textarea>
              </div>
              
              {statusMessage && (
                <div className={`status-message ${submitStatus}`}>
                  {statusMessage}
                </div>
              )}
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Mensagem
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-32);
            align-items: start;
          }
          @media (max-width: 1024px) {
            .contact-content {
              grid-template-columns: 1fr;
              gap: var(--space-12);
            }
        }

        .section-title {
          font-size: clamp(3.5rem, 8vw, 6rem);
          font-weight: 900;
          margin-bottom: var(--space-12);
          color: var(--brand-black);
          letter-spacing: -3px;
          line-height: 0.9;
        }

        .contact-description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--color-text-secondary);
          margin-bottom: var(--space-12);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          color: var(--color-text-secondary);
        }

        .contact-form {
          background: var(--color-bg-secondary);
          border: none;
          border-radius: var(--radius-2xl);
          padding: var(--space-12);
          box-shadow: var(--shadow-lg);
        }

        .form-group {
          margin-bottom: var(--space-6);
        }

        .form-group label {
          display: block;
          margin-bottom: var(--space-2);
          font-weight: 500;
          color: var(--brand-black);
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: var(--space-4);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-family: inherit;
          background: var(--color-bg-primary);
          transition: all 0.3s ease;
          resize: none;
        }

        .form-group textarea {
          min-height: 120px;
          max-height: 120px;
          overflow-y: auto;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--brand-black);
          box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.1);
        }

        .form-group input:disabled,
        .form-group textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-message {
          padding: var(--space-4);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-6);
          font-size: 0.9rem;
          font-weight: 500;
          text-align: center;
        }

        .status-message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status-message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .submit-btn {
          width: 100%;
          padding: var(--space-5) var(--space-8);
          background: var(--brand-black);
          color: var(--brand-white);
          border: none;
          border-radius: var(--radius-xl);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          position: relative;
          overflow: hidden;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: var(--space-12);
          }

          .section-title {
            font-size: clamp(2.5rem, 8vw, 4rem);
            text-align: center;
          }

          .contact-description {
            text-align: center;
            font-size: 1rem;
          }

          .contact-info {
            text-align: center;
          }

          .contact-form {
            padding: var(--space-8);
          }

          .form-group input,
          .form-group textarea {
            padding: var(--space-3);
          }

          .form-group textarea {
            min-height: 100px;
            max-height: 100px;
          }

          .submit-btn {
            padding: var(--space-4) var(--space-6);
          }

          .status-message {
            font-size: 0.85rem;
            padding: var(--space-3);
          }
        }

        @media (max-width: 480px) {
          .contact-content {
            gap: var(--space-8);
          }

          .contact-form {
            padding: var(--space-6);
            border-radius: var(--radius-xl);
          }
        }
      `}</style>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo-container">
              <Image 
                src="/images/logo-white.svg" 
                alt="IBN Logo"
                width={100}
                height={40}
                style={{ display: 'block' }}
              />
              <span className="footer-logo-text">netto</span>
            </div>
            <p className="footer-tagline">
              Desenvolvedor Full-Stack apaixonado por criar experiências digitais 
              inovadoras e de alta performance. Transformando ideias em soluções 
              reais através de código limpo, design intuitivo e tecnologias modernas.
            </p>
            <div className="footer-info">
              <div className="footer-info-item">
                <MapPin size={16} />
                <span>Santa Catarina, Brasil</span>
              </div>
              <div className="footer-info-item">
                <Mail size={16} />
                <span>nettocodes@outlook.com</span>
              </div>
            </div>
          </div>
          
          {/* Links Section */}
          <div className="footer-links-container">
            <h3 className="footer-links-title">Conecte-se</h3>
            <div className="footer-links">
              <a href="https://www.linkedin.com/in/ivobraatz/" target="_blank" rel="noopener noreferrer" className="footer-link social-link">
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/nettocodes" target="_blank" rel="noopener noreferrer" className="footer-link social-link">
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
              <a href="https://www.threads.com/@ivo.braatz" target="_blank" rel="noopener noreferrer" className="footer-link social-link">
                <SiThreads size={20} />
                <span>Threads</span>
              </a>
              <a href="https://discord.com/users/1055496313002803331" target="_blank" rel="noopener noreferrer" className="footer-link social-link">
                <FaDiscord size={20} />
                <span>Discord</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Ivo Netto. Todos os direitos reservados.</p>
          <p className="footer-made-with">
            Desenvolvido com <span className="footer-heart">♥</span> usando Next.js & TypeScript
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--brand-black);
          color: var(--brand-white);
          padding: var(--space-20) 0 var(--space-8);
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--brand-gray-700), transparent);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: var(--space-12);
          margin-bottom: var(--space-12);
          padding-bottom: var(--space-12);
          border-bottom: 1px solid var(--brand-gray-800);
          align-items: start;
        }

        .footer-brand {
          max-width: 600px;
        }

        .footer-logo-container {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: var(--space-6);
        }

        .footer-logo-text {
          font-family: var(--font-family-mono);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--brand-white);
          letter-spacing: 1px;
          text-transform: lowercase;
          background: linear-gradient(135deg, var(--brand-white) 0%, var(--brand-gray-400) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-tagline {
          color: var(--brand-gray-400);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: var(--space-6);
          font-weight: 400;
        }

        .footer-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .footer-info-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          color: var(--brand-gray-400);
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .footer-info-item:hover {
          color: var(--brand-white);
        }

        .footer-links-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
          min-width: 200px;
        }

        .footer-links-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--brand-white);
          letter-spacing: 0.5px;
          margin: 0;
          margin-bottom: var(--space-2);
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .footer-link {
          color: var(--brand-gray-400);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }

        .footer-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .footer-link:hover::before {
          transform: translateX(100%);
        }

        .footer-link:hover {
          color: var(--brand-white);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateX(4px);
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.08);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-8);
          font-size: 0.9rem;
          color: var(--brand-gray-500);
        }

        .footer-made-with {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .footer-heart {
          color: #ff4757;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: var(--space-10);
          }

          .footer-brand {
            max-width: 100%;
          }

          .footer-links-container {
            width: 100%;
          }

          .footer-links {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-3);
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .footer {
            padding: var(--space-16) 0 var(--space-6);
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: var(--space-10);
            padding-bottom: var(--space-10);
          }

          .footer-brand {
            max-width: 100%;
          }

          .footer-logo-container {
            justify-content: flex-start;
          }

          .footer-links-container {
            width: 100%;
          }

          .footer-links {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: var(--space-3);
          }

          .footer-link {
            width: 100%;
          }

          .footer-bottom {
            flex-direction: column;
            gap: var(--space-4);
            text-align: center;
          }

          .footer-info {
            width: 100%;
          }

          .footer-info-item {
            font-size: 0.85rem;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .footer {
            padding: var(--space-12) 0 var(--space-6);
          }

          .footer-tagline {
            font-size: 0.9rem;
          }

          .footer-links-title {
            font-size: 1rem;
          }

          .footer-bottom {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </footer>
  );
}
