import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { ELEMENT_TYPES } from '../../constants/elementTypes';
import { Heading, Text, Image, Square } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { addElement } = useEditor();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, type: string) => {
    e.dataTransfer.setData('elementType', type);
  };

  const elements = [
    { type: ELEMENT_TYPES.HEADING, icon: <Heading size={20} />, label: 'Heading' },
    { type: ELEMENT_TYPES.TEXT, icon: <Text size={20} />, label: 'Text' },
    { type: ELEMENT_TYPES.IMAGE, icon: <Image size={20} />, label: 'Image' },
    { type: ELEMENT_TYPES.BUTTON, icon: <Square size={20} />, label: 'Button' }
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Elements</h2>
      <div className="space-y-2">
        {elements.map(({ type, icon, label }) => (
          <div
            key={type}
            draggable
            onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, type)}
            className="flex items-center gap-2 p-2 bg-gray-700 rounded cursor-move hover:bg-gray-600 transition-transform hover:scale-105 active:scale-95"
          >
            {icon}
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;