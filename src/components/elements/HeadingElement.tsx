import React from 'react';
import { ElementType } from '../../types/editor';

interface HeadingElementProps {
  element: ElementType;
}

const HeadingElement: React.FC<HeadingElementProps> = ({ element }) => {
  const { content, styles = {} } = element;
  const { fontSize = '2rem', fontWeight = 'bold', textAlign = 'left', color = '#000000' } = styles;

  return (
    <h2 
      style={{ 
        fontSize, 
        fontWeight, 
        textAlign: textAlign as 'left' | 'center' | 'right', 
        color 
      }}
    >
      {content || 'Heading Text'}
    </h2>
  );
};

export default HeadingElement;