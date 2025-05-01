import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { Undo, Redo, Save, Laptop, Tablet, Smartphone, Eye, Code } from 'lucide-react';

const Header = () => {
  const { undo, redo, canUndo, canRedo, previewMode, setPreviewMode, viewportSize, setViewportSize } = useEditor();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600 mr-6">Website Builder</h1>
          <div className="flex space-x-1">
            <button 
              onClick={undo} 
              disabled={!canUndo}
              className={`p-1.5 rounded ${canUndo ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400'}`}
              title="Undo"
            >
              <Undo size={18} />
            </button>
            <button 
              onClick={redo} 
              disabled={!canRedo}
              className={`p-1.5 rounded ${canRedo ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400'}`}
              title="Redo"
            >
              <Redo size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex border rounded overflow-hidden">
            <button 
              onClick={() => setViewportSize('desktop')}
              className={`p-1.5 ${viewportSize === 'desktop' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              title="Desktop view"
            >
              <Laptop size={18} />
            </button>
            <button 
              onClick={() => setViewportSize('tablet')}
              className={`p-1.5 ${viewportSize === 'tablet' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              title="Tablet view"
            >
              <Tablet size={18} />
            </button>
            <button 
              onClick={() => setViewportSize('mobile')}
              className={`p-1.5 ${viewportSize === 'mobile' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              title="Mobile view"
            >
              <Smartphone size={18} />
            </button>
          </div>

          <div className="flex border rounded overflow-hidden">
            <button 
              onClick={() => setPreviewMode('design')}
              className={`px-3 py-1.5 text-sm ${previewMode === 'design' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Design
            </button>
            <button 
              onClick={() => setPreviewMode('preview')}
              className={`px-3 py-1.5 text-sm flex items-center ${previewMode === 'preview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Eye size={14} className="mr-1" /> Preview
            </button>
            <button 
              onClick={() => setPreviewMode('code')}
              className={`px-3 py-1.5 text-sm flex items-center ${previewMode === 'code' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Code size={14} className="mr-1" /> Code
            </button>
          </div>
          
          <button className="ml-2 bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center hover:bg-blue-700 transition-colors">
            <Save size={14} className="mr-1.5" /> Save
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;