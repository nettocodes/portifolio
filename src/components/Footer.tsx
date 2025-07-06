"use client";

import { motion } from "framer-motion";
import { 
  Github, Linkedin, Twitter, Mail, Phone, MapPin, 
  ExternalLink, Heart, ArrowUp, Download, FileText,
  Globe, Code, Palette, Database, Zap
} from "lucide-react";

const quickLinks = [
  { name: "Início", href: "#hero" },
  { name: "Sobre", href: "#sobre" },
  { name: "Projetos", href: "#projetos" },
  { name: "Skills", href: "#skills" },
  { name: "Contato", href: "#contato" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/seu-usuario", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/seu-perfil", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/seu-usuario", icon: Twitter },
  { name: "Email", href: "mailto:seu@email.com", icon: Mail },
];

const services = [
  { name: "Desenvolvimento Web", icon: Globe },
  { name: "Aplicações Mobile", icon: Code },
  { name: "UI/UX Design", icon: Palette },
  { name: "Backend & APIs", icon: Database },
  { name: "Animações Web", icon: Zap },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--card-bg)',
      borderTop: '1px solid var(--card-border)',
      padding: '4rem 0 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
      }} />
      
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
            }}>
              SeuNome.dev
            </div>
            <p style={{
              color: 'var(--foreground)',
              opacity: 0.8,
              lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}>
              Desenvolvedor full-stack apaixonado por criar experiências digitais inovadoras e soluções tecnológicas que fazem a diferença.
            </p>
            
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="var(--primary)" />
                <span style={{ color: 'var(--foreground)', fontSize: '0.9rem' }}>
                  seu@email.com
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="var(--primary)" />
                <span style={{ color: 'var(--foreground)', fontSize: '0.9rem' }}>
                  +55 (11) 99999-9999
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--primary)" />
                <span style={{ color: 'var(--foreground)', fontSize: '0.9rem' }}>
                  São Paulo, SP - Brasil
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 style={{
              color: 'var(--foreground)',
              fontSize: '1.2rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}>
              Navegação
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  style={{
                    color: 'var(--foreground)',
                    opacity: 0.8,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                  }}
                  whileHover={{ 
                    color: 'var(--primary)',
                    x: 5,
                    opacity: 1
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 style={{
              color: 'var(--foreground)',
              fontSize: '1.2rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}>
              Serviços
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <IconComponent size={16} color="var(--primary)" />
                    <span style={{ color: 'var(--foreground)', opacity: 0.8, fontSize: '0.9rem' }}>
                      {service.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Social & Downloads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 style={{
              color: 'var(--foreground)',
              fontSize: '1.2rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}>
              Conecte-se
            </h3>
            
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--background)',
                      color: 'var(--primary)',
                      textDecoration: 'none',
                      border: '1px solid var(--card-border)',
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      background: 'var(--primary)',
                      color: 'var(--background)',
                      boxShadow: '0 5px 15px rgba(0, 207, 255, 0.3)'
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconComponent size={18} />
                  </motion.a>
                );
              })}
            </div>

            {/* Download Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <motion.button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
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
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                Download CV
              </motion.button>
              
              <motion.button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--secondary)',
                  background: 'transparent',
                  color: 'var(--secondary)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'none',
                }}
                whileHover={{ 
                  background: 'var(--secondary)',
                  color: 'var(--background)',
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText size={16} />
                Portfolio PDF
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          style={{
            borderTop: '1px solid var(--card-border)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Copyright */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--foreground)', opacity: 0.8, fontSize: '0.9rem' }}>
              © {currentYear} SeuNome.dev. Todos os direitos reservados.
            </span>
            <Heart size={14} color="var(--secondary)" style={{ animation: 'pulse 2s infinite' }} />
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid var(--card-border)',
              background: 'var(--background)',
              color: 'var(--primary)',
              cursor: 'none',
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 5px 15px rgba(0, 207, 255, 0.2)'
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={18} />
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)',
      }} />
    </footer>
  );
} 