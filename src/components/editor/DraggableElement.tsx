import React from 'react';

interface DraggableElementProps {
  elementType: string;
  children: React.ReactNode;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ elementType, children }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/reactflow', elementType);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div draggable onDragStart={handleDragStart}>
      {children}
    </div>
  );
};

export default DraggableElement;