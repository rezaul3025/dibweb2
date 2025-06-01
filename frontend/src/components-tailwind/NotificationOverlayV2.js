import React, {useEffect, useState} from 'react';
import {FiX} from 'react-icons/fi';
import ResponsiveImageV2 from "./ResponsiveImageV2";
import ResponsiveImageV3 from "./ResponsiveImageV3";

const NotificationOverlayV2 = ({notification}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    // Show ad after page loads
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300); // Show after 3 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
        }, 300);
    };

    if (!isVisible || !notification || !notification.enabled) return null;

    return (
        notification && notification.enabled && <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            {/* Ad Container */}
            <div
                className={`relative max-w-2xl transition-all duration-300 ${isClosing ? 'scale-95' : 'scale-100'}`}>
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute -right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close ad"
                >
                    <FiX className="w-5 h-5"/>
                </button>

                {/* Image with Badge */}
                <div className="relative top-4 rounded-xl overflow-hidden shadow-2xl">

                    {/*<div className="relative overflow-hidden aspect-[4/3]">
                  <img
                      src={notification.image + '?auto=format&fit=crop&w=800&q=80'}
                      alt="Description"
                      className="absolute inset-0 w-full h-full object-cover"
                  />
              </div>

              <div className="relative overflow-hidden aspect-[var(--aspect-ratio)]">
                  <img
                      src={notification.image}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={"--aspect-ratio: 16/9"}
                  />
              </div>*/}
                    <ResponsiveImageV2
                        src={'/static/assets'+notification.image}
                        alt="vdfdfdf "
                        maxWidth="400px"
                        maxHeight="500px"
                    />

                    {/* Green 500 Theme Badge */}
                    <div
                        className="absolute top-5 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                        {notification.headline}
                    </div>
                </div>

                {/* Optional: Clickable Overlay */}
                <a
                    href="/special-offer"
                    className="absolute inset-0 z-0"
                    aria-label="View special offer"
                />
            </div>
        </div>
    );
};

// Usage Example
const App = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Your page content */}
            <main className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Welcome to Our Site</h1>
                <p>Main content goes here...</p>
            </main>

            {/* Ad Overlay */}
            <NotificationOverlayV2/>
        </div>
    );
};

export default NotificationOverlayV2;