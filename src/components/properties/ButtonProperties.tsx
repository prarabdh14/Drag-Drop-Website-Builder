import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { Square, Palette } from 'lucide-react';

const ButtonProperties = () => {
  const { selectedElement, updateElement } = useEditor();

  if (!selectedElement) return null;

  const { content = '', styles = {} } = selectedElement;
  const {
    backgroundColor = '#3B82F6',
    color = '#FFFFFF',
    borderRadius = '0.25rem',
    padding = '0.5rem 1rem',
  } = styles;

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(selectedElement.id, {
      ...selectedElement,
      content: e.target.value
    });
  };

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
    <div className="space-y-6">
      <div>
        <label htmlFor="buttonText" className="block text-xs text-gray-500 mb-1">
          Button Text
        </label>
        <input
          type="text"
          id="buttonText"
          value={content}
          onChange={handleContentChange}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>

      <h3 className="text-sm font-medium text-gray-700 flex items-center">
        <Palette size={16} className="mr-1.5" /> Appearance
      </h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="backgroundColor" className="block text-xs text-gray-500 mb-1">
            Background Color
          </label>
          <input
            type="color"
            id="backgroundColor"
            value={backgroundColor}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm h-8"
          />
        </div>
        <div>
          <label htmlFor="color" className="block text-xs text-gray-500 mb-1">
            Text Color
          </label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm h-8"
          />
        </div>
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
            <option value="0.25rem 0.5rem">Small</option>
            <option value="0.5rem 1rem">Medium</option>
            <option value="0.75rem 1.5rem">Large</option>
          </select>
        </div>
        <div>
          <label htmlFor="borderRadius" className="block text-xs text-gray-500 mb-1">
            Border Radius
          </label>
          <select
            id="borderRadius"
            value={borderRadius}
            onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="0">None</option>
            <option value="0.25rem">Small</option>
            <option value="0.5rem">Medium</option>
            <option value="9999px">Rounded</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ButtonProperties;