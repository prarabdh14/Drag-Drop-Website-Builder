import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { ELEMENT_TYPES } from '../../constants/elementTypes';
import { DEVICE_SIZES, DeviceType } from '../../constants/deviceSizes';
import { Move } from 'lucide-react';

interface CanvasProps {
  selectedDevice: DeviceType;
}

const Canvas: React.FC<CanvasProps> = ({ selectedDevice }) => {
  const { elements, addElement, selectedElement, setSelectedElement, updateElement } = useEditor();
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [draggedElementId, setDraggedElementId] = React.useState<string | null>(null);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);

    // If we're dragging an existing element
    if (draggedElementId) {
      const canvas = e.currentTarget;
      const rect = canvas.getBoundingClientRect();
      const scale = selectedDevice === 'desktop' ? 1 : 0.8;
      
      const x = (e.clientX - rect.left) / scale - dragOffset.x;
      const y = (e.clientY - rect.top) / scale - dragOffset.y;

      updateElement(draggedElementId, {
        position: { x, y }
      });
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setDraggedElementId(null);
    
    // Only handle new element drops here
    if (!draggedElementId) {
      const elementType = e.dataTransfer.getData('elementType');
      if (!elementType) return;

      const canvas = e.currentTarget;
      const rect = canvas.getBoundingClientRect();
      const scale = selectedDevice === 'desktop' ? 1 : 0.8;
      
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;
      
      const mediaUrl = e.dataTransfer.getData('mediaUrl');
      let defaultStyles = {};

      // Set default styles based on element type
      switch (elementType) {
        case ELEMENT_TYPES.HEADING:
          defaultStyles = {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#000000',
          };
          break;
        case ELEMENT_TYPES.TEXT:
          defaultStyles = {
            fontSize: '1rem',
            color: '#000000',
          };
          break;
        case ELEMENT_TYPES.IMAGE:
          defaultStyles = {
            width: '300px',
            height: 'auto',
            objectFit: 'contain',
          };
          break;
        case ELEMENT_TYPES.BUTTON:
          defaultStyles = {
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3B82F6',
            color: '#FFFFFF',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            cursor: 'pointer',
          };
          break;
      }

      // If it's a media element from uploads
      if (mediaUrl) {
        if (elementType === 'image') {
          defaultStyles = {
            width: '300px',
            height: 'auto',
            objectFit: 'contain',
          };
        } else if (elementType === 'video') {
          defaultStyles = {
            width: '400px',
            height: 'auto',
          };
        }
      }
      
      addElement(elementType, 'root', { x, y }, mediaUrl || '', defaultStyles);
    }
  };

  const handleElementDragStart = (e: React.DragEvent, element: any) => {
    e.stopPropagation();
    setDraggedElementId(element.id);
    
    // Calculate offset from the element's top-left corner
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const scale = selectedDevice === 'desktop' ? 1 : 0.8;
    setDragOffset({
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale
    });

    // Set a transparent drag image
    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const deviceSize = DEVICE_SIZES[selectedDevice];
  const scale = selectedDevice === 'desktop' ? 1 : 0.8;

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 overflow-auto p-8">
      <div
        className="bg-white shadow-2xl"
        style={{
          width: deviceSize.width,
          height: deviceSize.height,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        <div
          id="canvas"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full h-full overflow-auto ${
            isDragOver ? 'bg-blue-50' : 'bg-white'
          }`}
          onClick={() => setSelectedElement(null)}
        >
          {elements.map((element) => (
            <div
              key={element.id}
              draggable
              onDragStart={(e) => handleElementDragStart(e, element)}
              className={`absolute group ${
                selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                left: `${element.position.x}px`,
                top: `${element.position.y}px`,
                cursor: 'move',
                ...element.styles
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedElement(element);
              }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <Move size={12} className="inline-block mr-1" />
                Drag to move
              </div>
              {element.type === 'video' ? (
                <video
                  src={element.content}
                  controls
                  style={element.styles}
                />
              ) : element.type === 'image' ? (
                <img
                  src={element.content}
                  alt="Uploaded content"
                  style={element.styles}
                />
              ) : (
                element.content
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Canvas;