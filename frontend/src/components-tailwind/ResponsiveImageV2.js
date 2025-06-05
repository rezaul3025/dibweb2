import React from 'react';

const ResponsiveImageV2 = ({ src, alt, maxWidth = '100%', maxHeight = 'auto' }) => {
  return (
    <div className="flex justify-center items-center overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        style={{
          maxWidth,
          maxHeight,
          width: 'auto',
          height: 'auto'
        }}
        loading="lazy"
      />
    </div>
  );
};

export default ResponsiveImageV2;