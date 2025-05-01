import React from 'react';
import { ElementType } from '../../types/editor';

interface ImageElementProps {
  element: ElementType;
}

const ImageElement: React.FC<ImageElementProps> = ({ element }) => {
  const { content, styles = {} } = element;
  const { width = '100%', objectFit = 'cover', borderRadius = '0' } = styles;

  return (
    <img 
      src={content || 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
      alt="Element" 
      style={{ 
        width, 
        objectFit: objectFit as 'cover' | 'contain' | 'fill', 
        borderRadius 
      }}
      className="max-w-full"
    />
  );
};

export default ImageElement;