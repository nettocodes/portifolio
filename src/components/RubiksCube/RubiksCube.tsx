import React, { useState, useEffect, useRef } from 'react';
import Cubelet from './Cubelet';
import type { CubeState, CubeletState, Axis, Direction, Layer, CubeMatrix } from './types';
import styles from './RubiksCube.module.scss';

const RubiksCube: React.FC = () => {
  const [cubeState, setCubeState] = useState<CubeState>({
    cubelets: [],
    isAnimating: false,
    currentMove: null,
    matrix: Array(3).fill(null).map(() => Array(3).fill(null).map(() => Array(3).fill(null)))
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<number | null>(null);

  // Cores das faces do cubo (padrão oficial)
  const colors = {
    front: '#009b48',   // Verde
    back: '#0051ba',    // Azul
    right: '#ff5800',   // Laranja
    left: '#c41e3a',    // Vermelho
    top: '#ffd500',     // Amarelo
    bottom: '#ffffff'   // Branco
  };

  // Função para rotacionar uma camada - versão mais estável
  const rotateLayer = (axis: Axis, layer: Layer, direction: Direction) => {
    if (cubeState.isAnimating) return;

    const clockwise = direction === 'cw';
    const layerGroup = `${axis}-${layer}`;
    
    // Marcar animação como iniciada
    setCubeState(prev => ({
      ...prev,
      isAnimating: true,
      currentMove: `${axis}${layer}${direction}`
    }));

    // Aplicar animação aos cubelets da camada - timing mais lento
    setTimeout(() => {
      setCubeState(prev => {
        const newCubelets = prev.cubelets.map(cubelet => {
          const [x, y, z] = cubelet.position;
          let inLayer = false;
          
          switch (axis) {
            case 'x': inLayer = x === layer; break;
            case 'y': inLayer = y === layer; break;
            case 'z': inLayer = z === layer; break;
          }
          
          if (inLayer) {
            const animationClass = clockwise ? 
              `${axis.toUpperCase()}CW` : 
              `${axis.toUpperCase()}CCW`;
            
            return {
              ...cubelet,
              isAnimating: true,
              layerGroup,
              animationClass
            };
          }
          
          return cubelet;
        });

        return {
          ...prev,
          cubelets: newCubelets
        };
      });
    }, 50); // Delay pequeno para aplicar animação

    // Após a animação, atualizar posições e faces - timing mais lento
    setTimeout(() => {
      setCubeState(prev => {
        const finalCubelets = prev.cubelets.map(cubelet => {
          const [x, y, z] = cubelet.position;
          let inLayer = false;
          
          switch (axis) {
            case 'x': inLayer = x === layer; break;
            case 'y': inLayer = y === layer; break;
            case 'z': inLayer = z === layer; break;
          }
          
          if (inLayer) {
            // Calcular nova posição após rotação
            let newX = x, newY = y, newZ = z;
            
            if (axis === 'x') {
              // Rotação no eixo X: y e z mudam, x permanece
              if (clockwise) {
                newY = z;
                newZ = 2 - y;
              } else {
                newY = 2 - z;
                newZ = y;
              }
            } else if (axis === 'y') {
              // Rotação no eixo Y: x e z mudam, y permanece
              if (clockwise) {
                newX = 2 - z;
                newZ = x;
              } else {
                newX = z;
                newZ = 2 - x;
              }
            } else if (axis === 'z') {
              // Rotação no eixo Z: x e y mudam, z permanece
              if (clockwise) {
                newX = y;
                newY = 2 - x;
              } else {
                newX = 2 - y;
                newY = x;
              }
            }
            
            // Reposicionar as faces coloridas baseado na nova posição
            // As faces coloridas devem sempre estar voltadas para fora do cubo
            const newFaces = { ...cubelet.faces };
            
            // Primeiro, coletamos todas as cores das faces existentes
            const existingColors = Object.values(cubelet.faces).filter(color => color !== undefined);
            
            // Limpa todas as faces
            newFaces.front = undefined;
            newFaces.back = undefined;
            newFaces.left = undefined;
            newFaces.right = undefined;
            newFaces.top = undefined;
            newFaces.bottom = undefined;
            
            // Reposiciona as cores nas faces externas baseado na nova posição
            let colorIndex = 0;
            
            // Aplica cores apenas nas faces que estão nas bordas do cubo (faces externas)
            if (newZ === 2 && colorIndex < existingColors.length) newFaces.front = existingColors[colorIndex++];   // Face frontal
            if (newZ === 0 && colorIndex < existingColors.length) newFaces.back = existingColors[colorIndex++];    // Face traseira
            if (newX === 2 && colorIndex < existingColors.length) newFaces.right = existingColors[colorIndex++];   // Face direita
            if (newX === 0 && colorIndex < existingColors.length) newFaces.left = existingColors[colorIndex++];    // Face esquerda
            if (newY === 0 && colorIndex < existingColors.length) newFaces.top = existingColors[colorIndex++];     // Face superior
            if (newY === 2 && colorIndex < existingColors.length) newFaces.bottom = existingColors[colorIndex++];  // Face inferior
            
            return {
              ...cubelet,
              faces: newFaces,
              position: [newX, newY, newZ] as [number, number, number],
              isAnimating: false,
              layerGroup: '',
              animationClass: ''
            };
          }
          
          return {
            ...cubelet,
            isAnimating: false,
            layerGroup: '',
            animationClass: ''
          };
        });

        return {
          ...prev,
          cubelets: finalCubelets,
          isAnimating: false,
          currentMove: null
        };
      });
    }, 1250); // Timing mais lento para animações suaves
  };

  // Sequência de movimentos para embaralhar - mais variada e realista
  const scrambleMoves = [
    { axis: 'x' as Axis, layer: 2 as Layer, direction: 'cw' as Direction, name: 'R' },
    { axis: 'y' as Axis, layer: 0 as Layer, direction: 'ccw' as Direction, name: "U'" },
    { axis: 'z' as Axis, layer: 2 as Layer, direction: 'cw' as Direction, name: 'F' },
    { axis: 'x' as Axis, layer: 0 as Layer, direction: 'cw' as Direction, name: 'L' },
    { axis: 'y' as Axis, layer: 2 as Layer, direction: 'cw' as Direction, name: 'D' },
    { axis: 'z' as Axis, layer: 0 as Layer, direction: 'ccw' as Direction, name: "B'" },
    { axis: 'y' as Axis, layer: 1 as Layer, direction: 'cw' as Direction, name: 'M' },
    { axis: 'x' as Axis, layer: 2 as Layer, direction: 'ccw' as Direction, name: "R'" },
    { axis: 'z' as Axis, layer: 2 as Layer, direction: 'ccw' as Direction, name: "F'" },
    { axis: 'y' as Axis, layer: 0 as Layer, direction: 'cw' as Direction, name: 'U' },
    { axis: 'x' as Axis, layer: 1 as Layer, direction: 'ccw' as Direction, name: "E'" },
    { axis: 'z' as Axis, layer: 1 as Layer, direction: 'cw' as Direction, name: 'S' },
  ];

  // Sequência de movimentos para resolver - mais longa e realista
  const solveMoves = [
    { axis: 'z' as Axis, layer: 1 as Layer, direction: 'ccw' as Direction, name: "S'" },
    { axis: 'x' as Axis, layer: 1 as Layer, direction: 'cw' as Direction, name: 'E' },
    { axis: 'y' as Axis, layer: 0 as Layer, direction: 'ccw' as Direction, name: "U'" },
    { axis: 'z' as Axis, layer: 2 as Layer, direction: 'cw' as Direction, name: 'F' },
    { axis: 'x' as Axis, layer: 2 as Layer, direction: 'cw' as Direction, name: 'R' },
    { axis: 'y' as Axis, layer: 1 as Layer, direction: 'ccw' as Direction, name: "M'" },
    { axis: 'z' as Axis, layer: 0 as Layer, direction: 'cw' as Direction, name: 'B' },
    { axis: 'y' as Axis, layer: 2 as Layer, direction: 'ccw' as Direction, name: "D'" },
    { axis: 'x' as Axis, layer: 0 as Layer, direction: 'ccw' as Direction, name: "L'" },
    { axis: 'z' as Axis, layer: 2 as Layer, direction: 'ccw' as Direction, name: "F'" },
    { axis: 'y' as Axis, layer: 0 as Layer, direction: 'cw' as Direction, name: 'U' },
    { axis: 'x' as Axis, layer: 2 as Layer, direction: 'ccw' as Direction, name: "R'" },
  ];

  // Função para executar uma sequência de movimentos - mais rápida
  const executeSequence = (moves: { axis: Axis; layer: Layer; direction: Direction; name: string }[], callback?: () => void) => {
    if (cubeState.isAnimating) return;

    let currentMoveIndex = 0;
    
    const executeNextMove = () => {
      if (currentMoveIndex >= moves.length) {
        if (callback) callback();
        return;
      }

      const move = moves[currentMoveIndex];
      rotateLayer(move.axis, move.layer, move.direction);
      
      currentMoveIndex++;
      
      // Timing mais lento para garantir que apenas um eixo mova por vez
      setTimeout(() => {
        executeNextMove();
      }, 1400); // Tempo suficiente para uma animação completa
    };

    executeNextMove();
  };

  // Função para iniciar o ciclo de animação automática - mais mecânico
  const startAutomaticAnimation = () => {
    // Primeiro embaralha, depois resolve, depois repete
    executeSequence(scrambleMoves, () => {
      // Após embaralhar, pausa brevemente e resolve
      setTimeout(() => {
        executeSequence(solveMoves, () => {
          // Após resolver, pausa brevemente e reinicia o ciclo
          animationTimeoutRef.current = window.setTimeout(() => {
            startAutomaticAnimation();
          }, 2000); // Pausa mais curta
        });
      }, 1000); // Pausa mais curta
    });
  };

  // Inicializar o cubo e começar animação automática
  useEffect(() => {
    const initializeCube = () => {
      const cubelets: CubeletState[] = [];
      const matrix: CubeMatrix = Array(3).fill(null).map(() => 
        Array(3).fill(null).map(() => Array(3).fill(null))
      );
      
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          for (let z = 0; z < 3; z++) {
            // Determinar as cores das faces baseado na posição original
            const faces = {
              front: z === 2 ? colors.front : undefined,   // Verde apenas na camada frontal
              back: z === 0 ? colors.back : undefined,     // Azul apenas na camada traseira  
              right: x === 2 ? colors.right : undefined,   // Laranja apenas na camada direita
              left: x === 0 ? colors.left : undefined,     // Vermelho apenas na camada esquerda
              top: y === 0 ? colors.top : undefined,       // Amarelo apenas na camada superior
              bottom: y === 2 ? colors.bottom : undefined, // Branco apenas na camada inferior
            };

            // Apenas adicionar cubelets que têm pelo menos uma face colorida (não são internos)
            const hasColoredFace = Object.values(faces).some(face => face !== undefined);
            
            if (hasColoredFace) {
              const cubelet: CubeletState = {
                position: [x, y, z] as [number, number, number],
                faces: { ...faces },
                isAnimating: false,
                animationClass: '',
                layerGroup: ''
              };
              
              cubelets.push(cubelet);
              matrix[x][y][z] = cubelet;
            }
          }
        }
      }

      setCubeState(prev => ({
        ...prev,
        cubelets,
        matrix
      }));
    };

    initializeCube();

    // Iniciar animação automática após um pequeno delay
    const startAutoTimer = setTimeout(() => {
      // Criar função local para animação automática
      const autoAnimation = () => {
        // Primeiro embaralha
        let currentMoveIndex = 0;
        const executeScramble = () => {
          if (currentMoveIndex >= scrambleMoves.length) {
            // Após embaralhar, pausa brevemente e resolve
            setTimeout(() => {
              let solveMoveIndex = 0;
              const executeSolve = () => {
                if (solveMoveIndex >= solveMoves.length) {
                  // Após resolver, pausa mais longa e reinicia
                  animationTimeoutRef.current = window.setTimeout(() => {
                    autoAnimation();
                  }, 3000); // Pausa mais longa
                  return;
                }
                
                const move = solveMoves[solveMoveIndex];
                rotateLayer(move.axis, move.layer, move.direction);
                solveMoveIndex++;
                
                setTimeout(executeSolve, 1400); // Timing mais lento
              };
              executeSolve();
            }, 1500); // Pausa mais longa
            return;
          }
          
          const move = scrambleMoves[currentMoveIndex];
          rotateLayer(move.axis, move.layer, move.direction);
          currentMoveIndex++;
          
          setTimeout(executeScramble, 1400); // Timing mais lento
        };
        executeScramble();
      };
      
      autoAnimation();
    }, 1000); // Delay mais curto para começar mais rápido

    // Cleanup ao desmontar o componente
    return () => {
      clearTimeout(startAutoTimer);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []); // Removendo dependências para evitar loops

  return (
    <div className={styles.cubeContainer} ref={containerRef}>
      <div className={styles.cube}>
        {cubeState.cubelets.map((cubelet: CubeletState, index: number) => (
          <Cubelet
            key={index}
            position={cubelet.position}
            faces={cubelet.faces}
            isAnimating={cubelet.isAnimating}
            layerGroup={cubelet.layerGroup}
            animationClass={cubelet.animationClass}
          />
        ))}
      </div>
    </div>
  );
};

export default RubiksCube;
