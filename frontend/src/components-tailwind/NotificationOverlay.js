import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const NotificationOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Show ad after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      {/* Ad Container */}
      <div className={`relative bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden transition-all duration-300 ${isClosing ? 'scale-95' : 'scale-100'}`}>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors shadow-sm"
          aria-label="Close ad"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative h-64 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Special Offer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Discount Badge */}
            <div className="absolute bottom-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
              50% OFF
            </div>
          </div>

          {/* Text Section */}
          <div className="p-6 md:p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Summer Sale!</h2>
            <p className="text-gray-600 mb-6">
              Get exclusive discounts on our new collection. Limited time offer!
            </p>

            <div className="mt-auto space-y-4">
              <button className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                Shop Now
              </button>

              <p className="text-xs text-gray-500 text-center">
                Offer valid until August 31st. Terms apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage Example
const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your page content */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Our Store</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <p>Your main content goes here...</p>
      </main>

      {/* Ad Overlay - will appear after page loads */}
      <AdOverlay />
    </div>
  );
};

export default NotificationOverlay;