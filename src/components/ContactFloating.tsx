import React, { memo, useRef, useEffect, useState } from 'react';
import styles from './ContactFloating.module.scss';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import networkIcon from '../assets/network.png';
import windows7Background from '../assets/Windows_7.jpg';

const contactMethods = [
  {
    icon: <FaWhatsapp />,
    label: 'WhatsApp',
    href: 'https://wa.me/5547991403388',
    color: '#25D366',
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ivo-braatz',
    color: '#0077B5',
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    href: 'https://github.com/IvoBraatz',
    color: '#333',
  },
  {
    icon: <FaEnvelope />,
    label: 'Email',
    href: 'mailto:braatzivo@hotmail.com',
    color: '#EA4335',
  },
];

const TaskbarButton = memo(({ contact }: { contact: typeof contactMethods[0] }) => (
  <a
    href={contact.href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${styles.taskbarButton} ${styles[`contact${contact.label}`]}`}
    aria-label={`Entrar em contato via ${contact.label}`}
  >
    <div className={styles.taskbarIcon}>{contact.icon}</div>
    <span className={styles.taskbarLabel}>{contact.label}</span>
  </a>
));

const ContactFloating: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [tooltipTimeoutId, setTooltipTimeoutId] = useState<number | null>(null);

  // Atualizar o relógio a cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(timer);
  }, []);

  // Função para lidar com cliques nos system icons
  const handleSystemIconClick = (iconType: string) => {
    if (tooltipTimeoutId) {
      clearTimeout(tooltipTimeoutId);
    }
    
    setActiveTooltip(iconType);
    
    // Auto-hide tooltip after 8 seconds
    const timeoutId = setTimeout(() => {
      setActiveTooltip(null);
    }, 8000);
    
    setTooltipTimeoutId(timeoutId);
  };

  const handleTooltipClose = () => {
    if (tooltipTimeoutId) {
      clearTimeout(tooltipTimeoutId);
      setTooltipTimeoutId(null);
    }
    setActiveTooltip(null);
  };

  // Tooltip messages for system icons
  const tooltipMessages = {
    network: "Conexão estável! Estou sempre conectado para te ajudar! 📶",
    clock: "O tempo voa quando você está programando! ⏰"
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeoutId) {
        clearTimeout(tooltipTimeoutId);
      }
    };
  }, [tooltipTimeoutId]);

  // Hook para detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const currentContact = contactRef.current;
    
    if (currentContact) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.contactVisible);
            } else {
              entry.target.classList.remove(styles.contactVisible);
            }
          });
        },
        {
          threshold: isMobile ? 0.05 : 0.1,
          rootMargin: isMobile ? '0px 0px -10% 0px' : '0px 0px -15% 0px'
        }
      );

      observer.observe(currentContact);

      return () => {
        if (currentContact) {
          observer.unobserve(currentContact);
        }
      };
    }
  }, [isMobile]);

  return (
    <div 
      className={styles.contactFloating} 
      ref={contactRef}
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 25%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.2) 75%, rgba(0, 0, 0, 0.3) 100%), url(${windows7Background})`,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat'
      }}
    >
      <div className={styles.taskbar}>
        {/* Botão Start */}
        <div 
          className={styles.startButton}
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <div className={styles.startIcon}>
            <FaEnvelope />
          </div>
          <span className={styles.startText}>Contatos</span>
        </div>
        
        {/* Separador */}
        <div className={styles.taskbarSeparator}></div>
        
        {/* Botões da Taskbar */}
        <div className={styles.taskbarButtons}>
          {contactMethods.map((contact, index) => (
            <TaskbarButton key={index} contact={contact} />
          ))}
        </div>
        
        {/* Área de notificação */}
        <div className={styles.systemTray}>
          <div className={styles.systemIcons}>
            <div 
              className={styles.systemIcon}
              onClick={() => handleSystemIconClick('network')}
            >
              <img src={networkIcon} alt="Network" />
            </div>
          </div>
          <div 
            className={styles.systemClock}
            onClick={() => handleSystemIconClick('clock')}
          >
            <div className={styles.clockTime}>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className={styles.clockDate}>
              {currentTime.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </div>
          </div>
          
          {/* Clippy Tooltip para System Icons */}
          {activeTooltip && (
            <div 
              className={styles.systemClippyTooltip} 
              data-tooltip={activeTooltip}
              role="tooltip"
            >
              <div className={styles.systemClippyAvatar}>
                <div className={styles.systemClippyBody}>
                  📎
                </div>
                <div className={styles.systemClippyEyes}>
                  <div className={styles.systemClippyEye}></div>
                  <div className={styles.systemClippyEye}></div>
                </div>
              </div>
              <div className={styles.systemClippyBubble}>
                <div className={styles.systemClippyMessage}>
                  {tooltipMessages[activeTooltip as keyof typeof tooltipMessages]}
                </div>
                <button 
                  className={styles.systemClippyCloseButton}
                  onClick={handleTooltipClose}
                  aria-label="Fechar tooltip"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactFloating;
