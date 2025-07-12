import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import styles from './AnimatedGridOptimized.module.scss';

interface AnimatedGridOptimizedProps {
  className?: string;
}

const AnimatedGridOptimized: React.FC<AnimatedGridOptimizedProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationId = useRef<number | null>(null);
  const isAnimating = useRef(false);
  const lastFrameTime = useRef(0);
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;
  
  // Cache para otimização
  const gridCache = useRef<{
    imageData: ImageData | null;
    ctx: CanvasRenderingContext2D | null;
    width: number;
    height: number;
    cellSize: number;
    cols: number;
    rows: number;
    mouseInfluence: number;
    lastMouseX: number;
    lastMouseY: number;
  }>({
    imageData: null,
    ctx: null,
    width: 0,
    height: 0,
    cellSize: 30, // Reduzido para melhor performance
    cols: 0,
    rows: 0,
    mouseInfluence: 0.8,
    lastMouseX: -1,
    lastMouseY: -1
  });

  const initializeCanvas = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Usar devicePixelRatio para displays de alta resolução
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false; // Desabilitar para melhor performance
    
    const cellSize = gridCache.current.cellSize;
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);
    
    gridCache.current = {
      ...gridCache.current,
      ctx,
      width,
      height,
      cols,
      rows,
      imageData: ctx.createImageData(width, height)
    };
  }, []);

  const drawGridOptimized = useCallback(() => {
    const cache = gridCache.current;
    if (!cache.ctx || !cache.imageData) return;

    const { ctx, width, height, cellSize, cols, rows, mouseInfluence } = cache;
    const { x: mouseX, y: mouseY } = mousePos.current;
    
    // Limpar canvas mais eficientemente
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    // Calcular região de influência do mouse para otimizar
    const influenceRadius = 100;
    const minCol = Math.max(0, Math.floor((mouseX - influenceRadius) / cellSize));
    const maxCol = Math.min(cols - 1, Math.ceil((mouseX + influenceRadius) / cellSize));
    const minRow = Math.max(0, Math.floor((mouseY - influenceRadius) / cellSize));
    const maxRow = Math.min(rows - 1, Math.ceil((mouseY + influenceRadius) / cellSize));
    
    // Desenhar grade base (otimizado)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    
    // Linhas verticais
    for (let col = 0; col <= cols; col++) {
      const x = col * cellSize;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    
    // Linhas horizontais
    for (let row = 0; row <= rows; row++) {
      const y = row * cellSize;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    
    ctx.stroke();
    
    // Efeito de iluminação apenas na região próxima ao mouse
    if (mouseX >= 0 && mouseY >= 0) {
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const cellX = col * cellSize;
          const cellY = row * cellSize;
          const cellCenterX = cellX + cellSize / 2;
          const cellCenterY = cellY + cellSize / 2;
          
          const distance = Math.sqrt(
            Math.pow(mouseX - cellCenterX, 2) + 
            Math.pow(mouseY - cellCenterY, 2)
          );
          
          if (distance < influenceRadius) {
            const intensity = Math.pow(1 - distance / influenceRadius, 2) * mouseInfluence;
            
            if (intensity > 0.05) {
              // Usar gradiente radial para efeito mais suave
              const gradient = ctx.createRadialGradient(
                cellCenterX, cellCenterY, 0,
                cellCenterX, cellCenterY, cellSize
              );
              
              gradient.addColorStop(0, `rgba(79, 140, 255, ${intensity * 0.3})`);
              gradient.addColorStop(0.5, `rgba(79, 140, 255, ${intensity * 0.15})`);
              gradient.addColorStop(1, `rgba(79, 140, 255, 0)`);
              
              ctx.fillStyle = gradient;
              ctx.fillRect(cellX, cellY, cellSize, cellSize);
              
              // Borda iluminada
              ctx.strokeStyle = `rgba(79, 140, 255, ${intensity * 0.6})`;
              ctx.lineWidth = 1;
              ctx.strokeRect(cellX, cellY, cellSize, cellSize);
            }
          }
        }
      }
    }
  }, []);

  const animate = useCallback((currentTime: number) => {
    if (!isAnimating.current) return;
    
    // Controle de FPS
    if (currentTime - lastFrameTime.current >= frameInterval) {
      // Só redesenhar se o mouse se moveu significativamente
      const cache = gridCache.current;
      const { x: mouseX, y: mouseY } = mousePos.current;
      const mouseMoved = Math.abs(mouseX - cache.lastMouseX) > 2 || 
                        Math.abs(mouseY - cache.lastMouseY) > 2;
      
      if (mouseMoved || cache.lastMouseX === -1) {
        drawGridOptimized();
        cache.lastMouseX = mouseX;
        cache.lastMouseY = mouseY;
      }
      
      lastFrameTime.current = currentTime;
    }
    
    animationId.current = requestAnimationFrame(animate);
  }, [drawGridOptimized]);

  const startAnimation = useCallback(() => {
    if (!isAnimating.current) {
      isAnimating.current = true;
      animationId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const stopAnimation = useCallback(() => {
    isAnimating.current = false;
    if (animationId.current) {
      cancelAnimationFrame(animationId.current);
      animationId.current = null;
    }
  }, []);

  useEffect(() => {
    initializeCanvas();
    
    // Capturar eventos do mouse no nível do documento para não perder o rastro
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      
      // Verificar se o mouse está dentro dos limites do container
      if (newX >= 0 && newX <= rect.width && newY >= 0 && newY <= rect.height) {
        mousePos.current = { x: newX, y: newY };
        
        // Aumentar influência do mouse suavemente
        gsap.to(gridCache.current, {
          mouseInfluence: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    };

    const handleMouseEnter = () => {
      startAnimation();
    };

    const handleMouseLeave = () => {
      // Reduzir influência do mouse
      gsap.to(gridCache.current, {
        mouseInfluence: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          mousePos.current = { x: -1, y: -1 };
          drawGridOptimized();
        }
      });
    };

    const handleResize = () => {
      stopAnimation();
      setTimeout(() => {
        initializeCanvas();
        drawGridOptimized();
        startAnimation();
      }, 100);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    const container = containerRef.current;
    
    if (container) {
      // Usar document para capturar todos os eventos de mouse
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      window.addEventListener('resize', handleResize);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Desenhar grade inicial
      drawGridOptimized();
    }

    return () => {
      stopAnimation();
      if (container) {
        document.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [initializeCanvas, drawGridOptimized, startAnimation, stopAnimation]);

  return (
    <motion.div
      ref={containerRef}
      className={`${styles.animatedGridOptimized} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.canvas
        ref={canvasRef}
        className={styles.canvas}
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.1
        }}
      />
      
      <div className={styles.overlay} />
    </motion.div>
  );
};

export default AnimatedGridOptimized;
