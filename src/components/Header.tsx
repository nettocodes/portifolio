"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Download, Mail } from "lucide-react";

const navItems = [
  { name: "Início", href: "#hero" },
  { name: "Sobre", href: "#sobre" },
  { name: "Projetos", href: "#projetos" },
  { name: "Skills", href: "#skills" },
  { name: "Contato", href: "#contato" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', !isDarkMode ? 'dark' : 'light');
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled 
          ? 'rgba(10, 10, 10, 0.95)' 
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled 
          ? '1px solid rgba(255, 255, 255, 0.1)' 
          : 'none',
        transition: 'all 0.3s ease',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Logo */}
        <motion.div
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SeuNome.dev
        </motion.div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === item.href.replace('#', '') 
                    ? 'var(--primary)' 
                    : 'var(--foreground)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'none',
                  position: 'relative',
                  padding: '0.5rem 0',
                }}
                whileHover={{ 
                  color: 'var(--primary)',
                  y: -2 
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                      borderRadius: '1px',
                    }}
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid var(--card-border)',
                background: 'var(--card-bg)',
                color: 'var(--foreground)',
                cursor: 'none',
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 5px 15px rgba(0, 207, 255, 0.2)'
              }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            {/* Download CV */}
            <motion.button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                border: '1px solid var(--primary)',
                background: 'transparent',
                color: 'var(--primary)',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: 'none',
              }}
              whileHover={{ 
                background: 'var(--primary)',
                color: 'var(--background)',
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              CV
            </motion.button>

            {/* Contact Button */}
            <motion.button
              onClick={() => scrollToSection('#contato')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                border: 'none',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: 'var(--background)',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: 'none',
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(0, 207, 255, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={16} />
              Contato
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            color: 'var(--foreground)',
            cursor: 'none',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(10, 10, 10, 0.98)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '1rem 0',
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ padding: '0 2rem' }}>
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '1rem 0',
                    background: 'none',
                    border: 'none',
                    color: activeSection === item.href.replace('#', '') 
                      ? 'var(--primary)' 
                      : 'var(--foreground)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    cursor: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  whileHover={{ 
                    color: 'var(--primary)',
                    x: 10 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
              
              {/* Mobile Action Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <motion.button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '25px',
                    border: '1px solid var(--primary)',
                    background: 'transparent',
                    color: 'var(--primary)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'none',
                    flex: 1,
                  }}
                  whileHover={{ 
                    background: 'var(--primary)',
                    color: 'var(--background)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={16} />
                  Download CV
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          nav {
            display: none !important;
          }
          button[style*="display: none"] {
            display: flex !important;
          }
        }
      `}</style>
    </motion.header>
  );
} 