import React from 'react';
import styles from './Footer.module.scss';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerCol}>
          <div className={styles.brand}>
            <span className={styles.logo}>Ivo Netto</span>
            <span className={styles.slogan}>Desenvolvedor Full Stack</span>
          </div>
          <div className={styles.contactQuick}>
            <span><FaEnvelope /> braatzivo@hotmail.com</span>
            <span><FaWhatsapp /> (47) 99140-3388</span>
          </div>
        </div>
        <div className={styles.footerCol}>
          <div className={styles.socials}>
            <a href="https://github.com/IvoBraatz" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/ivo-braatz" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="mailto:braatzivo@hotmail.com" aria-label="Email" title="Email">
              <FaEnvelope />
            </a>
            <a href="https://wa.me/5547991403388" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.copy}>
        &copy; {new Date().getFullYear()} Ivo Netto. Todos os direitos reservados.
        <span className={styles.credits}>Desenvolvido com React, Vite e muito café ☕</span>
      </div>
    </footer>
  );
};

export default Footer; 