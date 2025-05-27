import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { FiChevronLeft, FiChevronRight, FiZoomIn, FiZoomOut, FiDownload } from 'react-icons/fi';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


const PDFPreview = ({ file, showControls = true, onDownload }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => (prevPageNumber || 1) + offset);
  }

  function changeScale(newScale) {
    setScale(Math.max(0.5, Math.min(newScale, 2)));
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      {/* PDF Viewer */}
      <div className="relative bg-gray-50 min-h-[300px] flex items-center justify-center">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-gray-500">Loading PDF...</div>}
          error={<div className="text-red-500 p-4">Failed to load PDF</div>}
          noData={<div className="text-gray-500 p-4">No PDF file specified</div>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={<div className="text-gray-500">Loading page...</div>}
            className="shadow-sm"
          />
        </Document>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-between p-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              className={`p-2 rounded-md ${pageNumber <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              aria-label="Previous page"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm text-gray-700">
              Page {pageNumber || '--'} of {numPages || '--'}
            </span>

            <button
              onClick={() => changePage(1)}
              disabled={!!(numPages && pageNumber >= numPages)}
              className={`p-2 rounded-md ${numPages && pageNumber >= numPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              aria-label="Next page"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => changeScale(scale - 0.1)}
              disabled={scale <= 0.5}
              className={`p-2 rounded-md ${scale <= 0.5 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              aria-label="Zoom out"
            >
              <FiZoomOut className="w-5 h-5" />
            </button>

            <span className="text-sm text-gray-700">{Math.round(scale * 100)}%</span>

            <button
              onClick={() => changeScale(scale + 0.1)}
              disabled={scale >= 2}
              className={`p-2 rounded-md ${scale >= 2 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              aria-label="Zoom in"
            >
              <FiZoomIn className="w-5 h-5" />
            </button>
          </div>

          {onDownload && (
            <button
              onClick={onDownload}
              className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-md"
              aria-label="Download"
            >
              <FiDownload className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFPreview;