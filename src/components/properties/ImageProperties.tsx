import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { Image, Crop } from 'lucide-react';

const ImageProperties = () => {
  const { selectedElement, updateElement } = useEditor();

  if (!selectedElement) return null;

  const { content = '', styles = {} } = selectedElement;
  const {
    objectFit = 'cover',
    borderRadius = '0',
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
        <label htmlFor="imageUrl" className="block text-xs text-gray-500 mb-1">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          value={content}
          onChange={handleContentChange}
          placeholder="https://example.com/image.jpg"
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        />
        {content && (
          <div className="mt-2 rounded border border-gray-200 overflow-hidden h-20">
            <img 
              src={content} 
              alt="Preview" 
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
              }}
            />
          </div>
        )}
      </div>

      <h3 className="text-sm font-medium text-gray-700 flex items-center">
        <Image size={16} className="mr-1.5" /> Image Properties
      </h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="objectFit" className="block text-xs text-gray-500 mb-1">
            Object Fit
          </label>
          <select
            id="objectFit"
            value={objectFit}
            onChange={(e) => handleStyleChange('objectFit', e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
            <option value="fill">Fill</option>
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
            <option value="9999px">Round</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ImageProperties;