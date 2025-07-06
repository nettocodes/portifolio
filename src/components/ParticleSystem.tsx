"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: "circle" | "square" | "triangle";
}

export default function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const particlesRef = useRef<Particle[]>([]);
  
  // Transformações baseadas no scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.3]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: Particle[] = [];
    
    // Criar partículas iniciais
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as any
      });
    }
    
    particlesRef.current = particles;

    // Animação das partículas
    let animationId: number;
    const animate = () => {
      particles.forEach(particle => {
        particle.y -= particle.speed;
        if (particle.y < -10) {
          particle.y = window.innerHeight + 10;
          particle.x = Math.random() * window.innerWidth;
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const renderParticle = (particle: Particle) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: particle.x,
      top: particle.y,
      width: particle.size,
      height: particle.size,
      opacity: particle.opacity,
      background: 'var(--primary)',
      borderRadius: particle.type === 'circle' ? '50%' : '0',
      transform: particle.type === 'triangle' ? 'rotate(45deg)' : 'none',
    };

    if (particle.type === 'triangle') {
      return (
        <div
          key={particle.id}
          style={{
            ...baseStyle,
            width: 0,
            height: 0,
            background: 'transparent',
            borderLeft: `${particle.size / 2}px solid transparent`,
            borderRight: `${particle.size / 2}px solid transparent`,
            borderBottom: `${particle.size}px solid var(--primary)`,
            transform: 'none',
          }}
        />
      );
    }

    return (
      <div
        key={particle.id}
        style={baseStyle}
      />
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden'
      }}
    >
      {/* Camada 1 - Partículas lentas */}
      <motion.div style={{ y: y1, opacity }}>
        {particlesRef.current.slice(0, 20).map(renderParticle)}
      </motion.div>
      
      {/* Camada 2 - Partículas médias */}
      <motion.div style={{ y: y2, opacity }}>
        {particlesRef.current.slice(20, 35).map(renderParticle)}
      </motion.div>
      
      {/* Camada 3 - Partículas rápidas */}
      <motion.div style={{ y: y1, opacity }}>
        {particlesRef.current.slice(35).map(renderParticle)}
      </motion.div>

      {/* Gradientes de fundo */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 80%, rgba(0, 207, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 107, 157, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
} 