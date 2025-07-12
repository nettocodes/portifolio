import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#about' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contato', href: '#contact' },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          Ivo<span>.</span>
          <span className={styles.slogan}>Portfólio &bull; Full Stack & Design</span>
        </motion.div>
        
        <nav className={styles.nav}>
          <ul>
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.a 
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        <motion.button
          className={styles.hamburger}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={handleToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className={menuOpen ? styles.open : ''} />
          <span className={menuOpen ? styles.open : ''} />
          <span className={menuOpen ? styles.open : ''} />
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleToggle}
            />
            <motion.nav
              className={styles.mobileMenu}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30,
                opacity: { duration: 0.2 }
              }}
            >
              <motion.div className={styles.menuBackground}>
                <div className={styles.codeLines}>
                  <motion.div 
                    className={styles.codeLine}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className={styles.codeKeyword}>const</span> <span className={styles.codeVar}>portfolio</span> = <span className={styles.codeString}>{"{"}</span>
                  </motion.div>
                  <motion.div 
                    className={styles.codeLine}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    &nbsp;&nbsp;<span className={styles.codeProperty}>name</span>: <span className={styles.codeString}>"Ivo Braatz"</span>,
                  </motion.div>
                  <motion.div 
                    className={styles.codeLine}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    &nbsp;&nbsp;<span className={styles.codeProperty}>role</span>: <span className={styles.codeString}>"Full Stack Developer"</span>,
                  </motion.div>
                  <motion.div 
                    className={styles.codeLine}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    &nbsp;&nbsp;<span className={styles.codeProperty}>skills</span>: [<span className={styles.codeString}>"React"</span>, <span className={styles.codeString}>"TypeScript"</span>],
                  </motion.div>
                  <motion.div 
                    className={styles.codeLine}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className={styles.codeString}>{"}"}</span>;
                  </motion.div>
                </div>
                
                <div className={styles.floatingElements}>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={styles.floatingElement}
                      initial={{ opacity: 0, scale: 0, rotate: 0 }}
                      animate={{ 
                        opacity: [0.2, 0.5, 0.2], 
                        scale: [0.8, 1.2, 0.8],
                        rotate: [0, 360],
                        y: [-10, 10, -10]
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      style={{
                        top: `${20 + i * 10}%`,
                        left: `${10 + (i % 3) * 15}%`
                      }}
                    >
                      {i % 4 === 0 && '</>'}
                      {i % 4 === 1 && '{}'}
                      {i % 4 === 2 && '()'}
                      {i % 4 === 3 && '[]'}
                    </motion.div>
                  ))}
                </div>
                
                <div className={styles.binaryRain}>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={styles.binaryColumn}
                      initial={{ opacity: 0, y: -100 }}
                      animate={{ 
                        opacity: [0, 0.6, 0],
                        y: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 4 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "linear"
                      }}
                      style={{ left: `${10 + i * 10}%` }}
                    >
                      {['1', '0', '1', '0', '1', '0', '1'].map((_, idx) => (
                        <span key={idx} className={styles.binaryDigit}>
                          {Math.random() > 0.5 ? '1' : '0'}
                        </span>
                      ))}
                    </motion.div>
                  ))}
                </div>
                
                <div className={styles.circuitLines}>
                  <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 400 600"
                    className={styles.circuitSvg}
                  >
                    <motion.path
                      d="M50 100 Q200 50 350 100 T350 200 Q200 250 50 200 T50 300 Q200 350 350 300 T350 400"
                      stroke="rgba(79, 140, 255, 0.3)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.path
                      d="M100 50 L300 50 L300 150 L100 150 Z"
                      stroke="rgba(79, 140, 255, 0.2)"
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </motion.svg>
                </div>
                
                <div className={styles.particles}>
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={styles.particle}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50]
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`
                      }}
                    />
                  ))}
                </div>
              </motion.div>
              
              <ul>
                {navLinks.map((link, index) => (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <motion.a 
                      href={link.href} 
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      whileHover={{ scale: 1.05, x: -10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 