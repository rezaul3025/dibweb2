import React from 'react';
import { ArrowDownTrayIcon, DocumentIcon, DocumentTextIcon, PhotoIcon, MusicalNoteIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

const DownloadItem = ({
  name,
  type,
  size,
  date,
  url
}) => {
  // Get icon based on file type
  const getFileIcon = () => {
    switch(type) {
      case 'pdf':
        return <DocumentTextIcon className="h-6 w-6 text-green-500" />;
      case 'image':
        return <PhotoIcon className="h-6 w-6 text-blue-500" />;
      case 'audio':
        return <MusicalNoteIcon className="h-6 w-6 text-purple-500" />;
      case 'video':
        return <VideoCameraIcon className="h-6 w-6 text-green-500" />;
      default:
        return <DocumentIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center space-x-4 min-w-0">
        <div className="flex-shrink-0">
          {getFileIcon()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
          <p className="text-xs text-gray-500">{size} • {date}</p>
        </div>
      </div>
      <a
        href={url}
        target="_blank"
        className="ml-4 flex-shrink-0 p-2 text-gray-400 hover:text-green-500 hover:bg-indigo-50 rounded-full transition-colors duration-150"
        aria-label={`Download ${name}`}
      >
        <ArrowDownTrayIcon className="h-5 w-5" />
      </a>
    </div>
  );
};

export default DownloadItem;