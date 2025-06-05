import { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FiChevronLeft, FiChevronRight, FiZoomIn, FiZoomOut } from 'react-icons/fi';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
}

const PDFViewer = ({ url }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);

        // Render first page
        const page = await pdf.getPage(1);
        renderPage(page);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPDF();
  }, [url]);

  useEffect(() => {
    if (numPages) {
      const renderCurrentPage = async () => {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber);
        renderPage(page);
      };

      renderCurrentPage();
    }
  }, [pageNumber, numPages, url]);

  const renderPage = async (page: pdfjsLib.PDFPageProxy) => {
    if (!canvasRef.current) return;

    const viewport = page.getViewport({ scale });
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    if (context) {
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    }
  };

  const changePage = (offset: number) => {
    setPageNumber(prev => Math.max(1, Math.min(prev + offset, numPages || 1)));
  };

  const changeScale = (newScale: number) => {
    setScale(Math.max(0.5, Math.min(newScale, 3)));
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      <div className="bg-gray-50 flex justify-center p-4">
        <canvas ref={canvasRef} className="shadow-sm" />
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className={`p-2 rounded-md ${pageNumber <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm text-gray-700">
            Page {pageNumber} of {numPages || '--'}
          </span>

          <button
            onClick={() => changePage(1)}
            disabled={!!(numPages && pageNumber >= numPages)}
            className={`p-2 rounded-md ${numPages && pageNumber >= numPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => changeScale(scale - 0.1)}
            disabled={scale <= 0.5}
            className={`p-2 rounded-md ${scale <= 0.5 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FiZoomOut className="w-5 h-5" />
          </button>

          <span className="text-sm text-gray-700">{Math.round(scale * 100)}%</span>

          <button
            onClick={() => changeScale(scale + 0.1)}
            disabled={scale >= 3}
            className={`p-2 rounded-md ${scale >= 3 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FiZoomIn className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;