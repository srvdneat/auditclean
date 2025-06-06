import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface MultiSelectInputProps {
  value: string[];
  options: { value: string; label: string }[];
  onChange: (value: string[]) => void;
  limit?: number;
  required?: boolean;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  value,
  options,
  onChange,
  limit,
  required,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleOption = (optionValue: string) => {
    const isSelected = value.includes(optionValue);
    
    if (isSelected) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      if (!limit || value.length < limit) {
        onChange([...value, optionValue]);
      }
    }
  };

  const handleRemoveOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLabels = value.map((v) => {
    const option = options.find((opt) => opt.value === v);
    return option ? option.label : '';
  });

  const atLimit = limit ? value.length >= limit : false;

  return (
    <div className="max-w-2xl">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {value.map((selectedValue) => {
            const option = options.find((o) => o.value === selectedValue);
            return (
              <div
                key={selectedValue}
                className="bg-gray-100 text-black px-3 py-1 flex items-center gap-2"
              >
                <span>{option?.label}</span>
                <X
                  size={16}
                  className="cursor-pointer hover:text-accent"
                  onClick={(e) => handleRemoveOption(selectedValue, e)}
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="relative mb-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Select ${limit ? `up to ${limit} options` : 'options'}...`}
          className="w-full px-4 py-3 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent"
          disabled={atLimit}
        />
        {limit && (
          <div className="absolute right-0 bottom-3 text-sm text-gray-500">
            {value.length}/{limit} selected
          </div>
        )}
      </div>

      <div className="mt-2 max-h-64 overflow-y-auto border border-black">
        {filteredOptions.length === 0 ? (
          <div className="px-4 py-3 text-gray-500 text-center">No options found</div>
        ) : (
          filteredOptions.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <div
                key={option.value}
                className={`px-4 py-3 cursor-pointer flex items-center justify-between hover:bg-gray-50 ${
                  isSelected ? 'bg-gray-50' : ''
                } ${atLimit && !isSelected ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => handleToggleOption(option.value)}
              >
                <span className={isSelected ? 'text-black font-normal' : ''}>
                  {option.label}
                </span>
                {isSelected && <Check size={18} className="text-black" />}
              </div>
            );
          })
        )}
      </div>

      {required && value.length === 0 && (
        <p className="mt-2 text-sm text-red-500">Please select at least one option</p>
      )}
    </div>
  );
};

export default MultiSelectInput