import React, { useState, useEffect } from 'react';
import type { CubeletProps } from './types';
import styles from './Cubelet.module.scss';

const Cubelet: React.FC<CubeletProps> = ({ 
  position, 
  faces, 
  isAnimating = false, 
  layerGroup = '',
  animationClass = ''
}) => {
  const [x, y, z] = position;
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  // Hook para detectar mudanças no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calcular espaçamento responsivo baseado no tamanho da tela
  const getSpacing = () => {
    if (windowWidth <= 360) return 33; // Mesmo tamanho do cubelet
    if (windowWidth <= 480) return 40;
    if (windowWidth <= 768) return 47;
    if (windowWidth <= 1024) return 53;
    return 60; // Tamanho padrão
  };
  
  const spacing = getSpacing();
  
  // Posição 3D baseada na posição lógica com espaçamento responsivo
  const translateX = (x - 1) * spacing;
  const translateY = (y - 1) * spacing;
  const translateZ = (z - 1) * spacing;

  const cubeletStyle: React.CSSProperties = {
    transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`,
    transformStyle: 'preserve-3d',
  };

  // Aplicar classe de animação dinamicamente
  const animationClassName = animationClass ? styles[`rotate${animationClass}`] : '';

  // Função para renderizar face apenas se ela tem cor definida
  const renderFace = (faceKey: string, color: string | undefined, className: string) => {
    // Não renderizar faces sem cor (undefined)
    if (!color) return null;
    
    return (
      <div 
        key={faceKey}
        className={`${styles.face} ${className}`}
        style={{ 
          backgroundColor: color,
          opacity: 1
        }}
      />
    );
  };

  return (
    <div 
      className={`${styles.cubelet} ${isAnimating ? `${styles.animating} ${animationClassName}` : ''}`}
      style={cubeletStyle}
      data-position={`${x},${y},${z}`}
      data-layer-group={layerGroup}
    >
      {/* Renderizar apenas as faces coloridas (não internas) */}
      {renderFace('front', faces.front, styles.front)}
      {renderFace('back', faces.back, styles.back)}
      {renderFace('right', faces.right, styles.right)}
      {renderFace('left', faces.left, styles.left)}
      {renderFace('top', faces.top, styles.top)}
      {renderFace('bottom', faces.bottom, styles.bottom)}
    </div>
  );
};

export default Cubelet;
