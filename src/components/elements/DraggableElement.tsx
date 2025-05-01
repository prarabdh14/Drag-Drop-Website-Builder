import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useEditor } from '../../context/EditorContext';
import { ElementType } from '../../types/editor';

interface DraggableElementProps {
  element: ElementType;
  children: React.ReactNode;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ element, children }) => {
  const { startDrag, endDrag, moveElement, selectedElement, selectElement } = useEditor();
  const elementRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => {
    startDrag(element);
  };

  const handleDragEnd = (event: any, info: any) => {
    const newPosition = {
      x: element.position.x + info.offset.x,
      y: element.position.y + info.offset.y
    };
    moveElement(element.id, newPosition);
    endDrag();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  return (
    <motion.div
      ref={elementRef}
      drag
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: element.position.x,
        top: element.position.y,
        cursor: 'move',
        zIndex: selectedElement?.id === element.id ? 10 : 1
      }}
      className={`relative ${selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div style={element.styles}>
        {children}
      </div>
    </motion.div>
  );
};

export default DraggableElement; 