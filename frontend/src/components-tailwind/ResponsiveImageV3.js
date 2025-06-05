import React, { useState, useEffect } from 'react';

const ResponsiveImageV3 = ({
  src,
  alt,
  className = '',
  containerClass = '',
  objectFit = 'contain'
}) => {
  return (
   <div className="relative w-full pt-[56.25%]"> {/* Default 16:9 ratio */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            onLoad={(e) => {
              // Dynamically adjust container if image loads
              const img = e.target;
              const ratio = (img.height / img.width) * 100;
              img.parentElement.parentElement.style.paddingTop = `${ratio}%`;
            }}
        />
      </div>
   </div>
  );
};

export default ResponsiveImageV3;

