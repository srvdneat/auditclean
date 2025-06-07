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

  const atLimit = limit ? value.length >= limit : false;

  return (
    <div className="w-full max-w-2xl">
      {/* Selected Items */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {value.map((selectedValue) => {
            const option = options.find((o) => o.value === selectedValue);
            return (
              <div
                key={selectedValue}
                className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg"
              >
                <span>{option?.label}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveOption(selectedValue, e)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label={`Remove ${option?.label}`}
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search and select ${limit ? `up to ${limit} options` : 'options'}...`}
          className="
            w-full px-0 py-4 text-lg sm:text-xl
            border-0 border-b border-gray-300 
            focus:border-gray-500 focus:outline-none 
            transition-colors duration-200 ease-out
            bg-transparent placeholder-gray-400
            font-light
          "
          disabled={atLimit}
          aria-label="Search options"
        />
        {limit && (
          <div className="absolute right-0 bottom-4 text-sm text-gray-500 font-medium">
            {value.length}/{limit} selected
          </div>
        )}
      </div>

      {/* Options List */}
      {searchTerm && (
        <div className="border border-gray-200 rounded-lg bg-white shadow-lg max-h-64 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-6 text-gray-500 text-center font-light">
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleToggleOption(option.value)}
                  className={`
                    w-full px-4 py-3 text-left hover:bg-gray-50 
                    transition-colors duration-150 ease-out
                    flex items-center justify-between
                    ${isSelected ? 'bg-gray-50 text-gray-900' : 'text-gray-700'}
                    ${atLimit && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  disabled={atLimit && !isSelected}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="font-light">{option.label}</span>
                  {isSelected && <Check size={18} className="text-gray-900" />}
                </button>
              );
            })
          )}
        </div>
      )}

      {required && value.length === 0 && (
        <p className="mt-4 text-sm text-red-600 font-medium" role="alert">
          Please select at least one option to continue
        </p>
      )}
    </div>
  );
};

export default MultiSelectInput;