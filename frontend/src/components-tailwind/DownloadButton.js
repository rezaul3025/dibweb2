import React from 'react';

const DownloadButton = ({
  text = "Download Now",
  disabled = false,
  loading = false,
  onClick = () => {}
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full
        bg-green-500
        hover:bg-green-600
        text-white
        font-medium
        py-3
        px-4
        rounded-md
        shadow-sm
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-green-500
        focus:ring-offset-2
        flex
        items-center
        justify-center
        ${disabled || loading ? 'opacity-75 cursor-not-allowed' : ''}
      `}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Downloading...
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            ></path>
          </svg>
          {text}
        </>
      )}
    </button>
  );
};

export default DownloadButton;