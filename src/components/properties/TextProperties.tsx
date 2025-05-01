import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const TextProperties = () => {
  const { selectedElement, updateElement } = useEditor();

  if (!selectedElement) return null;

  const { content = '', styles = {} } = selectedElement;
  const {
    fontSize = '1rem',
    fontWeight = 'normal',
    textAlign = 'left',
    color = '#000000',
  } = styles;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <label htmlFor="content" className="block text-xs text-gray-500 mb-1">
          Text Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          rows={3}
        />
      </div>

      <h3 className="text-sm font-medium text-gray-700 flex items-center">
        <Type size={16} className="mr-1.5" /> Typography
      </h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="fontSize" className="block text-xs text-gray-500 mb-1">
            Font Size
          </label>
          <select
            id="fontSize"
            value={fontSize}
            onChange={(e) => handleStyleChange('fontSize', e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="0.875rem">Small</option>
            <option value="1rem">Medium</option>
            <option value="1.25rem">Large</option>
            <option value="1.5rem">X-Large</option>
            <option value="2rem">XX-Large</option>
          </select>
        </div>
        <div>
          <label htmlFor="fontWeight" className="block text-xs text-gray-500 mb-1">
            Font Weight
          </label>
          <select
            id="fontWeight"
            value={fontWeight}
            onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="bold">Bold</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Text Alignment
          </label>
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <button
              className={`flex-1 py-1 ${textAlign === 'left' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              onClick={() => handleStyleChange('textAlign', 'left')}
            >
              <AlignLeft size={16} className="mx-auto" />
            </button>
            <button
              className={`flex-1 py-1 ${textAlign === 'center' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              onClick={() => handleStyleChange('textAlign', 'center')}
            >
              <AlignCenter size={16} className="mx-auto" />
            </button>
            <button
              className={`flex-1 py-1 ${textAlign === 'right' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              onClick={() => handleStyleChange('textAlign', 'right')}
            >
              <AlignRight size={16} className="mx-auto" />
            </button>
          </div>
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
      </div>
    </div>
  );
};

export default TextProperties;