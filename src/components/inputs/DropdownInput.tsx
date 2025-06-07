import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownInputProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  required?: boolean;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  value,
  options,
  onChange,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-2xl relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`
          w-full px-0 py-4 text-lg sm:text-xl text-left
          border-0 border-b-2 transition-colors duration-200 ease-out
          bg-transparent font-light focus:outline-none
          flex justify-between items-center
          ${value ? 'border-black text-gray-900' : 'border-gray-300 text-gray-400'}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select an option"
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : 'Select an option...'}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-600 transition-transform duration-200 flex-shrink-0 ml-2 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white shadow-xl border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`
                w-full px-4 py-3 text-left hover:bg-gray-50 
                transition-colors duration-150 ease-out
                flex items-center justify-between
                ${value === option.value ? 'bg-gray-50 text-gray-900' : 'text-gray-700'}
              `}
              role="option"
              aria-selected={value === option.value}
            >
              <span className="font-light">{option.label}</span>
              {value === option.value && <Check size={18} className="text-gray-900" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownInput;