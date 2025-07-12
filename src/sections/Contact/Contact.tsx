import React, { useState, useEffect } from 'react';
import styles from './Contact.module.scss';
import HeaderSection from '../../components/HeaderSection';
import AnimatedGridOptimized from '../../components/AnimatedGridOptimized';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaCheck, FaTimes } from 'react-icons/fa';
import ivoImg from '../../assets/ivo.jpg';
import emailjs from '@emailjs/browser';
import { emailConfig, isEmailJSConfigured } from '../../config/emailjs';

const socials = [
  { href: 'https://github.com/IvoBraatz', label: 'GitHub', icon: <FaGithub /> },
  { href: 'https://www.linkedin.com/in/ivobraatz/', label: 'LinkedIn', icon: <FaLinkedin /> },
  { href: 'https://wa.me/5547991403388', label: 'WhatsApp', icon: <FaWhatsapp /> },
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

  // Inicializar EmailJS quando o componente montar
  useEffect(() => {
    const initEmailJS = async () => {
      try {
        if (isEmailJSConfigured()) {
          await emailjs.init(emailConfig.publicKey);
        }
      } catch (error) {
        console.error('Erro ao inicializar EmailJS:', error);
      }
    };

    initEmailJS();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => /.+@.+\..+/.test(email);
  const validatePhone = (phone: string) => {
    // Se o campo estiver vazio, é válido (campo opcional)
    if (!phone || phone.trim() === '') return true;
    
    // Remover espaços e caracteres especiais para validação
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Aceitar números com 10 ou 11 dígitos (com ou sem DDD)
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // Verificar se o EmailJS está configurado
      if (!isEmailJSConfigured()) {
        // Fallback para simulação se não estiver configurado
        setTimeout(() => {
          setStatus(Math.random() > 0.15 ? 'success' : 'error');
          setTimeout(() => setStatus('idle'), 3000);
        }, 1200);
        return;
      }

      // Envio do email usando EmailJS
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        company: form.company || 'Não informado',
        phone: form.phone || 'Não informado',
        message: form.message,
        to_name: 'Ivo Braatz',
        to_email: 'braatzivo@hotmail.com',
        reply_to: form.email
      };

      // Tentar envio com timeout para evitar travamentos
      const sendPromise = emailjs.send(
        'service_zgajelg',
        'template_4nbqqwn',
        templateParams,
        'xffB9Bnv66-8D7RyW'
      );

      // Timeout de 30 segundos
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout: O envio demorou mais de 30 segundos')), 30000);
      });

      const result = await Promise.race([sendPromise, timeoutPromise]) as any;
      
      // Verificar se o resultado é válido
      if (result && (result.status === 200 || result.text === 'OK' || result.status === undefined)) {
        setStatus('success');
        
        // Limpar o formulário após envio bem-sucedido
        setForm({
          name: '',
          email: '',
          subject: '',
          company: '',
          phone: '',
          message: '',
        });
      } else {
        throw new Error(`Resposta inesperada: ${JSON.stringify(result)}`);
      }
    } catch (error: any) {
      console.error('Erro ao enviar email:', error);
      setStatus('error');
    }

    // Limpar status após 3 segundos
    setTimeout(() => setStatus('idle'), 3000);
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
              <AnimatedGridOptimized />
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
                      placeholder="(11) 99999-9999" 
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
                
                <button 
                  type="submit" 
                  disabled={status === 'sending'} 
                  className={`${styles.submitButton} ${styles[status]}`}
                >
                  <div className={styles.buttonContent}>
                    {status === 'idle' && (
                      <>
                        <FaPaperPlane className={styles.buttonIcon} />
                        <span>Enviar mensagem</span>
                      </>
                    )}
                    {status === 'sending' && (
                      <>
                        <FaPaperPlane className={`${styles.buttonIcon} ${styles.sending}`} />
                        <span>Enviando...</span>
                      </>
                    )}
                    {status === 'success' && (
                      <>
                        <FaCheck className={`${styles.buttonIcon} ${styles.success}`} />
                        <span>Enviado!</span>
                      </>
                    )}
                    {status === 'error' && (
                      <>
                        <FaTimes className={`${styles.buttonIcon} ${styles.error}`} />
                        <span>Erro! Tente novamente</span>
                      </>
                    )}
                  </div>
                </button>
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