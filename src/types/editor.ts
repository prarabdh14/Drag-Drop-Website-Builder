import { CSSProperties } from 'react';

export interface Position {
  x: number;
  y: number;
}

export type ElementStyles = CSSProperties;

export interface ElementType {
  id: string;
  type: string;
  content?: string;
  styles?: ElementStyles;
  position: Position;
  containerId?: string;
}