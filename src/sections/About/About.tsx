import React, { useEffect, useRef } from 'react';
import styles from './About.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '../../assets/ivo.jpg';
import HeaderSection from '../../components/HeaderSection';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do conteúdo
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animação da imagem
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: 50, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animação das estatísticas
      gsap.fromTo(statsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animação dos princípios
      gsap.fromTo(principlesRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: principlesRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className="container">
        <HeaderSection 
          title="Sobre mim" 
          subtitle="Desenvolvedor que transforma café em código e ideias em realidade digital"
          variant="dark"
        />
        
        <div className={styles.content}>
          <div className={styles.mainContent}>
            <div className={styles.imageContainer} ref={imageRef}>
              <div className={styles.profileImage}>
                <img src={profileImage} alt="Ivo Netto" />
                <div className={styles.imageOverlay}></div>
              </div>
            </div>

            <div className={styles.textContent} ref={contentRef}>
              <div className={styles.introduction}>
                <p className={styles.highlight}>
                  Eu construo experiências web que fazem a diferença no mundo real.
                </p>
                
                <p className={styles.description}>
                  Comecei minha jornada na programação há 3 anos e desde então me especializei em criar soluções web robustas e escaláveis. 
                  Trabalho principalmente com React e TypeScript no frontend, Node.js no backend, e tenho experiência sólida com bancos de dados relacionais e NoSQL.
                </p>
                
                <p className={styles.description}>
                  Cada projeto é uma oportunidade de aprender algo novo e resolver problemas únicos. Acredito que bom código não é apenas o que funciona, 
                  mas o que pode ser mantido, expandido e compreendido por outros desenvolvedores.
                </p>
                
                <p className={styles.description}>
                  Quando não estou codando, estou estudando novas tecnologias, contribuindo para projetos open source ou compartilhando conhecimento com a comunidade dev.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.skillsSection}>
            <h3 className={styles.skillsTitle}>Stack atual</h3>
            <div className={styles.skillsList}>
              <span className={styles.skill}>React</span>
              <span className={styles.skill}>TypeScript</span>
              <span className={styles.skill}>Node.js</span>
              <span className={styles.skill}>Next.js</span>
              <span className={styles.skill}>PostgreSQL</span>
              <span className={styles.skill}>MongoDB</span>
              <span className={styles.skill}>Docker</span>
              <span className={styles.skill}>SCSS</span>
            </div>
          </div>

          <div className={styles.principlesSection}>
            <h3 className={styles.principlesTitle}>Meus princípios</h3>
            <div className={styles.principlesList} ref={principlesRef}>
              <div className={styles.principle}>
                <span className={styles.principleIcon}>💡</span>
                <div className={styles.principleContent}>
                  <h4>Código limpo</h4>
                  <p>Escrevo código que outros desenvolvedores conseguem entender e manter</p>
                </div>
              </div>
              <div className={styles.principle}>
                <span className={styles.principleIcon}>🚀</span>
                <div className={styles.principleContent}>
                  <h4>Performance</h4>
                  <p>Cada linha de código importa para a experiência do usuário final</p>
                </div>
              </div>
              <div className={styles.principle}>
                <span className={styles.principleIcon}>🔧</span>
                <div className={styles.principleContent}>
                  <h4>Pragmatismo</h4>
                  <p>A melhor solução é aquela que resolve o problema de forma eficiente</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.stats} ref={statsRef}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>3+</span>
            <span className={styles.statLabel}>Anos codando</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>25+</span>
            <span className={styles.statLabel}>Projetos entregues</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>∞</span>
            <span className={styles.statLabel}>Cafés consumidos</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Comprometimento</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;