import React from 'react';

const TextTruncate = ({
  text,
  maxLength,
  className = ''
}) => {
  if (text.length <= maxLength) {
    return <p className={className}>{text}</p>;
  }

  const truncatedText = text.substring(0, maxLength) + '...';

  return (
    <p
      className={`${className} truncate text-justify break-words`}
      title={text} // Show full text on hover
    >
      {truncatedText}
    </p>
  );
};

export default TextTruncate;