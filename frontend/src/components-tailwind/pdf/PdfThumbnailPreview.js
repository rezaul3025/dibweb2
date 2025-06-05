import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import {LeftArrow, RightArrow} from "../ArrowSvg";
import {ArrowDownTrayIcon, DocumentTextIcon} from "@heroicons/react/24/outline";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfThumbnailPreview = ({ file, doc_name, doc_size, maxWidth = 300, maxHeight = 400 }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    calculateScale();
  }

  function calculateScale() {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Adjust scale based on container width and desired max width
      const calculatedScale = Math.min(1, containerWidth / maxWidth);
      setScale(calculatedScale);
    }
  }

  // Download PDF
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file; // Replace with your PDF path
    link.download = 'document.pdf'; // Custom filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle window resize for responsiveness
  React.useEffect(() => {
    const handleResize = () => calculateScale();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden border border-gray-200"
      ref={containerRef}
      style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }}
    >
      <div className="flex items-center justify-between p-3 rounded-md hover:bg-green-100 transition-colors">
          <div className="flex items-center">
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

      <div className="p-4 flex justify-center items-center">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-gray-500">Loading PDF...</div>}
          error={<div className="text-red-500">Failed to load PDF</div>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            width={maxWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-lg"
          />
        </Document>
      </div>

      {numPages > 1 && (
        <div className="flex justify-between items-center p-2 bg-gray-100 border-t border-gray-200">
          <button
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className="px-3 py-1 bg-gray-200 text-gary-500 rounded disabled:bg-gray-300"
          >
            <LeftArrow />
          </button>
          <span className="text-sm text-gray-500">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
            disabled={pageNumber >= numPages}
            className="px-3 py-1 bg-gray-200 text-gary-500 rounded disabled:text-white"
          >
            <RightArrow />
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfThumbnailPreview;