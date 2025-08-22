'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Custom cursor effect
  useEffect(() => {
    if (!showMainContent || typeof window === 'undefined') return;

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && window.innerWidth > 768) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [showMainContent]);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Set initial states
    gsap.set([text1Ref.current, text2Ref.current], { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    });

    // Entrance animation with more personality
    timeline.to(text1Ref.current, 
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1.2, 
        ease: "back.out(1.7)" 
      }
    );

    timeline.to(text2Ref.current, 
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1, 
        ease: "back.out(1.4)" 
      }, "-=0.4"
    );

    // Typing effect simulation
    timeline.to({}, { duration: 2.8 });

    // Exit animation
    timeline.to([text1Ref.current, text2Ref.current], {
      x: typeof window !== 'undefined' ? -window.innerWidth : -1000,
      duration: 1,
      stagger: 0.15,
      ease: "power3.inOut",
      onComplete: () => {
        setShowMainContent(true);
      }
    });

    // Loading screen exit
    timeline.to(loadingRef.current, {
      x: typeof window !== 'undefined' ? -window.innerWidth : -1000,
      duration: 0.8,
      ease: "power3.inOut"
    }, "-=0.3");

    // Main content entrance
    timeline.fromTo(mainContentRef.current,
      { 
        opacity: 0, 
        y: 30
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "power2.out" 
      }
    );

  }, []);

  // Project data with more personality
  const projects = [
    {
      title: 'E-commerce Revolution',
      subtitle: 'Full-Stack Development',
      description: 'Transforming online retail with cutting-edge technology. Built a comprehensive platform handling 10k+ daily transactions with real-time inventory, advanced analytics, and seamless payment processing.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Redis'],
      highlight: 'Increased conversion rate by 340%',
      year: '2024'
    },
    {
      title: 'Creative Studio Portfolio',
      subtitle: 'Interactive Design',
      description: 'Award-winning portfolio showcasing creative work through immersive animations and micro-interactions. Features advanced GSAP animations and WebGL effects.',
      tech: ['Next.js', 'GSAP', 'Three.js', 'Framer Motion'],
      highlight: 'Featured on Awwwards',
      year: '2024'
    },
    {
      title: 'TeamFlow Dashboard',
      subtitle: 'Collaboration Platform',
      description: 'Revolutionary task management platform with real-time collaboration, AI-powered insights, and intuitive drag-and-drop interface. Used by 500+ teams worldwide.',
      tech: ['React', 'Firebase', 'WebSockets', 'Chart.js'],
      highlight: 'Boosted team productivity by 65%',
      year: '2023'
    },
    {
      title: 'DataViz Analytics',
      subtitle: 'Business Intelligence',
      description: 'Interactive analytics dashboard transforming complex data into actionable insights. Features real-time visualizations and customizable reporting.',
      tech: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
      highlight: 'Processing 1M+ data points daily',
      year: '2023'
    }
  ];

  const skills = [
    { 
      name: 'Frontend Magic', 
      description: 'React, Next.js, TypeScript', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L13.09 8.26L19 7L17.74 13.26L24 12L17.74 10.74L19 17L13.09 15.74L12 22L10.91 15.74L5 17L6.26 10.74L0 12L6.26 13.26L5 7L10.91 8.26L12 2Z"/>
        </svg>
      )
    },
    { 
      name: 'Backend Power', 
      description: 'Node.js, Python, APIs', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H11V20H8V22H16V20H13V18H20Z"/>
        </svg>
      )
    },
    { 
      name: 'Design Thinking', 
      description: 'UX/UI, Animations, GSAP', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
        </svg>
      )
    },
    { 
      name: 'Cloud & DevOps', 
      description: 'AWS, Docker, CI/CD', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.5,20Q4.22,20 2.61,18.43Q1,16.85 1,14.58Q1,12.63 2.17,11.1Q3.35,9.57 5.25,9.15Q5.88,6.85 7.75,5.43Q9.63,4 12,4Q14.93,4 16.96,6.04Q19,8.07 19,11Q20.73,11.2 21.86,12.5Q23,13.78 23,15.5A4.5,4.5 0 0,1 18.5,20H6.5Z"/>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Custom Cursor */}
      {showMainContent && typeof window !== 'undefined' && window.innerWidth > 768 && (
        <div 
          ref={cursorRef}
          style={{
            position: 'fixed',
            width: '20px',
            height: '20px',
            backgroundColor: '#2A2D34',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9999,
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'difference'
          }}
        />
      )}

      {/* Loading Screen */}
      <div 
        ref={loadingRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#2A2D34',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          gap: '3rem',
          overflow: 'hidden'
        }}
      >
        
        <div 
          ref={text1Ref}
          className="font-krona"
          style={{
            fontSize: 'clamp(3rem, 12vw, 8rem)',
            fontWeight: '400',
            color: '#E5E4E2',
            textAlign: 'center',
            letterSpacing: '-0.01em',
            lineHeight: '0.9',
            position: 'relative'
          }}
        >
          Hello World
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            left: '0',
            right: '0',
            height: '2px',
            backgroundColor: '#E5E4E2',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            animation: 'expandLine 1.5s ease-out 1s forwards'
          }} />
        </div>
        
        <div 
          ref={text2Ref}
          className="font-manrope"
          style={{
            fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
            fontWeight: '300',
            color: '#E5E4E2',
            textAlign: 'center',
            letterSpacing: '0.05em',
            opacity: 0.9
          }}
        >
          I&apos;m Ivo, and I craft digital experiences
        </div>

      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          zIndex: 1001,
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          color: '#2A2D34',
          cursor: 'pointer',
          display: showMainContent ? 'block' : 'none'
        }}
        className="mobile-menu-toggle"
      >
        {isMenuOpen ? 
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg> :
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
          </svg>
        }
      </button>

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(229, 228, 226, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(42, 45, 52, 0.1)',
        padding: '1.5rem 0',
        transition: 'all 0.3s ease',
        display: showMainContent ? 'block' : 'none'
      }}>
        <nav className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '1.4rem',
            fontWeight: '300',
            color: '#2A2D34',
            letterSpacing: '2px',
            position: 'relative'
          }}>
            IVO
            <span style={{
              position: 'absolute',
              bottom: '-3px',
              left: '0',
              right: '0',
              height: '1px',
              backgroundColor: '#2A2D34',
              transform: 'scaleX(0.7)'
            }} />
          </div>
          
          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{
            display: 'flex',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {[
              { name: 'About', href: '#about' },
              { name: 'Experience', href: '#experience' },
              { name: 'Work', href: '#work' },
              { name: 'Contact', href: '#contact' }
            ].map((item) => (
              <a key={item.name} href={item.href} style={{
                fontSize: '0.95rem',
                color: '#2A2D34',
                textDecoration: 'none',
                fontWeight: '300',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                padding: '0.5rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.opacity = '1';
              }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="mobile-nav" style={{
            position: 'fixed',
            top: '0',
            right: isMenuOpen ? '0' : '-100%',
            width: '100%',
            height: '100vh',
            backgroundColor: '#E5E4E2',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            transition: 'right 0.3s ease',
            zIndex: 999
          }}>
            {[
              { name: 'About', href: '#about' },
              { name: 'Experience', href: '#experience' },
              { name: 'Work', href: '#work' },
              { name: 'Contact', href: '#contact' }
            ].map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMenuOpen(false)}
                style={{
                  fontSize: '2rem',
                  color: '#2A2D34',
                  textDecoration: 'none',
                  fontWeight: '200',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Website */}
      <div 
        ref={mainContentRef}
        style={{
          display: showMainContent ? 'block' : 'none',
          backgroundColor: '#E5E4E2'
        }}
      >
        {/* Hero Section */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '8rem',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div className="container" style={{ margin: '0 auto' }}>
            <div className="font-manrope" style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              color: '#2A2D34',
              fontWeight: '500',
              marginBottom: '1rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>
              Creative Developer & Digital Craftsman
            </div>
            <h1 className="font-krona" style={{ 
              fontSize: 'clamp(2.5rem, 10vw, 7rem)', 
              fontWeight: '400', 
              marginBottom: '2rem',
              color: '#2A2D34',
              letterSpacing: '-0.02em',
              lineHeight: '0.9',
              position: 'relative'
            }}>
              I Build
              <br />
              <span style={{ 
                position: 'relative',
                display: 'inline-block'
              }}>
                Digital Magic
                <span style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '3px',
                  backgroundColor: '#2A2D34',
                  animation: 'expandLine 2s ease-out 0.5s forwards',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left'
                }} />
              </span>
            </h1>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', 
              color: '#2A2D34', 
              lineHeight: '1.6',
              fontWeight: '300',
              marginBottom: '4rem',
              margin: '0 auto 4rem',
              opacity: 0.8
            }}>
              Passionate about creating meaningful digital experiences that blend cutting-edge technology with thoughtful design. Let&apos;s build something extraordinary together.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <a href="#work" className="cta-button primary font-krona" style={{
                padding: '1rem 3rem',
                fontSize: '0.9rem',
                border: '2px solid #2A2D34',
                backgroundColor: '#2A2D34',
                color: '#E5E4E2',
                borderRadius: '0',
                cursor: 'pointer',
                fontWeight: '400',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.42,4 20,7.58 20,12C20,13.85 19.37,15.55 18.31,16.9L8.5,7.09C9.85,6.03 11.15,5.4 12,5.4V4M7.1,8.5L16.91,18.31C15.55,19.37 13.85,20 12,20C7.58,20 4,16.42 4,12C4,11.15 4.63,9.85 5.69,8.5L7.1,8.5Z"/>
                </svg>
                Explore My Work
              </a>
              <a href="#contact" className="cta-button secondary font-krona" style={{
                padding: '1rem 3rem',
                fontSize: '0.9rem',
                border: '2px solid #2A2D34',
                backgroundColor: 'transparent',
                color: '#2A2D34',
                borderRadius: '0',
                cursor: 'pointer',
                fontWeight: '400',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M19,9H14V4H15V7A2,2 0 0,0 17,9H19M12,15C13.1,15 14,15.9 14,17C14,18.1 13.1,19 12,19C10.9,19 10,18.1 10,17C10,15.9 10.9,15 12,15Z"/>
                </svg>
                Say Hello
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={{
          padding: '10rem 0',
          backgroundColor: '#2A2D34',
          color: '#E5E4E2'
        }}>
          <div className="container" style={{
            margin: '0 auto'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '5rem',
              alignItems: 'center'
            }}>
              <div className="fade-in-section">
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: '300',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                  marginBottom: '2rem'
                }}>
                  Who I Am
                </div>
                <h2 style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: '100',
                  color: '#E5E4E2',
                  marginBottom: '3rem',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.1'
                }}>
                  Crafting Digital
                  <br />
                  <span style={{ fontWeight: '300' }}>Experiences</span>
                </h2>
                <p style={{
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  color: '#E5E4E2',
                  fontWeight: '300',
                  marginBottom: '2rem',
                  opacity: 0.9
                }}>
                  I&apos;m a passionate full-stack developer with 5+ years of experience turning complex problems into elegant solutions. My journey spans from startup environments to enterprise-level projects.
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  color: '#E5E4E2',
                  fontWeight: '300',
                  opacity: 0.8,
                  marginBottom: '3rem'
                }}>
                  I believe in the power of clean code, intuitive design, and meaningful user experiences. When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, or mentoring fellow developers.
                </p>
                
                {/* Personal touch */}
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  flexWrap: 'wrap',
                  marginTop: '2rem'
                }}>
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z"/>
                      </svg>
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Coffee Addict</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,3V12.26C11.5,12.09 11,12 10.5,12C8.57,12 7,13.57 7,15.5S8.57,19 10.5,19 14,17.43 14,15.5V7H18V5H12V3Z"/>
                      </svg>
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Music Lover</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                      </svg>
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Always Learning</div>
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem'
              }} className="fade-in-section">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-card" style={{
                    padding: '2.5rem',
                    border: '1px solid rgba(229, 228, 226, 0.2)',
                    backgroundColor: 'rgba(229, 228, 226, 0.05)',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div className="skill-icon" style={{ marginBottom: '1.5rem' }}>
                      {skill.icon}
                    </div>
                    <h3 className="font-krona" style={{
                      fontSize: '1.1rem',
                      fontWeight: '400',
                      marginBottom: '1rem',
                      color: '#E5E4E2',
                      letterSpacing: '0.5px'
                    }}>
                      {skill.name}
                    </h3>
                    <p className="font-manrope" style={{
                      fontSize: '0.95rem',
                      color: '#E5E4E2',
                      opacity: 0.8,
                      fontWeight: '300',
                      lineHeight: '1.6'
                    }}>
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" style={{
          padding: '10rem 0',
          backgroundColor: '#E5E4E2'
        }}>
          <div className="container" style={{ margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: '300',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                opacity: 0.7,
                marginBottom: '2rem',
                color: '#2A2D34'
              }}>
                My Journey
              </div>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '100',
                color: '#2A2D34',
                letterSpacing: '-0.02em'
              }} className="fade-in-section">
                Professional
                <br />
                <span style={{ fontWeight: '300' }}>Experience</span>
              </h2>
            </div>
            
            <div style={{ position: 'relative', margin: '0 auto' }}>
              {/* Timeline line */}
              <div style={{
                position: 'absolute',
                left: '2rem',
                top: '0',
                bottom: '0',
                width: '2px',
                backgroundColor: '#2A2D34',
                opacity: 0.3
              }} />
              
              {[
                { 
                  year: '2024', 
                  title: 'Senior Full Stack Developer', 
                  company: 'TechFlow Solutions', 
                  description: 'Leading a team of 5 developers in building scalable web applications. Implemented microservices architecture resulting in 40% performance improvement.',
                  achievements: ['Reduced load times by 60%', 'Led migration to cloud infrastructure', 'Mentored 3 junior developers']
                },
                { 
                  year: '2022', 
                  title: 'Full Stack Developer', 
                  company: 'Digital Innovators', 
                  description: 'Developed responsive web applications for 20+ clients across various industries. Specialized in React, Node.js, and cloud deployment.',
                  achievements: ['Delivered 25+ successful projects', 'Improved client satisfaction by 35%', 'Implemented automated testing']
                },
                { 
                  year: '2020', 
                  title: 'Frontend Developer', 
                  company: 'StartupHub', 
                  description: 'Built user-friendly interfaces for mobile-first applications. Collaborated closely with UX designers to create seamless user experiences.',
                  achievements: ['Increased user engagement by 45%', 'Reduced bounce rate by 30%', 'Implemented PWA features']
                },
                { 
                  year: '2019', 
                  title: 'Junior Developer', 
                  company: 'CodeCraft Inc.', 
                  description: 'Started my professional journey learning modern frameworks and best practices. Contributed to various projects and gained valuable experience.',
                  achievements: ['Completed React certification', 'Contributed to 10+ projects', 'Learned agile methodologies']
                }
              ].map((item, index) => (
                <div key={index} style={{
                  position: 'relative',
                  paddingLeft: '5rem',
                  paddingBottom: '4rem'
                }} className="timeline-item">
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    left: '1.2rem',
                    top: '1rem',
                    width: '1.6rem',
                    height: '1.6rem',
                    backgroundColor: '#2A2D34',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem'
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                    </svg>
                  </div>
                  
                  <div className="timeline-card" style={{
                    padding: '2rem',
                    backgroundColor: '#2A2D34',
                    color: '#E5E4E2',
                    position: 'relative',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: '300',
                      color: '#E5E4E2',
                      opacity: 0.7,
                      marginBottom: '0.5rem',
                      letterSpacing: '2px'
                    }}>
                      {item.year}
                    </div>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '400',
                      color: '#E5E4E2',
                      marginBottom: '0.5rem'
                    }}>
                      {item.title}
                    </h3>
                    <div style={{
                      fontSize: '1rem',
                      color: '#E5E4E2',
                      opacity: 0.8,
                      marginBottom: '1rem',
                      fontWeight: '300'
                    }}>
                      {item.company}
                    </div>
                    <p style={{
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      color: '#E5E4E2',
                      opacity: 0.9,
                      marginBottom: '1.5rem',
                      fontWeight: '300'
                    }}>
                      {item.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      {item.achievements.map((achievement, i) => (
                        <span key={i} style={{
                          fontSize: '0.8rem',
                          padding: '0.3rem 0.8rem',
                          border: '1px solid rgba(229, 228, 226, 0.3)',
                          borderRadius: '20px',
                          color: '#E5E4E2',
                          opacity: 0.8
                        }}>
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="work" style={{
          padding: '10rem 0',
          backgroundColor: '#2A2D34',
          color: '#E5E4E2'
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: '300',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                opacity: 0.7,
                marginBottom: '2rem'
              }}>
                Featured Projects
              </div>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '100',
                letterSpacing: '-0.02em'
              }} className="fade-in-section">
                Selected
                <br />
                <span style={{ fontWeight: '300' }}>Work</span>
              </h2>
            </div>
            
            <div style={{
              display: 'grid',
              gap: '3rem'
            }}>
              {projects.map((project, index) => (
                <div key={index} 
                  className="project-card fade-in-section"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                    gap: '3rem',
                    alignItems: 'center',
                    padding: '3rem',
                    border: '1px solid rgba(229, 228, 226, 0.1)',
                    backgroundColor: 'rgba(229, 228, 226, 0.03)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        fontSize: '0.8rem',
                        padding: '0.3rem 1rem',
                        border: '1px solid rgba(229, 228, 226, 0.3)',
                        borderRadius: '20px',
                        opacity: 0.7
                      }}>
                        {project.year}
                      </span>
                      <span style={{
                        fontSize: '0.9rem',
                        opacity: 0.8,
                        fontWeight: '300'
                      }}>
                        {project.subtitle}
                      </span>
                    </div>
                    
                    <h3 style={{
                      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                      fontWeight: '300',
                      marginBottom: '1.5rem',
                      lineHeight: '1.2'
                    }}>
                      {project.title}
                    </h3>
                    
                    <p style={{
                      fontSize: '1rem',
                      lineHeight: '1.7',
                      opacity: 0.9,
                      marginBottom: '2rem',
                      fontWeight: '300'
                    }}>
                      {project.description}
                    </p>
                    
                    <div className="font-manrope" style={{
                      padding: '1rem',
                      backgroundColor: 'rgba(229, 228, 226, 0.1)',
                      marginBottom: '2rem',
                      borderLeft: '3px solid #E5E4E2'
                    }}>
                      <strong style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9,21C9,22.1 9.9,23 11,23H13C14.1,23 15,22.1 15,21V20H9V21M12,2C8.14,2 5,5.14 5,9C5,11.38 6.19,13.47 8,14.74V17C8,17.55 8.45,18 9,18H15C15.55,18 16,17.55 16,17V14.74C17.81,13.47 19,11.38 19,9C19,5.14 15.86,2 12,2Z"/>
                        </svg>
                        {project.highlight}
                      </strong>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.8rem',
                      marginBottom: '2rem'
                    }}>
                      {project.tech.map((tech, i) => (
                        <span key={i} style={{
                          fontSize: '0.85rem',
                          padding: '0.4rem 1rem',
                          backgroundColor: 'rgba(229, 228, 226, 0.1)',
                          border: '1px solid rgba(229, 228, 226, 0.2)',
                          fontWeight: '300'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '1rem'
                    }}>
                      <button className="project-btn" style={{
                        padding: '0.8rem 2rem',
                        border: '1px solid #E5E4E2',
                        backgroundColor: 'transparent',
                        color: '#E5E4E2',
                        fontSize: '0.9rem',
                        fontWeight: '300',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        letterSpacing: '0.5px'
                      }}>
                        View Project →
                      </button>
                      <button className="project-btn" style={{
                        padding: '0.8rem 2rem',
                        border: '1px solid rgba(229, 228, 226, 0.3)',
                        backgroundColor: 'transparent',
                        color: 'rgba(229, 228, 226, 0.7)',
                        fontSize: '0.9rem',
                        fontWeight: '300',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        letterSpacing: '0.5px'
                      }}>
                        GitHub ↗
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ 
                    order: index % 2 === 0 ? 2 : 1,
                    height: '300px',
                    backgroundColor: 'rgba(229, 228, 226, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    opacity: 0.3,
                    border: '1px solid rgba(229, 228, 226, 0.1)'
                  }}>
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.3 }}>
                      <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{
          padding: '10rem 0',
          backgroundColor: '#E5E4E2',
          color: '#2A2D34'
        }}>
          <div className="container fade-in-section" style={{ 
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: '300',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              opacity: 0.7,
              marginBottom: '2rem'
            }}>
              Get In Touch
            </div>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: '100',
              marginBottom: '2rem',
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}>
              Let&apos;s Create
              <br />
              <span style={{ fontWeight: '300' }}>Something Amazing</span>
            </h2>
            <p style={{
              fontSize: '1.2rem',
              opacity: 0.8,
              fontWeight: '300',
              marginBottom: '4rem',
              lineHeight: '1.6',
              margin: '0 auto 4rem'
            }}>
              I&apos;m always excited about new projects and collaborations. 
              Whether you have a crazy idea or need help bringing your vision to life, 
              let&apos;s have a conversation and create something amazing together.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem',
              margin: '0 auto 4rem'
            }}>
              <div className="contact-card" style={{
                padding: '2.5rem 2rem',
                backgroundColor: '#2A2D34',
                color: '#E5E4E2',
                textAlign: 'center',
                borderRadius: '16px',
                transition: 'all 0.3s ease'
              }}>
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                  </svg>
                </div>
                <h3 className="font-krona" style={{
                  fontSize: '1rem',
                  fontWeight: '400',
                  marginBottom: '1rem',
                  letterSpacing: '0.5px'
                }}>
                  Email Me
                </h3>
                <p className="font-manrope" style={{
                  fontSize: '1rem',
                  opacity: 0.8,
                  fontWeight: '400',
                  marginBottom: '1rem'
                }}>
                  ivo.developer@email.com
                </p>
                <p className="font-manrope" style={{
                  fontSize: '0.85rem',
                  opacity: 0.6,
                  fontWeight: '300'
                }}>
                  Perfect for project discussions
                </p>
              </div>
              
              <div className="contact-card" style={{
                padding: '2.5rem 2rem',
                backgroundColor: '#2A2D34',
                color: '#E5E4E2',
                textAlign: 'center',
                borderRadius: '16px',
                transition: 'all 0.3s ease'
              }}>
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M8.5,9A1.5,1.5 0 0,1 10,10.5A1.5,1.5 0 0,1 8.5,12A1.5,1.5 0 0,1 7,10.5A1.5,1.5 0 0,1 8.5,9M15.5,9A1.5,1.5 0 0,1 17,10.5A1.5,1.5 0 0,1 15.5,12A1.5,1.5 0 0,1 14,10.5A1.5,1.5 0 0,1 15.5,9M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.07,14.81C9.71,15.58 10.81,16.08 12,16.08C13.19,16.08 14.29,15.58 14.93,14.81L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"/>
                  </svg>
                </div>
                <h3 className="font-krona" style={{
                  fontSize: '1rem',
                  fontWeight: '400',
                  marginBottom: '1rem',
                  letterSpacing: '0.5px'
                }}>
                  Let&apos;s Chat
                </h3>
                <p className="font-manrope" style={{
                  fontSize: '1rem',
                  opacity: 0.8,
                  fontWeight: '400',
                  marginBottom: '1rem'
                }}>
                  LinkedIn / Twitter
                </p>
                <p className="font-manrope" style={{
                  fontSize: '0.85rem',
                  opacity: 0.6,
                  fontWeight: '300'
                }}>
                  Quick questions & networking
                </p>
              </div>
              
              <div className="contact-card" style={{
                padding: '2.5rem 2rem',
                backgroundColor: '#2A2D34',
                color: '#E5E4E2',
                textAlign: 'center',
                borderRadius: '16px',
                transition: 'all 0.3s ease'
              }}>
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                  </svg>
                </div>
                <h3 className="font-krona" style={{
                  fontSize: '1rem',
                  fontWeight: '400',
                  marginBottom: '1rem',
                  letterSpacing: '0.5px'
                }}>
                  Quick Response
                </h3>
                <p style={{
                  fontSize: '1rem',
                  opacity: 0.8,
                  fontWeight: '300',
                  marginBottom: '1rem'
                }}>
                  Usually within 24h
                </p>
                <p style={{
                  fontSize: '0.85rem',
                  opacity: 0.6,
                  fontWeight: '300'
                }}>
                  I love talking about code!
                </p>
              </div>
            </div>

            <button style={{
              padding: '1.2rem 3rem',
              fontSize: '1rem',
              border: '2px solid #2A2D34',
              backgroundColor: '#2A2D34',
              color: '#E5E4E2',
              borderRadius: '0',
              cursor: 'pointer',
              fontWeight: '400',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.81,14.12L5.64,11.29L8.17,10.79C11.39,6.41 17.55,4.22 19.78,4.22C19.78,6.45 17.59,12.61 13.21,15.83L12.71,18.36L9.88,21.19C9.29,21.78 8.32,21.85 7.65,21.33L2.81,17.05C2.26,16.65 2.26,15.74 2.81,15.19L5.5,12.5L2.81,14.12M16.5,9.5A1.5,1.5 0 0,0 18,8A1.5,1.5 0 0,0 16.5,6.5A1.5,1.5 0 0,0 15,8A1.5,1.5 0 0,0 16.5,9.5Z"/>
              </svg>
              Start A Conversation
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="container" style={{
          padding: '3rem 0',
          backgroundColor: '#2A2D34',
          color: '#E5E4E2',
          borderTop: '1px solid rgba(229, 228, 226, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem'
          }}>
            <div>
              <p style={{
                fontSize: '0.9rem',
                opacity: 0.7,
                fontWeight: '300',
                margin: 0
              }}>
                © 2025 Ivo Developer. Crafted with passion and dedication.
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '2rem'
            }}>
              {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                <a key={social} href="#" style={{
                  fontSize: '0.9rem',
                  color: '#E5E4E2',
                  textDecoration: 'none',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease'
                }}>
                  {social}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
