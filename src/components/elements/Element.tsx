import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { ElementType } from '../../types/editor';
import { ELEMENT_TYPES } from '../../constants/elementTypes';
import HeadingElement from './HeadingElement';
import TextElement from './TextElement';
import ImageElement from './ImageElement';
import ButtonElement from './ButtonElement';

interface ElementProps {
  element: ElementType;
  isPreview?: boolean;
}

const Element: React.FC<ElementProps> = ({ element, isPreview = false }) => {
  const { selectedElement, selectElement } = useEditor();
  const isSelected = selectedElement?.id === element.id;

  const handleClick = (e: React.MouseEvent) => {
    if (!isPreview) {
      e.stopPropagation();
      selectElement(element.id);
    }
  };

  const renderElement = () => {
    switch (element.type) {
      case ELEMENT_TYPES.HEADING:
        return <HeadingElement element={element} />;
      case ELEMENT_TYPES.TEXT:
        return <TextElement element={element} />;
      case ELEMENT_TYPES.IMAGE:
        return <ImageElement element={element} />;
      case ELEMENT_TYPES.BUTTON:
        return <ButtonElement element={element} />;
      default:
        return <div>Unknown element type</div>;
    }
  };

  return (
    <div
      className={`relative ${!isPreview && isSelected ? 'element-selected' : ''}`}
      onClick={handleClick}
      style={{
        position: 'relative',
        width: element.styles?.width || 'auto',
        margin: element.styles?.margin || '0',
        padding: element.styles?.padding || '0',
      }}
    >
      {!isPreview && isSelected && (
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-blue-500 rounded-sm pointer-events-none z-10" />
      )}
      {renderElement()}
    </div>
  );
};

export default Element;