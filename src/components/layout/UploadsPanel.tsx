import React, { useState } from 'react';
import { Upload, Image, Film, X } from 'lucide-react';

interface UploadedFile {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
  thumbnail?: string;
}

const UploadsPanel: React.FC = () => {
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = async (files: FileList) => {
    const newUploads: UploadedFile[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) continue;

      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      const fileUrl = URL.createObjectURL(file);
      
      // Create thumbnail for video
      let thumbnail = fileUrl;
      if (fileType === 'video') {
        const video = document.createElement('video');
        video.src = fileUrl;
        await new Promise((resolve) => {
          video.addEventListener('loadeddata', () => {
            video.currentTime = 1; // Set to 1 second to avoid black frame
          });
          video.addEventListener('seeked', resolve);
        });
        
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0);
        thumbnail = canvas.toDataURL();
      }

      newUploads.push({
        id: Math.random().toString(36).substr(2, 9),
        type: fileType,
        url: fileUrl,
        name: file.name,
        thumbnail: fileType === 'video' ? thumbnail : undefined
      });
    }

    setUploads([...uploads, ...newUploads]);
  };

  const handleDragStart = (e: React.DragEvent, upload: UploadedFile) => {
    e.dataTransfer.setData('elementType', upload.type === 'image' ? 'image' : 'video');
    e.dataTransfer.setData('mediaUrl', upload.url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const removeUpload = (id: string) => {
    setUploads(uploads.filter(upload => upload.id !== id));
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-600'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto mb-2 text-gray-400" size={24} />
        <p className="text-sm text-gray-400">
          Drag & drop files here or{' '}
          <label className="text-blue-500 cursor-pointer hover:text-blue-400">
            browse
            <input
              type="file"
              className="hidden"
              accept="image/*,video/*"
              multiple
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            />
          </label>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="group relative bg-gray-700 rounded-lg overflow-hidden cursor-move"
            draggable
            onDragStart={(e) => handleDragStart(e, upload)}
          >
            {upload.type === 'image' ? (
              <img
                src={upload.url}
                alt={upload.name}
                className="w-full h-24 object-cover"
              />
            ) : (
              <div className="relative w-full h-24">
                <img
                  src={upload.thumbnail}
                  alt={upload.name}
                  className="w-full h-full object-cover"
                />
                <Film className="absolute inset-0 m-auto text-white/80" size={24} />
              </div>
            )}
            <button
              onClick={() => removeUpload(upload.id)}
              className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} className="text-white" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
              <p className="text-xs text-white truncate">{upload.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadsPanel; 