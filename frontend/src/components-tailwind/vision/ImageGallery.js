import React, { useState } from 'react';
import { XMarkIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

const ImageGallery = ({ images }) => {
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
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      {/* Gallery Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Image Gallery
      </h2>

      {/* Centered Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex justify-center"
          >
            <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img
                src={image.src}
                alt={image.alt || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                onClick={() => openModal(image)}
                loading="lazy"
              />

              {/* View Larger Button */}
              <button
                onClick={() => openModal(image)}
                className="absolute bottom-3 right-3 bg-white/90 text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
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
                src={selectedImage?.src}
                alt={selectedImage?.alt || 'Enlarged view'}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>

            {/* Image Caption (if available) */}
            {selectedImage?.caption && (
              <div className="mt-4 text-center text-white">
                {selectedImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;