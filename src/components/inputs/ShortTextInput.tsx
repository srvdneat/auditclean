import React from 'react';

interface ShortTextInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const ShortTextInput: React.FC<ShortTextInputProps> = ({ value, onChange, required }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        required={required}
        className="
          w-full px-0 py-4 text-lg sm:text-xl
          border-0 border-b-2 border-gray-300 
          focus:border-black focus:outline-none 
          transition-colors duration-200 ease-out
          bg-transparent placeholder-gray-400
          font-light
        "
        placeholder="Type your answer here..."
        autoFocus
        aria-label="Text input field"
      />
    </div>
  );
};

export default ShortTextInput;