import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EditorProvider } from './context/EditorContext';
import LandingPage from './components/landing/LandingPage';
import TemplateSelection from './components/templates/TemplateSelection';
import Editor from './components/Editor';

function App() {
  return (
    <Router>
      <EditorProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<TemplateSelection />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </EditorProvider>
    </Router>
  );
}

export default App;