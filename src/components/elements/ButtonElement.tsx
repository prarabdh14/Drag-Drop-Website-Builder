import React from 'react';
import { ElementType } from '../../types/editor';

interface ButtonElementProps {
  element: ElementType;
}

const ButtonElement: React.FC<ButtonElementProps> = ({ element }) => {
  const { content, styles = {} } = element;
  const { 
    backgroundColor = '#3B82F6', 
    color = '#FFFFFF', 
    padding = '0.5rem 1rem', 
    borderRadius = '0.25rem',
    fontWeight = 'medium',
    width = 'auto'
  } = styles;

  return (
    <button 
      style={{ 
        backgroundColor, 
        color, 
        padding, 
        borderRadius,
        fontWeight,
        width
      }}
      className="cursor-pointer transition-colors"
    >
      {content || 'Click Me'}
    </button>
  );
};

export default ButtonElement;