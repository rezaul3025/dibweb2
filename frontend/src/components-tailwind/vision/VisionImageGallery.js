import React, { useState } from 'react';
import { XMarkIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

const VisionImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {images.map((image, index) => (
            <div className="flex justify-center" key={index}>
              <div  className="relative group">
                {/* Image with hover effect */}
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                  <img
                    src={image.thumbnail}
                    alt={image.alt || `Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-100 cursor-pointer"
                    onClick={() => openModal(image)}
                    loading="lazy"
                  />
                </div>

                {/* View Larger Button (shown on hover) */}
                <button
                  onClick={() => openModal(image)}
                  className="absolute bottom-4 right-4 bg-white/90 text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                  aria-label="View larger"
                >
                  <ArrowsPointingOutIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
        ))}
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
              aria-label="Close modal"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>

            {/* Main Image */}
            <div className="h-full w-full flex items-center justify-center">
              <img
                src={selectedImage.fullSize}
                alt={selectedImage.alt || 'Enlarged view'}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>

            {/* Image Caption (if available) */}
            {selectedImage.caption && (
              <div className="mt-4 text-center text-white">
                {selectedImage.caption}
              </div>
            )}

            {/* Navigation Arrows (optional) */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <button className="text-white bg-black/50 hover:bg-black/70 p-2 rounded-full">
                &larr;
              </button>
              <button className="text-white bg-black/50 hover:bg-black/70 p-2 rounded-full">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisionImageGallery;