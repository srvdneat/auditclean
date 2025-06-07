import React from 'react';

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
  const handleScaleClick = (scaleValue: number) => {
    onChange(scaleValue);
  };

  const scaleNumbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col space-y-4">
        {/* Scale Labels */}
        <div className="flex justify-between text-sm text-gray-600 px-1 font-medium">
          {minLabel && <span className="text-left max-w-[120px] sm:max-w-none">{minLabel}</span>}
          {maxLabel && <span className="text-right max-w-[120px] sm:max-w-none">{maxLabel}</span>}
        </div>
        
        {/* Rating Buttons - Mobile Optimized */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 w-full">
          {scaleNumbers.map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => handleScaleClick(number)}
              className={`
                relative flex items-center justify-center 
                h-10 w-full
                text-base font-medium
                transition-all duration-200 ease-out
                border rounded-sm
                focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1
                active:scale-95
                ${
                  value === number
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50'
                }
              `}
              aria-label={`Rate ${number} out of ${max}`}
              aria-pressed={value === number}
            >
              <span className="select-none">{number}</span>
            </button>
          ))}
        </div>

        {/* Visual Progress Indicator */}
        <div className="flex justify-center mt-2">
          <div className="flex space-x-1">
            {scaleNumbers.map((number) => (
              <div
                key={number}
                className={`w-2 h-1 rounded-full transition-all duration-200 ${
                  value >= number ? 'bg-black' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {required && value === 0 && (
        <p className="mt-3 text-sm text-red-600 text-center font-medium" role="alert">
          Please select a rating to continue
        </p>
      )}
    </div>
  );
};

export default OpinionScaleInput;