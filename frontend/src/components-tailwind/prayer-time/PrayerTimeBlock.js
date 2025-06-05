import React from "react";

const PrayerTimeBlock = ({ time, title, description, isActive = false }) => {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg ${
      isActive
        ? 'bg-green-50 border-l-4 border-green-400'
        : 'bg-gray-50 border-l-4 border-gray-200'
    }`}>
      {/* Time indicator */}
      <div className={`flex flex-col items-center justify-center min-w-[60px] py-1 rounded ${
        isActive ? 'bg-green-100' : 'bg-gray-100'
      }`}>
        <span className="text-xs font-medium text-gray-500">
          {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span className="text-sm font-semibold text-gray-700">
          {new Date(time).toLocaleDateString([], { weekday: 'short' })}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className={`text-sm font-medium ${
          isActive ? 'text-green-800' : 'text-gray-800'
        }`}>
          {title}
        </h3>
        {description && (
          <p className="text-xs text-gray-600 mt-1 line-clamp-1">
            {description}
          </p>
        )}
      </div>

      {/* Active indicator */}
      {isActive && (
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </div>
  );
};
export default PrayerTimeBlock;