import React, { useState } from 'react';
import styles from './Contact.module.scss';
import HeaderSection from '../../components/HeaderSection';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';
import ivoImg from '../../assets/ivo.jpg';

const socials = [
  { href: 'https://github.com/SEUUSER', label: 'GitHub', icon: <FaGithub /> },
  { href: 'https://linkedin.com/in/SEUUSER', label: 'LinkedIn', icon: <FaLinkedin /> },
  { href: 'https://wa.me/SEUNUMERO', label: 'WhatsApp', icon: <FaWhatsapp /> },
];

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    company: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => /.+@.+\..+/.test(email);
  const validatePhone = (phone: string) => phone === '' || /^(\(\d{2}\)\s?)?\d{4,5}-\d{4}$/.test(phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      setStatus('error');
      return;
    }
    if (!validatePhone(form.phone)) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    setTimeout(() => {
      setStatus(Math.random() > 0.15 ? 'success' : 'error');
      setTimeout(() => setStatus('idle'), 2500);
    }, 1200);
  };

  return (
    <section className={styles.contact} aria-label="Seção de contato" role="region">
      <div className={styles.background}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <HeaderSection 
            title="Vamos conversar?"
            subtitle="Entre em contato para projetos, parcerias ou oportunidades profissionais. Estou sempre aberto a novas ideias e colaborações."
            variant="light"
          />
          
          <div className={styles.formContainer}>
            <div className={styles.imageSection}>
              <div className={styles.imageWrapper}>
                <img 
                  src={ivoImg} 
                  alt="Ivo Braatz" 
                  className={styles.profileImage}
                />
              </div>
              <div className={styles.imageText}>
                <h3>Pronto para colaborar!</h3>
                <p>
                  Vamos transformar suas ideias em realidade. Entre em contato 
                  e vamos discutir como posso contribuir para o seu projeto.
                </p>
              </div>
            </div>
            
            <div className={styles.formSection}>
              <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label htmlFor="name">Nome</label>
                    <input 
                      id="name" 
                      name="name" 
                      type="text" 
                      placeholder="Seu nome" 
                      required 
                      value={form.name} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">Email</label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="seu@email.com" 
                      required 
                      value={form.email} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>
                
                <div className={styles.field}>
                  <label htmlFor="subject">Assunto</label>
                  <input 
                    id="subject" 
                    name="subject" 
                    type="text" 
                    placeholder="Sobre o que gostaria de falar?" 
                    required 
                    value={form.subject} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label htmlFor="company">Empresa <span className={styles.optional}>(opcional)</span></label>
                    <input 
                      id="company" 
                      name="company" 
                      type="text" 
                      placeholder="Nome da empresa" 
                      value={form.company} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="phone">Telefone <span className={styles.optional}>(opcional)</span></label>
                    <input 
                      id="phone" 
                      name="phone" 
                      type="text" 
                      placeholder="(xx) xxxxx-xxxx" 
                      value={form.phone} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>
                
                <div className={styles.field}>
                  <label htmlFor="message">Mensagem</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    placeholder="Como posso ajudar você?" 
                    required 
                    value={form.message} 
                    onChange={handleChange} 
                  />
                </div>
                
                <button type="submit" disabled={status === 'sending'} className={styles.submitButton}>
                  <FaPaperPlane className={styles.buttonIcon} />
                  {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
                </button>
                
                {status === 'success' && (
                  <div className={styles.feedback + ' ' + styles.success}>
                    Mensagem enviada com sucesso! 🚀
                  </div>
                )}
                {status === 'error' && (
                  <div className={styles.feedback + ' ' + styles.error}>
                    Erro ao enviar mensagem. Verifique os dados e tente novamente.
                  </div>
                )}
              </form>
            </div>
          </div>
          
          <div className={styles.contactInfo}>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <span>Timbó, SC</span>
              </div>
              <div className={styles.contactItem}>
                <FaPhoneAlt className={styles.icon} />
                <span>(47) 99140-3388</span>
              </div>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.icon} />
                <span>braatzivo@hotmail.com</span>
              </div>
            </div>
            
            <div className={styles.socialLinks}>
              {socials.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label} 
                  title={social.label} 
                  className={styles.socialLink}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;