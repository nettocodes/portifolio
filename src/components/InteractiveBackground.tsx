"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: "circle" | "square" | "triangle" | "star";
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Scroll-based transformations
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize particles
    const initialParticles: Particle[] = [];
    const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
    
    for (let i = 0; i < 80; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        type: ["circle", "square", "triangle", "star"][Math.floor(Math.random() * 4)] as any,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      });
    }
    
    setParticles(initialParticles);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;

    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        rotation: particle.rotation + particle.rotationSpeed,
        x: particle.x + (isHovering ? Math.sin(particle.y * 0.01) * 0.5 : 0),
        opacity: isHovering ? Math.min(particle.opacity * 1.5, 0.8) : particle.opacity
      })).map(particle => ({
        ...particle,
        y: particle.y < -10 ? window.innerHeight + 10 : particle.y,
        x: particle.x < -10 ? window.innerWidth + 10 : 
           particle.x > window.innerWidth + 10 ? -10 : particle.x
      })));
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [particles.length, isHovering]);

  const renderParticle = (particle: Particle) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: particle.x,
      top: particle.y,
      width: particle.size,
      height: particle.size,
      opacity: particle.opacity,
      background: particle.color,
      borderRadius: particle.type === 'circle' ? '50%' : '0',
      transform: `rotate(${particle.rotation}deg)`,
      transition: 'all 0.3s ease',
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
            borderBottom: `${particle.size}px solid ${particle.color}`,
          }}
        />
      );
    }

    if (particle.type === 'star') {
      return (
        <div
          key={particle.id}
          style={{
            ...baseStyle,
            background: 'transparent',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: particle.size,
            height: particle.size,
            transform: 'translate(-50%, -50%)',
            background: particle.color,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }} />
        </div>
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
      {/* Interactive gradient that follows mouse */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at ${springMouseX}px ${springMouseY}px, 
              rgba(0, 207, 255, 0.1) 0%, 
              rgba(255, 107, 157, 0.05) 30%, 
              transparent 70%),
            radial-gradient(circle at ${springMouseY}px ${springMouseX}px, 
              rgba(99, 102, 241, 0.08) 0%, 
              transparent 50%)
          `,
          filter: 'blur(60px)',
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Animated geometric shapes */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `
            conic-gradient(from ${rotation}deg, 
              transparent 0deg, 
              rgba(0, 207, 255, 0.05) 90deg, 
              transparent 180deg, 
              rgba(255, 107, 157, 0.05) 270deg, 
              transparent 360deg)
          `,
          filter: 'blur(80px)',
          scale: scale,
        }}
      />

      {/* Particle layers */}
      <motion.div style={{ y: y1, opacity }}>
        {particles.slice(0, 20).map(renderParticle)}
      </motion.div>
      
      <motion.div style={{ y: y2, opacity }}>
        {particles.slice(20, 40).map(renderParticle)}
      </motion.div>
      
      <motion.div style={{ y: y3, opacity }}>
        {particles.slice(40, 60).map(renderParticle)}
      </motion.div>

      <motion.div style={{ y: y1, opacity }}>
        {particles.slice(60).map(renderParticle)}
      </motion.div>

      {/* Grid pattern */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(90deg, transparent 98%, rgba(0, 207, 255, 0.1) 100%),
            linear-gradient(0deg, transparent 98%, rgba(255, 107, 157, 0.1) 100%)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.3,
        }}
        animate={{
          opacity: isHovering ? 0.5 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Noise overlay */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Mouse trail effect */}
      {isHovering && (
        <motion.div
          style={{
            position: 'absolute',
            top: springMouseY,
            left: springMouseX,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 207, 255, 0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
    </div>
  );
} 