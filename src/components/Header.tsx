import React, { useState } from 'react';
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

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Ivo<span>.</span>
        <span className={styles.slogan}>Portfólio &bull; Full Stack & Design</span>
      </div>
      <nav className={styles.nav}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className={styles.hamburger}
        aria-label="Abrir menu"
        aria-expanded={menuOpen}
        onClick={handleToggle}
      >
        <span className={menuOpen ? styles.open : ''} />
        <span className={menuOpen ? styles.open : ''} />
        <span className={menuOpen ? styles.open : ''} />
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.mobileMenu}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={handleLinkClick}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
      {menuOpen && <div className={styles.overlay} onClick={handleToggle} />}
    </header>
  );
};

export default Header; 