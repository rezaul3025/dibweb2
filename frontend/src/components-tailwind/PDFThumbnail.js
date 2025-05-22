import React, { useState } from 'react';
import { FiFileText, FiEye, FiDownload, FiX } from 'react-icons/fi';

const PDFThumbnail = ({
  title,
  description = 'PDF Document',
  size = '2.4 MB',
  lastModified = 'May 15, 2023',
  thumbnailUrl,
  onView,
  onDownload
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="w-full sm:w-64 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      {/* Thumbnail */}
      <div className="relative h-40 bg-gray-100 flex items-center justify-center">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="object-cover h-full w-full"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <FiFileText className="w-12 h-12" />
            <span className="mt-2 text-sm">PDF Preview</span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
          <button
            onClick={() => setShowDetails(true)}
            className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-50 shadow-sm"
            aria-label="View details"
          >
            <FiEye className="w-5 h-5" />
          </button>
          {onDownload && (
            <button
              onClick={onDownload}
              className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-50 shadow-sm"
              aria-label="Download"
            >
              <FiDownload className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs text-gray-400">{size}</span>
          <button
            onClick={() => setShowDetails(true)}
            className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Thumbnail Preview */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt={title}
                        className="object-contain h-full w-full"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <FiFileText className="w-16 h-16" />
                        <span className="mt-2 text-sm">PDF Document</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Document Details */}
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Description</h4>
                      <p className="text-gray-600 mt-1">{description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900">File Size</h4>
                        <p className="text-gray-600 mt-1">{size}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Last Modified</h4>
                        <p className="text-gray-600 mt-1">{lastModified}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900">Actions</h4>
                      <div className="flex gap-3 mt-3">
                        {onView && (
                          <button
                            onClick={() => {
                              onView();
                              setShowDetails(false);
                            }}
                            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            View Full PDF
                          </button>
                        )}
                        {onDownload && (
                          <button
                            onClick={() => {
                              onDownload();
                              setShowDetails(false);
                            }}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          >
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Usage Example
{/*const PDFGallery = () => {
  const pdfFiles = [
    {
      title: 'Annual Report 2023',
      description: 'Company financial performance overview',
      size: '4.2 MB',
      lastModified: 'Jan 10, 2024',
      thumbnailUrl: '/pdf-thumbnails/report-2023.jpg'
    },
    {
      title: 'User Manual',
      description: 'Product usage instructions',
      size: '1.8 MB',
      lastModified: 'Mar 5, 2024'
    }
  ];

  const handleView = (title) => {
    console.log(`Viewing: ${title}`);
    // Implement PDF viewer logic
  };

  const handleDownload = (title) => {
    console.log(`Downloading: ${title}`);
    // Implement download logic
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">PDF Documents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pdfFiles.map((pdf, index) => (
          <PDFThumbnail
            key={index}
            title={pdf.title}
            description={pdf.description}
            size={pdf.size}
            lastModified={pdf.lastModified}
            thumbnailUrl={pdf.thumbnailUrl}
            onView={() => handleView(pdf.title)}
            onDownload={() => handleDownload(pdf.title)}
          />
        ))}
      </div>
    </div>
  );
}; */}

export default PDFThumbnail;