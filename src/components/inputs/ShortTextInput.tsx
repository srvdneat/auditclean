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
    <div className="max-w-2xl">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        required={required}
        className="w-full px-4 py-3 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent"
        placeholder="Type your answer here..."
        autoFocus
      />
    </div>
  );
};

export default ShortTextInput;