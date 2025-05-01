import React from 'react';
import { ElementType } from '../../types/editor';

interface TextElementProps {
  element: ElementType;
}

const TextElement: React.FC<TextElementProps> = ({ element }) => {
  const { content, styles = {} } = element;
  const { fontSize = '1rem', fontWeight = 'normal', textAlign = 'left', color = '#000000' } = styles;

  return (
    <p 
      style={{ 
        fontSize, 
        fontWeight, 
        textAlign: textAlign as 'left' | 'center' | 'right', 
        color 
      }}
    >
      {content || 'Text content goes here. Click to edit.'}
    </p>
  );
};

export default TextElement;