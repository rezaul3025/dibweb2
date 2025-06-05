import React, { useState, useEffect } from 'react';

const Overlay2 = ({ triggerText, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative py-4">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md"
      >
        {triggerText}
      </button>

      {/* Blocking Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Overlay Background */}
          <div className="fixed inset-0 bg-gray-900/70 transition-opacity bg-opacity-0" aria-hidden="true" ></div>

          {/* Modal Container */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl mx-auto  transform transition-all">
              {/* Header */}
              <div className="flex justify-between items-start p-4 bg-gray-50 border-b border-gray-200 rounded-t-xl">
                <div>
                  <h3 className="text-xl font-bold text-green-500">{title}</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-emerald-500 hover:text-emerald-700 focus:outline-none p-1 rounded-full hover:bg-emerald-100 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6 text-gray-700">
                {children}
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-xl border-t border-gray-200">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1 text-white bg-green-500 hover:bg-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 transition-colors"
                >
                  Close
                </button>
                {/*<button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 transition-colors shadow-sm"
                >
                  Confirm
                </button>*/}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Usage Example
const App = () => {
  return (
    <div className="p-8">
      <Overlay2
        triggerText="Show Important Notice"
        title="Confirmation Required"
      >
        <div className="space-y-4">
          <p>This is a blocking overlay that prevents interaction with the rest of the page until you explicitly dismiss it.</p>
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <h4 className="font-medium text-emerald-800 mb-2">Important Information</h4>
            <p className="text-sm text-emerald-600">You must acknowledge this message to continue. This pattern is useful for critical actions.</p>
          </div>
        </div>
      </Overlay2>
    </div>
  );
};

export default Overlay2;