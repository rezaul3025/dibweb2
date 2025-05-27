import React,{ useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF worker (use your actual pdfjs-dist version)
pdfjs.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFPreview() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Responsive scaling adjustments
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen">
      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 w-full">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {pageNumber} of {numPages || '--'}
          </span>

          <button
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || 1))}
            disabled={pageNumber >= (numPages || 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            -
          </button>
          <span className="text-sm text-gray-600">{Math.round(scale * 100)}%</span>
          <button
            onClick={handleZoomIn}
            disabled={scale >= 2.5}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            +
          </button>
        </div>
      </div>

      {/* PDF Container */}
      <div className="w-full max-w-4xl overflow-auto border border-gray-200 shadow-lg rounded-lg bg-white">
        <Document
          file="/sample.pdf" // Replace with your PDF path/URL
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="p-8 text-center">Loading PDF...</div>}
          error={<div className="p-8 text-center text-red-500">Failed to load PDF</div>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            width={Math.min(800 * scale, window.innerWidth - 40)} // Responsive width
            className="mx-auto"
            renderTextLayer={true}
            loading={<div className="p-8">Loading page...</div>}
          />
        </Document>
      </div>

      {/* Mobile-friendly tips */}
      <p className="mt-4 text-sm text-gray-500 md:hidden">
        Pinch to zoom on mobile devices
      </p>
    </div>
  );
}