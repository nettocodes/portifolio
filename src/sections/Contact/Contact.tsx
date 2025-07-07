import React, { useState } from 'react';
import styles from './Contact.module.scss';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const socials = [
  { href: 'https://github.com/SEUUSER', label: 'GitHub', icon: <FaGithub /> },
  { href: 'https://linkedin.com/in/SEUUSER', label: 'LinkedIn', icon: <FaLinkedin /> },
  { href: 'https://wa.me/SEUNUMERO', label: 'WhatsApp', icon: <FaWhatsapp /> },
];

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus(Math.random() > 0.15 ? 'success' : 'error');
      setTimeout(() => setStatus('idle'), 2500);
    }, 1200);
  };

  return (
    <section className={styles.contact} aria-label="Seção de contato" role="region">
      <div className="container">
        <div className={styles.contactRow}>
          <div className={styles.infoCol}>
            <h2 className={styles.sectionTitle}>Fale comigo</h2>
            <p className={styles.bioText}>
              Tem uma ideia, projeto ou oportunidade? Preencha o formulário ou me chame nas redes!
            </p>
            <div className={styles.contactInfoLine}>
              <span><FaMapMarkerAlt /> Timbó, SC</span>
              <span><FaPhoneAlt /> (47) 99140-3388</span>
              <span><FaEnvelope /> braatzivo@hotmail.com</span>
            </div>
            <div className={styles.socialsList}>
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} title={social.label} className={styles.socialIcon}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
            <div className={styles.field}>
              <label htmlFor="name">Nome</label>
              <input id="name" type="text" placeholder="Seu nome" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="seu@email.com" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="message">Mensagem</label>
              <textarea id="message" placeholder="Como posso ajudar?" required />
            </div>
            <button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
            </button>
            {status === 'success' && <div className={styles.feedback + ' ' + styles.success}>Mensagem enviada! 🚀</div>}
            {status === 'error' && <div className={styles.feedback + ' ' + styles.error}>Erro ao enviar. Tente novamente.</div>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 