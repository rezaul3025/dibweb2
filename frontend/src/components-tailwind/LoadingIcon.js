import React from 'react';

const LoadingIcon = ({
  size = 'responsive', // 'xs', 'sm', 'md', 'lg', 'xl', or 'responsive'
  color = 'green-500',
  type = 'spinner', // 'spinner', 'dots', 'bar'
  className = ''
}) => {
  // Size classes for different variants
  const sizeClasses = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12',
    responsive: 'h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10'
  };

  // Spinner component
  const Spinner = () => (
    <div
      className={`animate-spin rounded-full border-2 border-${color} border-t-transparent ${sizeClasses[size]} ${className}`}
    />
  );

  // Dots loader component
  const Dots = () => (
    <div className={`flex space-x-2 ${sizeClasses[size]} ${className}`}>
      <div className={`w-1/3 h-full rounded-full bg-${color} animate-bounce`} style={{ animationDelay: '0.1s' }} />
      <div className={`w-1/3 h-full rounded-full bg-${color} animate-bounce`} style={{ animationDelay: '0.2s' }} />
      <div className={`w-1/3 h-full rounded-full bg-${color} animate-bounce`} style={{ animationDelay: '0.3s' }} />
    </div>
  );

  // Bar loader component
  const Bar = () => (
    <div className={`w-full ${sizeClasses[size]} ${className}`}>
      <div className={`h-1 w-full bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-${color} rounded-full animate-progress`}
          style={{ width: '75%' }}
        />
      </div>
    </div>
  );

  // Return the selected loader type
  switch (type) {
    case 'dots':
      return <Dots />;
    case 'bar':
      return <Bar />;
    case 'spinner':
    default:
      return <Spinner />;
  }
};

export default LoadingIcon;