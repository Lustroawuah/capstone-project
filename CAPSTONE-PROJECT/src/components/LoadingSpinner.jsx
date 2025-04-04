import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} rounded-full border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;