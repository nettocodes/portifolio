import React from 'react';
import styles from './SectionWrapper.module.scss';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children, className }) => (
  <section id={id} className={`${styles.sectionWrapper} ${className || ''}`}>
    {children}
  </section>
);

export default SectionWrapper; 