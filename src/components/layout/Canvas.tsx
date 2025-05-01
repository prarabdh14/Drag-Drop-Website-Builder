import React from 'react';
import { motion } from 'framer-motion';
import { useEditor } from '../../context/EditorContext';
import DraggableElement from '../elements/DraggableElement';
import { ELEMENT_TYPES } from '../../constants/elementTypes';

const Canvas: React.FC = () => {
  const { elements, dropTarget, setDropTarget, addElement } = useEditor();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('elementType');
    if (type) {
      const rect = e.currentTarget.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      addElement(type, 'root', position);
    }
    setDropTarget(null);
  };

  return (
    <motion.div
      className="flex-1 bg-white relative overflow-auto min-h-[500px]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        backgroundImage: 'linear-gradient(to right, #f3f4f6 1px, transparent 1px), linear-gradient(to bottom, #f3f4f6 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      {elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400">Drag and drop elements here to build your website</p>
        </div>
      )}
      {elements.map((element) => {
        switch (element.type) {
          case ELEMENT_TYPES.HEADING:
            return (
              <DraggableElement key={element.id} element={element}>
                <h1 className="text-2xl font-bold">{element.content || 'Heading'}</h1>
              </DraggableElement>
            );
          case ELEMENT_TYPES.TEXT:
            return (
              <DraggableElement key={element.id} element={element}>
                <p>{element.content || 'Text content goes here'}</p>
              </DraggableElement>
            );
          case ELEMENT_TYPES.IMAGE:
            return (
              <DraggableElement key={element.id} element={element}>
                <img 
                  src={element.content || 'https://via.placeholder.com/150'} 
                  alt="Draggable" 
                  className="max-w-full h-auto"
                />
              </DraggableElement>
            );
          case ELEMENT_TYPES.BUTTON:
            return (
              <DraggableElement key={element.id} element={element}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  {element.content || 'Button'}
                </button>
              </DraggableElement>
            );
          default:
            return null;
        }
      })}
    </motion.div>
  );
};

export default Canvas;