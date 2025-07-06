"use client";

import { motion } from "framer-motion";
import HoverScale from "./HoverScale";

interface AnimatedButtonProps {
  as?: "button" | "a";
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
}

export default function AnimatedButton({ 
  as = "button", 
  href, 
  children, 
  className = "", 
  type, 
  onClick,
  variant = "primary"
}: AnimatedButtonProps) {
  
  const baseStyles = {
    padding: '0.875rem 2rem',
    borderRadius: 12,
    fontWeight: 600,
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
      color: '#fff',
      boxShadow: '0 4px 20px rgba(0, 207, 255, 0.3), 0 2px 8px rgba(124, 58, 237, 0.2)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--foreground)',
      border: '2px solid var(--primary)',
      boxShadow: '0 4px 20px rgba(0, 207, 255, 0.1)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--foreground)',
      boxShadow: 'none',
    }
  };

  const buttonStyle = { ...baseStyles, ...variantStyles[variant] };

  if (as === "a" && href) {
    return (
      <HoverScale scale={1.05}>
        <motion.a
          href={href}
          className={className}
          style={buttonStyle}
          onClick={onClick}
          whileHover={{
            boxShadow: variant === "primary" 
              ? '0 8px 30px rgba(0, 207, 255, 0.4), 0 4px 12px rgba(124, 58, 237, 0.3)'
              : variant === "secondary"
              ? '0 8px 30px rgba(0, 207, 255, 0.2)'
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
            y: -2,
          }}
          whileTap={{ scale: 0.98, y: 0 }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
          {variant === "primary" && (
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                borderRadius: 12,
              }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.a>
      </HoverScale>
    );
  }

  return (
    <HoverScale scale={1.05}>
      <motion.button
        className={className}
        type={type}
        onClick={onClick}
        style={buttonStyle}
        whileHover={{
          boxShadow: variant === "primary" 
            ? '0 8px 30px rgba(0, 207, 255, 0.4), 0 4px 12px rgba(124, 58, 237, 0.3)'
            : variant === "secondary"
            ? '0 8px 30px rgba(0, 207, 255, 0.2)'
            : '0 4px 12px rgba(0, 0, 0, 0.1)',
          y: -2,
        }}
        whileTap={{ scale: 0.98, y: 0 }}
      >
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
        {variant === "primary" && (
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              borderRadius: 12,
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.button>
    </HoverScale>
  );
} 