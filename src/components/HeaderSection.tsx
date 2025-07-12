import React from 'react';
import { motion, easeOut } from 'framer-motion';
import styles from './HeaderSection.module.scss';

interface HeaderSectionProps {
  title: string;
  subtitle?: string;
  className?: string;
  variant?: 'dark' | 'light';
}

const headerVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
};

const HeaderSection: React.FC<HeaderSectionProps> = ({ 
  title, 
  subtitle, 
  className = '',
  variant = 'dark'
}) => {
  return (
    <motion.div 
      className={`${styles.headerSection} ${variant === 'light' ? styles.lightTheme : ''} ${className}`}
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={styles.headerRow}>
        <div className={styles.headerContent}>
          <motion.h2 
            className={styles.sectionTitle}
            variants={headerVariants}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p 
              className={styles.sectionSubtitle}
              variants={headerVariants}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HeaderSection;
