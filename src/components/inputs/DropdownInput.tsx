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
    <div className="max-w-2xl" ref={dropdownRef}>
      <div
        className={`relative border-b-2 ${
          value ? 'border-black' : 'border-gray-300'
        } cursor-pointer`}
        onClick={toggleDropdown}
      >
        <div className="px-4 py-3 text-lg flex justify-between items-center">
          <span className={value ? 'text-black' : 'text-gray-400'}>
            {selectedOption ? selectedOption.label : 'Select an option...'}
          </span>
          <ChevronDown
            size={20}
            className={`text-black transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-w-2xl bg-white shadow-lg border border-black max-h-64 overflow-y-auto animate-dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between ${
                value === option.value ? 'bg-gray-50 text-black' : 'text-black'
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
              {value === option.value && <Check size={18} className="text-black" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownInput