import React, { memo, useRef, useEffect, useState } from 'react';
import styles from './ContactFloating.module.scss';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

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

const ContactButton = memo(({ contact }: { contact: typeof contactMethods[0] }) => (
  <a
    href={contact.href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${styles.contactButton} ${styles[`contact${contact.label}`]}`}
    aria-label={`Entrar em contato via ${contact.label}`}
  >
    <div className={styles.buttonIcon}>{contact.icon}</div>
    <span className={styles.buttonLabel}>{contact.label}</span>
  </a>
));

const ContactFloating: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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
    <div className={styles.contactFloating} ref={contactRef}>
      <div className={styles.contactContent}>
        <div className={styles.contactInner}>
          <div className={styles.contactGrid}>
            {contactMethods.map((contact, index) => (
              <ContactButton key={index} contact={contact} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFloating;
