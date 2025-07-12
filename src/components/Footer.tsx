import React, { useState, useEffect } from 'react';
import styles from './Footer.module.scss';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaCode, 
  FaArrowUp
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Detecta quando o footer entra em vista
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.querySelector(`.${styles.footer}`);
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  return (
    <footer className={`${styles.footer} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        {/* Seção Principal */}
        <div className={styles.mainSection}>
          <div className={styles.brand}>
            <span className={styles.logo}>Ivo Netto</span>
            <span className={styles.slogan}>Desenvolvedor Full Stack</span>
            <p className={styles.description}>
              Apaixonado por criar soluções digitais inovadoras que fazem a diferença. 
              Especializado em React, Node.js e tecnologias modernas.
            </p>
          </div>
          
          <div className={styles.quickLinks}>
            <h3 className={styles.sectionTitle}>Navegação</h3>
            <div className={styles.links}>
              <a href="#hero" onClick={(e) => {
                e.preventDefault();
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
              }}>Início</a>
              <a href="#about" onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}>Sobre</a>
              <a href="#projects" onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}>Projetos</a>
              <a href="#skills" onClick={(e) => {
                e.preventDefault();
                document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
              }}>Habilidades</a>
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>Contato</a>
            </div>
          </div>
        </div>

        {/* Seção de Contato */}
        <div className={styles.contactSection}>
          <h3 className={styles.sectionTitle}>Contato</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <FaEnvelope className={styles.icon} />
              <span>braatzivo@hotmail.com</span>
            </div>
            <div className={styles.contactItem}>
              <FaWhatsapp className={styles.icon} />
              <span>(47) 99140-3388</span>
            </div>
            <div className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.icon} />
              <span>Santa Catarina, Brasil</span>
            </div>
          </div>
          
          <div className={styles.socials}>
            <a 
              href="https://github.com/IvoBraatz" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub" 
              title="GitHub"
              className={styles.socialGithub}
            >
              <FaGithub />
            </a>
            <a 
              href="https://linkedin.com/in/ivo-braatz" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              title="LinkedIn"
              className={styles.socialLinkedin}
            >
              <FaLinkedin />
            </a>
            <a 
              href="mailto:braatzivo@hotmail.com" 
              aria-label="Email" 
              title="Email"
              className={styles.socialEmail}
            >
              <FaEnvelope />
            </a>
            <a 
              href="https://wa.me/5547991403388" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="WhatsApp" 
              title="WhatsApp"
              className={styles.socialWhatsapp}
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Seção Tecnologias */}
        <div className={styles.techSection}>
          <h3 className={styles.sectionTitle}>Tecnologias</h3>
          <div className={styles.techGrid}>
            <div className={`${styles.techCategory} ${styles.techFrontend}`}>
              <strong>Frontend</strong>
              <span>React, TypeScript, SCSS</span>
            </div>
            <div className={`${styles.techCategory} ${styles.techBackend}`}>
              <strong>Backend</strong>
              <span>Node.js, Express, APIs</span>
            </div>
            <div className={`${styles.techCategory} ${styles.techDatabase}`}>
              <strong>Database</strong>
              <span>MongoDB, PostgreSQL</span>
            </div>
            <div className={`${styles.techCategory} ${styles.techTools}`}>
              <strong>Tools</strong>
              <span>Git, Docker, Vite</span>
            </div>
          </div>
        </div>

        {/* Botão Voltar ao Topo */}
        <button 
          className={styles.scrollToTop}
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
        >
          <FaArrowUp />
        </button>
      </div>

      {/* Seção de Copyright */}
      <div className={styles.bottomSection}>
        <div className={styles.copyContainer}>
          <div className={styles.copy}>
            <span>&copy; {new Date().getFullYear()} Ivo Netto. Todos os direitos reservados.</span>
            <span className={styles.credits}>
              Desenvolvido com React, Vite e muito café ☕
            </span>
          </div>
          <div className={styles.madeWith}>
            <FaCode className={styles.codeIcon} />
            <span>Código disponível no GitHub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;