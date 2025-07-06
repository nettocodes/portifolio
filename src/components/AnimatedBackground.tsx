"use client";

import { motion } from "framer-motion";
import ParticleSystem from "./ParticleSystem";

export default function AnimatedBackground() {
  return (
    <>
      <ParticleSystem />
      
      {/* Gradientes animados */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -2,
        overflow: 'hidden'
      }}>
        {/* Gradiente principal animado */}
        <motion.div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `
              radial-gradient(circle at 30% 70%, rgba(0, 207, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(255, 107, 157, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)
            `,
            filter: 'blur(100px)',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Gradiente secundário */}
        <motion.div
          style={{
            position: 'absolute',
            top: '-25%',
            right: '-25%',
            width: '150%',
            height: '150%',
            background: `
              radial-gradient(circle at 60% 40%, rgba(0, 207, 255, 0.1) 0%, transparent 40%),
              radial-gradient(circle at 40% 60%, rgba(255, 107, 157, 0.1) 0%, transparent 40%)
            `,
            filter: 'blur(80px)',
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Linhas de grade sutis */}
        <div
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
            backgroundSize: '50px 50px',
            opacity: 0.3,
          }}
        />
        
        {/* Overlay de ruído */}
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
      </div>
    </>
  );
} 