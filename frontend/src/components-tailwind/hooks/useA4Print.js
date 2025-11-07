// hooks/useA4Print.js
import { useRef } from 'react';

export const useA4Print = () => {
  const printRef = useRef();

  const a4PrintStyles = `
    @media print {
      @page {
        size: A4;
        margin: 15mm;
      }
      body { 
        margin: 0; 
        padding: 0;
        width: 210mm;
        min-height: 297mm;
      }
      .a4-content {
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        box-sizing: border-box;
        background: white;
      }
      .no-print { display: none !important; }
      .print-only { display: block !important; }
      .header-info { display: none !important; }
      .url-display { display: none !important; }
      .datetime-display { display: none !important; }
      .page-title-display { display: none !important; }
    }
    
    @media screen {
      .a4-content {
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        margin: 20px auto;
        background: white;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        box-sizing: border-box;
      }
    }
    .no-print { display: none; }
    body { font-family: Arial, sans-serif; }
  `;

  const printA4 = (customStyles = '') => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open('', '_blank');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
           <title>Payment Receipt</title>
          <style>${a4PrintStyles}${customStyles}</style>
        </head>
        <body>
          <div class="a4-content">
            ${content.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return { printRef, printA4 };
};