import React from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import Canvas from './layout/Canvas';
import PropertiesPanel from './layout/PropertiesPanel';
import { useEditor } from '../context/EditorContext';

const Editor = () => {
  const { selectedElement } = useEditor();

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