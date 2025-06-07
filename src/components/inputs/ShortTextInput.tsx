import React, { useState } from 'react';

interface ShortTextInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const ShortTextInput: React.FC<ShortTextInputProps> = ({ value, onChange, required }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className="
            w-full px-0 py-4 text-base
            border-0 border-b-2 border-gray-200
            focus:border-black focus:outline-none 
            transition-all duration-300 ease-out
            bg-transparent placeholder-gray-400
            font-light text-black
            transform focus:scale-[1.02] focus:translate-y-[-2px]
            min-h-[48px] touch-manipulation
          "
          placeholder="Type your answer here..."
          autoFocus
          aria-label="Text input field"
        />
        
        {/* Animated underline */}
        <div className={`
          absolute bottom-0 left-0 h-0.5 bg-black
          transition-all duration-300 ease-out
          ${isFocused || value ? 'w-full' : 'w-0'}
        `} />
        
        {/* Focus background glow */}
        <div className={`
          absolute inset-0 -z-10 rounded-lg
          transition-all duration-300 ease-out
          ${isFocused ? 'bg-gray-50 scale-105' : 'bg-transparent scale-100'}
        `} />
      </div>
    </div>
  );
};

export default ShortTextInput;