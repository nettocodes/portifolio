import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, icon, children }) => (
  <div className={styles.card}>
    {icon && <div className={styles.icon}>{icon}</div>}
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.description}>{description}</p>
    {children}
  </div>
);

export default Card; 