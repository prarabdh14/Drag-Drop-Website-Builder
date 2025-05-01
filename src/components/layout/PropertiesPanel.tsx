import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { ELEMENT_TYPES } from '../../constants/elementTypes';

const PropertiesPanel: React.FC = () => {
  const { selectedElement, updateElement } = useEditor();

  if (!selectedElement) return null;

  const handleStyleChange = (property: string, value: string) => {
    updateElement(selectedElement.id, {
      ...selectedElement,
      styles: {
        ...selectedElement.styles,
        [property]: value
      }
    });
  };

  const handleContentChange = (content: string) => {
    updateElement(selectedElement.id, {
      ...selectedElement,
      content
    });
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      <div className="space-y-4">
        {selectedElement.type === ELEMENT_TYPES.HEADING && (
          <div>
            <label className="block text-sm font-medium mb-1">Text</label>
            <input
              type="text"
              value={selectedElement.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full px-2 py-1 bg-gray-700 rounded text-white"
            />
          </div>
        )}

        {selectedElement.type === ELEMENT_TYPES.TEXT && (
          <div>
            <label className="block text-sm font-medium mb-1">Text</label>
            <textarea
              value={selectedElement.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full px-2 py-1 bg-gray-700 rounded text-white"
              rows={3}
            />
          </div>
        )}

        {selectedElement.type === ELEMENT_TYPES.IMAGE && (
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              value={selectedElement.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full px-2 py-1 bg-gray-700 rounded text-white"
            />
          </div>
        )}

        {selectedElement.type === ELEMENT_TYPES.BUTTON && (
          <div>
            <label className="block text-sm font-medium mb-1">Button Text</label>
            <input
              type="text"
              value={selectedElement.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full px-2 py-1 bg-gray-700 rounded text-white"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Width</label>
          <input
            type="text"
            value={selectedElement.styles?.width || ''}
            onChange={(e) => handleStyleChange('width', e.target.value)}
            className="w-full px-2 py-1 bg-gray-700 rounded text-white"
            placeholder="e.g., 100px, 50%"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Background Color</label>
          <input
            type="color"
            value={selectedElement.styles?.backgroundColor || '#ffffff'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="w-full h-8 bg-gray-700 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Text Color</label>
          <input
            type="color"
            value={selectedElement.styles?.color || '#000000'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className="w-full h-8 bg-gray-700 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Font Size</label>
          <input
            type="text"
            value={selectedElement.styles?.fontSize || ''}
            onChange={(e) => handleStyleChange('fontSize', e.target.value)}
            className="w-full px-2 py-1 bg-gray-700 rounded text-white"
            placeholder="e.g., 16px, 1rem"
          />
      </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;