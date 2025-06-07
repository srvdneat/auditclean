import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="w-full bg-gray-100 h-1 overflow-hidden rounded-full">
      <div
        className="h-full bg-gradient-to-r from-black to-gray-700 transition-all duration-700 ease-out rounded-full
                   shadow-sm relative overflow-hidden"
        style={{ width: `${Math.min(percentage, 100)}%` }}
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Survey progress: ${Math.round(percentage)}% complete`}
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
                        opacity-30 animate-shimmer"></div>
      </div>
    </div>
  );
};

export default ProgressBar;