"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Code, Globe, Database, Zap, Palette, 
  Users, Award, Star, Clock, 
  ChevronDown, ArrowRight, ExternalLink,
  MousePointer, Keyboard, Monitor, Smartphone,
  Github, Linkedin, Twitter, Mail
} from "lucide-react";
import AnimatedButton from "./AnimatedButton";

const typewriterTexts = [
  "Desenvolvedor Full-Stack", 
  "Especialista em Animações Web", 
  "Criador de Experiências Digitais", 
  "Apaixonado por Tecnologia"
];



const techStack = [
  { name: "React", icon: Code, color: "#61dafb" },
  { name: "Next.js", icon: Globe, color: "#fff" },
  { name: "TypeScript", icon: Code, color: "#3178c6" },
  { name: "Node.js", icon: Database, color: "#8cc84b" },
  { name: "GSAP", icon: Zap, color: "#88ce02" },
  { name: "Framer Motion", icon: Palette, color: "#e100ff" }
];

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        padding: "2rem 1rem",
      }}
    >
      {/* Background Grid Interativo */}
      <InteractiveGrid />

      {/* Conteúdo principal */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", padding: "0 2rem", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
        {/* Badge de status - Canto superior direito */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            position: "absolute",
            top: "120px",
            right: "2rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "25px",
            background: "rgba(0, 207, 255, 0.1)",
            border: "1px solid rgba(0, 207, 255, 0.2)",
            color: "var(--primary)",
            fontSize: "0.9rem",
            fontWeight: 500,
            zIndex: 10
          }}
        >
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--primary)",
            animation: "pulse 2s infinite"
          }} />
          Disponível para novos projetos
        </motion.div>

        {/* Título principal - Canto esquerdo */}
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          style={{
            fontSize: "clamp(4rem, 12vw, 8rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "2rem",
            lineHeight: 1,
            animation: "gradientShift 8s ease-in-out infinite alternate",
            textAlign: "left",
            maxWidth: "60%"
          }}
        >
          Olá, eu sou
          <br />
          <span style={{ 
            background: "linear-gradient(135deg, #00cfff 0%, #ff6b9d 50%, #8a2be2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Ivo Braatz
          </span>
        </motion.h1>

        {/* Subtítulo typewriter - Centro direito */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
          style={{
            position: "absolute",
            top: "50%",
            right: "2rem",
            transform: "translateY(-50%)",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            fontWeight: 500,
            color: "var(--foreground)",
            minHeight: 60,
            opacity: 0.9,
            textAlign: "right",
            maxWidth: "35%"
          }}
        >
          <Typewriter texts={typewriterTexts} />
        </motion.div>

        {/* Botões principais - Canto inferior esquerdo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
          style={{ 
            position: "absolute",
            bottom: "4rem",
            left: "2rem",
            display: "flex", 
            gap: "2rem", 
            flexWrap: "wrap"
          }}
        >
          <AnimatedButton as="a" href="#projetos">
            Ver Projetos
            <ArrowRight size={24} />
          </AnimatedButton>
          <AnimatedButton as="a" href="#contato" variant="secondary">
            Fale Comigo
            <Mail size={24} />
          </AnimatedButton>
        </motion.div>

        {/* Redes sociais - Canto inferior direito */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1, type: "spring" }}
          style={{
            position: "absolute",
            bottom: "4rem",
            right: "2rem",
            display: "flex",
            gap: "1.5rem"
          }}
        >
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Twitter, href: "#", label: "Twitter" },
            { icon: Mail, href: "#", label: "Email" }
          ].map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "rgba(0, 207, 255, 0.1)",
                  border: "1px solid rgba(0, 207, 255, 0.2)",
                  color: "var(--primary)",
                  textDecoration: "none",
                  transition: "all 0.3s"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  background: "rgba(0, 207, 255, 0.2)",
                  border: "1px solid rgba(0, 207, 255, 0.4)"
                }}
                aria-label={social.label}
              >
                <IconComponent size={24} />
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        style={{ 
          position: "absolute", 
          bottom: 32, 
          left: "50%", 
          transform: "translateX(-50%)", 
          zIndex: 2 
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--primary)",
          opacity: 0.7
        }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>Scroll</span>
          <ChevronDown size={24} />
        </div>
      </motion.div>

      {/* CSS para animações */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}

// Interactive Grid Background
function InteractiveGrid() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const gridSize = 80; // Aumentado para reduzir número de células
  const gridConfig = useMemo(() => {
    const cols = Math.ceil(window.innerWidth / gridSize);
    const rows = Math.ceil(window.innerHeight / gridSize);
    return { cols, rows };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background: "var(--background)",
        overflow: "hidden"
      }}
      onMouseMove={(e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsHovering(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Gradiente de fundo animado */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(0,207,255,0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(255,107,157,0.06) 0%, transparent 40%),
            radial-gradient(circle at 40% 60%, rgba(138,43,226,0.04) 0%, transparent 40%)
          `,
        }}
        animate={{
          background: [
            `
              radial-gradient(circle at 20% 20%, rgba(0,207,255,0.08) 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, rgba(255,107,157,0.06) 0%, transparent 40%),
              radial-gradient(circle at 40% 60%, rgba(138,43,226,0.04) 0%, transparent 40%)
            `,
            `
              radial-gradient(circle at 80% 20%, rgba(0,207,255,0.08) 0%, transparent 40%),
              radial-gradient(circle at 20% 80%, rgba(255,107,157,0.06) 0%, transparent 40%),
              radial-gradient(circle at 60% 40%, rgba(138,43,226,0.04) 0%, transparent 40%)
            `,
            `
              radial-gradient(circle at 20% 20%, rgba(0,207,255,0.08) 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, rgba(255,107,157,0.06) 0%, transparent 40%),
              radial-gradient(circle at 40% 60%, rgba(138,43,226,0.04) 0%, transparent 40%)
            `
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />


      
      {/* Grid interativo */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.2,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="0.5"
              opacity="0.1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Células do grid interativas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
          gap: "1px",
        }}
      >
        {Array.from({ length: gridConfig.cols * gridConfig.rows }, (_, i) => {
          const col = i % gridConfig.cols;
          const row = Math.floor(i / gridConfig.cols);
          const cellX = col * gridSize + gridSize / 2;
          const cellY = row * gridSize + gridSize / 2;
          
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - cellX, 2) + Math.pow(mousePosition.y - cellY, 2)
          );
          
          const maxDistance = 200;
          const intensity = isHovering 
            ? Math.max(0, 1 - distance / maxDistance) 
            : 0;

          return (
            <motion.div
              key={i}
              style={{
                background: `rgba(0, 207, 255, ${intensity * 0.1})`,
                borderRadius: "2px",
                transition: "all 0.3s ease",
              }}
              animate={{
                scale: intensity > 0.1 ? 1.05 : 1,
                opacity: intensity * 0.3,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut"
              }}
            />
          );
        })}
      </div>

      {/* Linhas de conexão animadas */}
      {isHovering && (
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * 2 * Math.PI;
            const endX = mousePosition.x + Math.cos(angle) * 150;
            const endY = mousePosition.y + Math.sin(angle) * 150;
            
            return (
              <motion.line
                key={i}
                x1={mousePosition.x}
                y1={mousePosition.y}
                x2={endX}
                y2={endY}
                stroke="var(--primary)"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            );
          })}
        </svg>
      )}

      {/* Círculo simples ao redor do mouse */}
      {isHovering && (
        <motion.div
          style={{
            position: "absolute",
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid var(--primary)",
            zIndex: 2,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

// Typewriter effect
function Typewriter({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1200);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, texts, index]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <span style={{ fontFamily: 'Poppins, monospace', color: 'var(--primary)' }}>
      {texts[index].substring(0, subIndex)}
      <span style={{ opacity: blink ? 1 : 0 }}>|</span>
    </span>
  );
} 