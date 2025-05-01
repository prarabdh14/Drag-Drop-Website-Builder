import React from 'react';
import Editor from './components/Editor';
import { EditorProvider } from './context/EditorContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EditorProvider>
        <Editor />
      </EditorProvider>
    </div>
  );
}

export default App;