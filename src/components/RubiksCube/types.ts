export interface CubeletFaces {
  front?: string;
  back?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

export interface CubeletProps {
  position: [number, number, number]; // posição lógica no cubo (x,y,z)
  faces: CubeletFaces; // cor de cada face
  isAnimating?: boolean;
  animationClass?: string;
  layerGroup?: string;
  rotation?: [number, number, number]; // rotação do cubelet (rotX, rotY, rotZ)
}

export interface CubeletData {
  id: string;
  position: [number, number, number];
  faces: CubeletFaces;
  type: 'corner' | 'edge' | 'center';
}

export interface CubeletState {
  position: [number, number, number];
  faces: CubeletFaces;
  isAnimating: boolean;
  animationClass: string;
  layerGroup: string;
}

export interface CubeState {
  cubelets: CubeletState[];
  isAnimating: boolean;
  currentMove: string | null;
  matrix: (CubeletState | null)[][][]; // 3x3x3 matrix para tracking das posições
}

export type CubeMatrix = (CubeletState | null)[][][]; // 3x3x3 matrix

export type Axis = 'x' | 'y' | 'z';
export type Direction = 'cw' | 'ccw'; // clockwise / counter-clockwise
export type Layer = 0 | 1 | 2;

export interface RotationMove {
  axis: Axis;
  layer: Layer;
  direction: Direction;
  name: string; // R, U, F, etc.
}
