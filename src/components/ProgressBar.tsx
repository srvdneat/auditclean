import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="w-full bg-gray-100 h-0.5 overflow-hidden">
      <div
        className="h-full bg-black transition-all duration-500 ease-out"
        style={{ width: `${Math.min(percentage, 100)}%` }}
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Survey progress: ${Math.round(percentage)}% complete`}
      />
    </div>
  );
};

export default ProgressBar;