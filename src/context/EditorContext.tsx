import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ElementType, Position } from '../types/editor';
import { ELEMENT_TYPES } from '../constants/elementTypes';

interface Styles {
  [key: string]: string;
}

interface EditorContextProps {
  elements: ElementType[];
  selectedElement: ElementType | null;
  previewMode: 'design' | 'preview' | 'code';
  viewportSize: 'mobile' | 'tablet' | 'desktop';
  canUndo: boolean;
  canRedo: boolean;
  draggedElement: ElementType | null;
  dropTarget: string | null;
  addElement: (type: string, containerId: string, position: Position, content?: string, styles?: Styles) => void;
  updateElement: (id: string, element: Partial<ElementType>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string) => void;
  deselectElement: () => void;
  undo: () => void;
  redo: () => void;
  setPreviewMode: (mode: 'design' | 'preview' | 'code') => void;
  setViewportSize: (size: 'mobile' | 'tablet' | 'desktop') => void;
  startDrag: (element: ElementType) => void;
  endDrag: () => void;
  setDropTarget: (targetId: string | null) => void;
  moveElement: (elementId: string, newPosition: Position, newContainerId?: string) => void;
  setSelectedElement: (element: ElementType | null) => void;
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

interface EditorProviderProps {
  children: React.ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'design' | 'preview' | 'code'>('design');
  const [viewportSize, setViewportSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [history, setHistory] = useState<ElementType[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [draggedElement, setDraggedElement] = useState<ElementType | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);

  // Add element to the history stack
  const addToHistory = useCallback((newElements: ElementType[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newElements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Create a default element based on type
  const createDefaultElement = (type: string, position: Position): ElementType => {
    const defaultProps = {
      id: uuidv4(),
      type,
      position,
    };

    switch (type) {
      case ELEMENT_TYPES.HEADING:
        return {
          ...defaultProps,
          content: 'Welcome to Your Website',
          styles: {
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'left',
            color: '#000000',
          },
        };
      case ELEMENT_TYPES.TEXT:
        return {
          ...defaultProps,
          content: 'Add your content here. This is a paragraph block where you can write text, descriptions, or any other information you want to share with your visitors.',
          styles: {
            fontSize: '1rem',
            textAlign: 'left',
            color: '#000000',
          },
        };
      case ELEMENT_TYPES.IMAGE:
        return {
          ...defaultProps,
          content: 'https://images.unsplash.com/photo-1706880464294-480ff57b5e4e?q=80&w=1000&auto=format&fit=crop',
          styles: {
            width: '300px',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        };
      case ELEMENT_TYPES.BUTTON:
        return {
          ...defaultProps,
          content: 'Click Me',
          styles: {
            backgroundColor: '#3B82F6',
            color: '#FFFFFF',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            fontWeight: 'medium',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        };
      case ELEMENT_TYPES.HEADER:
        return {
          ...defaultProps,
          content: '',
          styles: {
            width: '100%',
            height: '80px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E5E7EB',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: '10',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          },
        };
      case ELEMENT_TYPES.FOOTER:
        return {
          ...defaultProps,
          content: '',
          styles: {
            width: '100%',
            backgroundColor: '#1F2937',
            color: '#FFFFFF',
            padding: '2rem',
            marginTop: 'auto',
            position: 'relative',
            zIndex: '10',
          },
        };
      case ELEMENT_TYPES.SECTION:
        return {
          ...defaultProps,
          content: '',
          styles: {
            width: '100%',
            minHeight: '400px',
            backgroundColor: '#FFFFFF',
            padding: '2rem',
            position: 'relative',
          },
        };
      case ELEMENT_TYPES.BACKGROUND:
        return {
          ...defaultProps,
          content: '',
          styles: {
            backgroundColor: '#FFFFFF',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: '-1',
          },
        };
      default:
        return {
          ...defaultProps,
          content: 'Unknown Element',
        };
    }
  };

  // Add new element
  const addElement = useCallback((
    type: string,
    containerId: string,
    position: Position,
    content: string = '',
    styles: Styles = {}
  ) => {
    const newElement: ElementType = {
      id: uuidv4(),
      type,
      position,
      content,
      styles,
      containerId
    };
    setElements(prev => [...prev, newElement]);
    setSelectedElementId(newElement.id);
    addToHistory([...elements, newElement]);
  }, [elements, addToHistory]);

  // Update element
  const updateElement = useCallback((id: string, element: Partial<ElementType>) => {
    setElements(prev =>
      prev.map(el => (el.id === id ? { ...el, ...element } : el))
    );
    addToHistory(elements.map(el => el.id === id ? { ...el, ...element } : el));
  }, [elements, addToHistory]);

  // Delete element
  const deleteElement = useCallback((id: string) => {
    const newElements = elements.filter(element => element.id !== id);
    setElements(newElements);
    setSelectedElementId(null);
    addToHistory(newElements);
  }, [elements, addToHistory]);

  // Select element
  const selectElement = useCallback((id: string) => {
    setSelectedElementId(id);
  }, []);

  // Deselect element
  const deselectElement = useCallback(() => {
    setSelectedElementId(null);
  }, []);

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  // Get selected element
  const selectedElement = elements.find(element => element.id === selectedElementId) || null;

  // Check if undo/redo are available
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Reset selected element in preview mode
  useEffect(() => {
    if (previewMode === 'preview') {
      setSelectedElementId(null);
    }
  }, [previewMode]);

  const startDrag = useCallback((element: ElementType) => {
    setDraggedElement(element);
  }, []);

  const endDrag = useCallback(() => {
    setDraggedElement(null);
    setDropTarget(null);
  }, []);

  const moveElement = useCallback((elementId: string, newPosition: Position, newContainerId?: string) => {
    setElements(prevElements => {
      const newElements = prevElements.map(element => {
        if (element.id === elementId) {
          return {
            ...element,
            position: newPosition,
            containerId: newContainerId || element.containerId
          };
        }
        return element;
      });
      addToHistory(newElements);
      return newElements;
    });
  }, [addToHistory]);

  const setSelectedElement = useCallback((element: ElementType | null) => {
    setSelectedElementId(element?.id || null);
  }, []);

  const value = {
    elements,
    selectedElement: selectedElementId ? elements.find(el => el.id === selectedElementId) || null : null,
    previewMode,
    viewportSize,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    draggedElement,
    dropTarget,
    addElement,
    updateElement,
    deleteElement,
    selectElement,
    deselectElement,
    undo,
    redo,
    setPreviewMode,
    setViewportSize,
    startDrag,
    endDrag,
    setDropTarget,
    moveElement,
    setSelectedElement
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

export const useEditor = (): EditorContextProps => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

export type { Styles };