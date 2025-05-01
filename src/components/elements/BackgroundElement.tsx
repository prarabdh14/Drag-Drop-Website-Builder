import React from 'react';
import { ElementType } from '../../types/editor';
import { useEditor } from '../../context/EditorContext';
import { Palette } from 'lucide-react';

interface BackgroundElementProps {
  element: ElementType;
}

const BackgroundElement: React.FC<BackgroundElementProps> = ({ element }) => {
  const { styles = {} } = element;
  const { updateElement } = useEditor();
  const { backgroundColor = '#FFFFFF' } = styles;

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(element.id, {
      ...element,
      styles: {
        ...element.styles,
        backgroundColor: e.target.value
      }
    });
  };

  return (
    <div className="p-4 bg-gray-700 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Palette size={16} className="text-gray-300" />
        <span className="text-sm text-gray-300">Background Color</span>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={backgroundColor}
          onChange={handleColorChange}
          className="w-10 h-10 rounded cursor-pointer"
        />
        <span className="text-sm text-gray-300 uppercase">{backgroundColor}</span>
      </div>
      <div 
        className="absolute top-0 left-0 right-0 bottom-0 -z-10" 
        style={{ backgroundColor }}
      />
    </div>
  );
};

export default BackgroundElement; 