import React, { useState, useEffect } from 'react';

const ResponsiveImage = ({ src, alt, className = '' }) => {
  const [aspectRatio, setAspectRatio] = useState(16/9); // Default fallback

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default ResponsiveImage;