import React from 'react';
import styles from './AnimatedButton.module.scss';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, ...props }) => (
  <button className={styles.animatedButton} {...props}>
    {children}
  </button>
);

export default AnimatedButton; 