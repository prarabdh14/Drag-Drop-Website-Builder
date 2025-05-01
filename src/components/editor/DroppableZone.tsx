import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { motion } from 'framer-motion';

interface DroppableZoneProps {
  isRoot?: boolean;
  id: string;
  children: React.ReactNode;
}

const DroppableZone: React.FC<DroppableZoneProps> = ({ isRoot = false, id, children }) => {
  const { addElement, previewMode } = useEditor();
  const [isOver, setIsOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    
    const elementType = e.dataTransfer.getData('application/reactflow');
    if (elementType) {
      const rect = e.currentTarget.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      
      addElement(elementType, id, position);
    }
  };

  // Don't show drop effects in preview mode
  if (previewMode === 'preview') {
    return <div className={isRoot ? 'min-h-full' : ''}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative ${isRoot ? 'min-h-full' : ''} ${isOver ? 'bg-blue-50' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      animate={{
        backgroundColor: isOver ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
        borderWidth: isOver ? '2px' : '0px',
        borderStyle: 'dashed',
        borderColor: 'rgba(59, 130, 246, 0.5)'
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default DroppableZone;