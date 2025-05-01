import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import { ELEMENT_TYPES } from '../../constants/elementTypes';
import { Heading, Text, Image, Square, LayoutGrid, Upload } from 'lucide-react';
import UploadsPanel from './UploadsPanel';

type TabType = 'elements' | 'uploads';

const Sidebar: React.FC = () => {
  const { addElement } = useEditor();
  const [activeTab, setActiveTab] = useState<TabType>('elements');

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, type: string) => {
    e.dataTransfer.setData('elementType', type);
  };

  const elements = [
    { type: ELEMENT_TYPES.HEADING, icon: <Heading size={20} />, label: 'Heading' },
    { type: ELEMENT_TYPES.TEXT, icon: <Text size={20} />, label: 'Text' },
    { type: ELEMENT_TYPES.IMAGE, icon: <Image size={20} />, label: 'Image' },
    { type: ELEMENT_TYPES.BUTTON, icon: <Square size={20} />, label: 'Button' }
  ];

  const tabs = [
    { id: 'elements', icon: <LayoutGrid size={20} />, label: 'Elements' },
    { id: 'uploads', icon: <Upload size={20} />, label: 'Uploads' }
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex-1 flex items-center justify-center gap-2 p-4 transition-colors ${
              activeTab === tab.id
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {tab.icon}
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'elements' && (
          <div className="space-y-2">
            {elements.map(({ type, icon, label }) => (
              <div
                key={type}
                draggable
                onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
                  handleDragStart(e, type)
                }
                className="flex items-center gap-2 p-2 bg-gray-700 rounded cursor-move hover:bg-gray-600 transition-transform hover:scale-105 active:scale-95"
              >
                {icon}
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'uploads' && <UploadsPanel />}
      </div>
    </div>
  );
};

export default Sidebar;