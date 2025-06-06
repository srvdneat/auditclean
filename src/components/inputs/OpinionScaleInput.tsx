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
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between text-sm text-gray-500 px-2">
          {minLabel && <span>{minLabel}</span>}
          {maxLabel && <span>{maxLabel}</span>}
        </div>
        
        <div className="flex justify-between">
          {scaleNumbers.map((number) => (
            <div
              key={number}
              onClick={() => handleScaleClick(number)}
              className={`relative flex flex-col items-center cursor-pointer group`}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center text-lg font-light transition-all ${
                  value === number
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                {number}
              </div>
              <div className="mt-2 w-20 text-center">
                <div className={`h-px bg-gray-300 ${value >= number ? 'bg-black' : ''}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {required && value === 0 && (
        <p className="mt-4 text-sm text-red-500 text-center">Please select a value</p>
      )}
    </div>
  );
};

export default OpinionScaleInput