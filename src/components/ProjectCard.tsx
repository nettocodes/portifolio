"use client";

import FadeUp from "./FadeUp";
import HoverScale from "./HoverScale";
import { Laptop, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  type: string;
  link?: string;
  github?: string;
  technologies?: string[];
}

export default function ProjectCard({ 
  title, 
  description, 
  type, 
  link, 
  github,
  technologies = []
}: ProjectCardProps) {
  return (
    <FadeUp stagger={0}>
      <HoverScale scale={1.02}>
        <motion.div
          style={{
            background: 'linear-gradient(135deg, var(--card-bg) 0%, rgba(24, 24, 27, 0.8) 100%)',
            borderRadius: 20,
            border: '1px solid var(--card-border)',
            padding: '2rem',
            minWidth: 280,
            maxWidth: 340,
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
          }}
          whileHover={{
            boxShadow: '0 20px 40px rgba(0, 207, 255, 0.1), 0 8px 16px rgba(124, 58, 237, 0.1)',
            borderColor: 'var(--primary)',
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Overlay de gradiente */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0, 207, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
              opacity: 0,
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Ícone do projeto */}
          <div style={{ marginBottom: 16, position: 'relative', zIndex: 1 }}>
            <Laptop size={32} color="var(--primary)" />
          </div>

          {/* Tipo do projeto */}
          <motion.span 
            style={{ 
              fontSize: 12, 
              color: 'var(--secondary)', 
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              position: 'relative',
              zIndex: 1,
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {type}
          </motion.span>

          {/* Título */}
          <motion.h2 
            style={{ 
              fontSize: '1.3rem', 
              marginBottom: 12, 
              fontWeight: 600,
              color: 'var(--foreground)',
              position: 'relative',
              zIndex: 1,
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h2>

          {/* Descrição */}
          <motion.p 
            style={{ 
              fontSize: '1rem', 
              marginBottom: 16, 
              color: 'var(--foreground)',
              opacity: 0.8,
              lineHeight: 1.6,
              position: 'relative',
              zIndex: 1,
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {description}
          </motion.p>

          {/* Tecnologias */}
          {technologies.length > 0 && (
            <motion.div 
              style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 8, 
                marginBottom: 16,
                position: 'relative',
                zIndex: 1,
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: 11,
                    padding: '4px 8px',
                    borderRadius: 6,
                    background: 'rgba(0, 207, 255, 0.1)',
                    color: 'var(--primary)',
                    border: '1px solid rgba(0, 207, 255, 0.2)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          )}

          {/* Links */}
          <motion.div 
            style={{ 
              display: 'flex', 
              gap: 12,
              position: 'relative',
              zIndex: 1,
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {link && (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 14,
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                <ExternalLink size={16} />
                Demo
              </a>
            )}
            {github && (
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 14,
                  color: 'var(--secondary)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                <Github size={16} />
                Code
              </a>
            )}
          </motion.div>
        </motion.div>
      </HoverScale>
    </FadeUp>
  );
} 