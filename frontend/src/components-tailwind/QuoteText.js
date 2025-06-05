import React from 'react';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const QuoteText = ({
  text = "",
  author = "",
  theme = "light", // "light" or "dark"
  align = "center", // "left", "center", or "right"
  size = "base" // "sm", "base", "lg", "xl"
}) => {
  // Theme classes
  const themeClasses = {
    light: "bg-white text-gray-500",
    dark: "bg-gray-800 text-gray-100"
  };

  // Alignment classes
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  // Size classes for text
  const textSizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg md:text-xl",
    xl: "text-xl md:text-2xl"
  };

  // Size classes for author
  const authorSizeClasses = {
    sm: "text-xs",
    base: "text-sm",
    lg: "text-base",
    xl: "text-lg"
  };

  return (
    <div className={`max-w-4xl mx-auto p-3 md:p-3 ${themeClasses[theme]} ${alignClasses[align]}`}>
      <div className="relative">
        {/* Quote icon - only shown for left-aligned quotes */}
        {align === "left" && (
          <ChatBubbleLeftIcon className={`h-8 w-8 mb-4 ${
            theme === "light" ? "text-gray-300" : "text-gray-600"
          }`} />
        )}

        {/* Quote text */}
        <blockquote>
          <p className={`${textSizeClasses[size]} p-2 sm:break-words leading-relaxed italic font-medium`}>
            {text}
          </p>

          {/* Author */}
          {author && (
            <footer className={`mt-2 ${authorSizeClasses[size]} ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            } font-semibold`}>
              — {author}
            </footer>
          )}
        </blockquote>

        {/* Decorative quote marks for center/right aligned */}
        {align !== "left" && (
          <>
            <span className={`absolute top-0 text-7xl font-serif ${
              theme === "light" ? "text-gray-100" : "text-gray-700"
            }`} style={{ left: '-0.5rem', top: '-1rem' }}>“</span>
            <span className={`absolute bottom-0 text-7xl font-serif ${
              theme === "light" ? "text-gray-100" : "text-gray-700"
            }`} style={{ right: '-0.5rem', bottom: '-1rem' }}>”</span>
          </>
        )}
      </div>
    </div>
  );
};

export default QuoteText;