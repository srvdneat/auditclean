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
  const [isFocused, setIsFocused] = useState(false);

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
        <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
          {value.map((selectedValue, index) => {
            const option = options.find((o) => o.value === selectedValue);
            return (
              <div
                key={selectedValue}
                className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-black text-sm font-medium rounded-lg
                          transition-all duration-300 ease-out hover:bg-gray-200 transform hover:scale-105
                          animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span>{option?.label}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveOption(selectedValue, e)}
                  className="text-gray-600 hover:text-black transition-all duration-200 transform hover:scale-110
                            min-h-[24px] min-w-[24px] touch-manipulation"
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
      <div className="relative mb-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={`Search and select ${limit ? `up to ${limit} options` : 'options'}...`}
          className="
            w-full px-0 py-4 text-base
            border-0 outline-none
            transition-all duration-300 ease-out
            bg-transparent placeholder-gray-400
            font-light text-black
            transform focus:scale-[1.02] focus:translate-y-[-2px]
            min-h-[48px] touch-manipulation
          "
          disabled={atLimit}
          aria-label="Search options"
        />
        
        {/* Animated underline */}
        <div className={`
          absolute bottom-0 left-0 h-0.5 bg-black
          transition-all duration-300 ease-out
          ${isFocused || searchTerm ? 'w-full' : 'w-0'}
        `} />
        
        {/* Focus background glow */}
        <div className={`
          absolute inset-0 -z-10 rounded-lg
          transition-all duration-300 ease-out
          ${isFocused ? 'bg-gray-50 scale-105' : 'bg-transparent scale-100'}
        `} />
        
        {limit && (
          <div className={`absolute right-0 bottom-4 text-sm font-medium transition-colors duration-300 ${
            atLimit ? 'text-orange-600' : 'text-gray-500'
          }`}>
            {value.length}/{limit} selected
          </div>
        )}
      </div>

      {/* Options List */}
      {searchTerm && (
        <div className="border border-gray-200 rounded-lg bg-white shadow-xl max-h-64 overflow-y-auto animate-dropdown">
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-6 text-gray-500 text-center font-light">
              No options found
            </div>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = value.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleToggleOption(option.value)}
                  className="
                    w-full px-4 py-3 text-left hover:bg-gray-50 
                    transition-all duration-200 ease-out
                    flex items-center justify-between text-black text-base
                    bg-white first:rounded-t-lg last:rounded-b-lg
                    focus:bg-gray-100 focus:outline-none
                    min-h-[48px] touch-manipulation
                    transform hover:scale-[1.02] hover:translate-x-1
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  disabled={atLimit && !isSelected}
                  role="option"
                  aria-selected={isSelected}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="font-light">{option.label}</span>
                  {isSelected && <Check size={18} className="text-black animate-scale-in" />}
                </button>
              );
            })
          )}
        </div>
      )}

      {required && value.length === 0 && (
        <div className="mt-4 animate-slide-down">
          <p className="text-sm text-red-600 font-medium flex items-center gap-2" role="alert">
            <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></span>
            Please select at least one option to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default MultiSelectInput;