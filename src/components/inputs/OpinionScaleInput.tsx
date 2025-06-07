import React, { useState } from 'react';

interface OpinionScaleInputProps {
  value: number;
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
  onChange: (value: number) => void;
  required?: boolean;
}

const OpinionScaleInput: React.FC<OpinionScaleInputProps> = ({
  value,
  min,
  max,
  minLabel,
  maxLabel,
  onChange,
  required,
}) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const handleScaleClick = (scaleValue: number) => {
    onChange(scaleValue);
  };

  const scaleNumbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col space-y-6">
        {/* Scale Labels */}
        <div className="flex justify-between text-sm text-gray-600 px-1 font-medium">
          {minLabel && <span className="text-left max-w-[120px] sm:max-w-none">{minLabel}</span>}
          {maxLabel && <span className="text-right max-w-[120px] sm:max-w-none">{maxLabel}</span>}
        </div>
        
        {/* Rating Buttons - Mobile Optimized */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 w-full">
          {scaleNumbers.map((number, index) => (
            <button
              key={number}
              type="button"
              onClick={() => handleScaleClick(number)}
              onMouseEnter={() => setHoveredValue(number)}
              onMouseLeave={() => setHoveredValue(null)}
              className={`
                relative flex items-center justify-center 
                h-12 w-full
                text-sm font-medium
                transition-all duration-300 ease-out
                border-2 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                transform hover:scale-110 active:scale-95
                min-h-[48px] touch-manipulation
                ${
                  value === number
                    ? 'bg-black text-white border-black shadow-lg scale-105'
                    : hoveredValue === number
                    ? 'bg-gray-100 text-black border-gray-400 scale-105'
                    : 'bg-white text-black border-gray-300 hover:border-gray-500 hover:bg-gray-50'
                }
              `}
              aria-label={`Rate ${number} out of ${max}`}
              aria-pressed={value === number}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="select-none">{number}</span>
              
              {/* Ripple effect */}
              {value === number && (
                <div className="absolute inset-0 rounded-lg bg-black opacity-20 animate-ping"></div>
              )}
            </button>
          ))}
        </div>

        {/* Visual Progress Indicator */}
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            {scaleNumbers.map((number, index) => (
              <div
                key={number}
                className={`w-3 h-1.5 rounded-full transition-all duration-500 ease-out ${
                  value >= number ? 'bg-black scale-110' : 'bg-gray-200'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Selected value indicator */}
        {value > 0 && (
          <div className="text-center animate-fade-in">
            <span className="text-sm text-gray-600 font-medium">
              Selected: {value}/{max}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpinionScaleInput;