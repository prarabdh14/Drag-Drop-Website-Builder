import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import Canvas from './layout/Canvas';
import PropertiesPanel from './layout/PropertiesPanel';
import { useEditor } from '../context/EditorContext';
import { ELEMENT_TYPES } from '../constants/elementTypes';

const Editor = () => {
  const { selectedElement, addElement } = useEditor();
  const location = useLocation();
  const { templateId, formData } = location.state || {};

  useEffect(() => {
    if (templateId && formData) {
      // Initialize template based on selection
      const templateElements = getTemplateElements(templateId, formData);
      templateElements.forEach(element => {
        addElement(element.type, 'root', element.position);
      });
    }
  }, [templateId, formData, addElement]);

  const getTemplateElements = (templateId: string, formData: any) => {
    // This would be replaced with actual template data
    switch (templateId) {
      case 'ecommerce-modern-blue':
        return [
          {
            type: ELEMENT_TYPES.HEADING,
            position: { x: 100, y: 50 },
            content: 'Welcome to Our Store',
            styles: {
              fontSize: '36px',
              color: '#3B82F6',
              textAlign: 'center'
            }
          },
          {
            type: ELEMENT_TYPES.TEXT,
            position: { x: 100, y: 120 },
            content: 'Discover our amazing products',
            styles: {
              fontSize: '18px',
              color: '#4B5563',
              textAlign: 'center'
            }
          }
        ];
      // Add more template cases here
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Canvas />
        {selectedElement && <PropertiesPanel />}
      </div>
    </div>
  );
};

export default Editor;