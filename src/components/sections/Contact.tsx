'use client'

import { useState } from 'react'
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/constants/data'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollReveal from '@/components/ui/ScrollReveal'
import styles from './Contact.module.css'

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    alert(t('contact.form.submit'))
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">{t('contact.title')}</h2>
            <p className="section-subtitle">
              {t('contact.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.contactContent}>
          <ScrollReveal delay={200}>
            <div className={styles.contactInfo}>
              <h3 className={styles.subtitle}>{t('contact.info.title')}</h3>
              <p className={styles.text}>
                {t('contact.info.description')}
              </p>
              
              <div className={styles.contactItems}>
                {SOCIAL_LINKS.filter(link => link.icon !== 'email').map(link => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                    <span className={styles.label}>{link.name}</span>
                    <span className={styles.value}>{link.url.replace('https://', '')}</span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">
                    {t('contact.form.name')}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder={t('contact.form.placeholder.name')}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">
                    {t('contact.form.email')}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder={t('contact.form.placeholder.email')}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">
                  {t('contact.form.message')}
                  <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder={t('contact.form.placeholder.message')}
                  required
                />
                <span className={styles.charCount}>{formData.message.length} {t('contact.form.chars')}</span>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <span>{t('contact.form.submit')}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
