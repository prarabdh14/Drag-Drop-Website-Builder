import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { Palette, Maximize, Move } from 'lucide-react';

const CommonProperties = () => {
  const { selectedElement, updateElement } = useEditor();

  if (!selectedElement) return null;

  const { styles = {} } = selectedElement;
  const {
    margin = '0',
    padding = '0',
    width = 'auto',
  } = styles;

  const handleStyleChange = (property: string, value: string) => {
    updateElement(selectedElement.id, {
      ...selectedElement,
      styles: {
        ...selectedElement.styles,
        [property]: value
      }
    });
  };

  return (
    <div className="space-y-6 pt-4 border-t border-gray-200 mt-4">
      <h3 className="text-sm font-medium text-gray-700 flex items-center">
        <Maximize size={16} className="mr-1.5" /> Sizing
      </h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="width" className="block text-xs text-gray-500 mb-1">
            Width
          </label>
          <select
            id="width"
            value={width}
            onChange={(e) => handleStyleChange('width', e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="auto">Auto</option>
            <option value="100%">Full Width</option>
            <option value="75%">75%</option>
            <option value="50%">50%</option>
            <option value="25%">25%</option>
          </select>
        </div>
      </div>

      <h3 className="text-sm font-medium text-gray-700 flex items-center">
        <Move size={16} className="mr-1.5" /> Spacing
      </h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="padding" className="block text-xs text-gray-500 mb-1">
            Padding
          </label>
          <select
            id="padding"
            value={padding}
            onChange={(e) => handleStyleChange('padding', e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="0">None</option>
            <option value="0.5rem">Small</option>
            <option value="1rem">Medium</option>
            <option value="2rem">Large</option>
          </select>
        </div>
        <div>
          <label htmlFor="margin" className="block text-xs text-gray-500 mb-1">
            Margin
          </label>
          <select
            id="margin"
            value={margin}
            onChange={(e) => handleStyleChange('margin', e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="0">None</option>
            <option value="0.5rem">Small</option>
            <option value="1rem">Medium</option>
            <option value="2rem">Large</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CommonProperties;