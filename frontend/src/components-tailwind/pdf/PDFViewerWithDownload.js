import React,{ useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {ArrowDownTrayIcon, DocumentTextIcon} from "@heroicons/react/24/outline";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PDFViewerWithDownload({file, doc_name, doc_size}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const pdfContainerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Zoom controls
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

  // Download PDF
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file; // Replace with your PDF path
    link.download = 'document.pdf'; // Custom filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50">
      {/* Header with title and download */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-4">
        <div className="flex items-center" title="Download">
              <DocumentTextIcon className="h-5 w-5 text-green-500 mr-3"/>
              <div>
                  <p className="text-sm font-medium text-gray-800">{doc_name}</p>
                  <p className="text-xs text-gray-500">{doc_size}</p>
              </div>
          </div>
        <button className="text-green-500 hover:text-green-700" onClick={handleDownload} title="Download">
          <ArrowDownTrayIcon className="h-5 w-5"/>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-4 w-full max-w-6xl">
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
          <button
              onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
              disabled={pageNumber <= 1}
              className="px-3 py-1 bg-green-100 text-green-500 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-gray-700 text-sm">
            Page {pageNumber} of {numPages || '--'}
          </span>
          
          <button 
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || 1))}
            disabled={pageNumber >= (numPages || 1)}
            className="px-3 py-1 bg-green-100 text-green-500 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
          <button 
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded disabled:opacity-50"
          >
            -
          </button>
          <span className="text-sm text-gray-600 w-12 text-center">{Math.round(scale * 100)}%</span>
          <button 
            onClick={handleZoomIn}
            disabled={scale >= 2.5}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded disabled:opacity-50"
          >
            +
          </button>
        </div>
      </div>

      {/* PDF Container */}
      <div 
        ref={pdfContainerRef}
        className="w-full max-w-6xl overflow-auto border border-gray-200 shadow-lg rounded-lg bg-white"
      >
        <Document
          file={file} // Replace with your PDF path/URL
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-gray-500">Loading document...</div>
            </div>
          }
          error={
            <div className="flex justify-center items-center h-64 text-red-500">
              Failed to load PDF
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber}
            scale={scale}
            width={pdfContainerRef.current?.clientWidth ? 
              Math.min(pdfContainerRef.current.clientWidth - 40, 1200) : 
              Math.min(window.innerWidth - 40, 800)}
            className="mx-auto p-4"
            renderTextLayer={true}
            loading={
              <div className="flex justify-center items-center h-64">
                <div className="animate-pulse text-gray-500">Loading page...</div>
              </div>
            }
          />
        </Document>
      </div>

      {/* Mobile notice */}
      <p className="mt-4 text-sm text-gray-500 md:hidden">
        Pinch to zoom on touch devices
      </p>
    </div>
  );
}