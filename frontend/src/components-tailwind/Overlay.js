import React, { useState, useRef, useEffect } from 'react';

const Overlay = ({ triggerText, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
      >
        {triggerText}
      </button>

      {/* Popover Content */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-10 mt-2 w-72 md:w-96 bg-white rounded-lg shadow-lg border-l-4 border-emerald-500 transform transition-all duration-200 origin-top"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-t-lg">
            <h3 className="text-lg font-semibold text-emerald-800">{title}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-600 hover:text-emerald-800 focus:outline-none"
              aria-label="Close popover"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 text-gray-700">
            {children}
          </div>

          {/* Footer */}
          <div className="flex justify-end p-3 bg-gray-50 rounded-b-lg border-t border-gray-200">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Usage Example
const App = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Overlay
        triggerText="Open Popover"
        title="Success Message"
      >
        <p>This is a responsive, closable popover with a green theme.</p>
        <p className="mt-2 text-emerald-600 font-medium">Click outside or use the close buttons to dismiss.</p>
      </Overlay>
    </div>
  );
};

export default Overlay;