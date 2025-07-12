import React from 'react';
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
  
  // Posição 3D baseada na posição lógica
  const translateX = (x - 1) * 60; // 60px de espaçamento entre cubos
  const translateY = (y - 1) * 60;
  const translateZ = (z - 1) * 60;

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
