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
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsFocused(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setIsFocused(false);
    }
  };

  return (
    <div className="w-full max-w-2xl relative" ref={dropdownRef}>
      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          className="
            w-full px-0 py-4 text-base text-left
            border-0 outline-none
            transition-all duration-300 ease-out
            bg-transparent font-light
            flex justify-between items-center text-black
            transform focus:scale-[1.02] focus:translate-y-[-2px]
            min-h-[48px] touch-manipulation
            hover:bg-gray-50 hover:scale-[1.01]
          "
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Select an option"
        >
          <span className={`truncate transition-colors duration-200 ${value ? 'text-black' : 'text-gray-400'}`}>
            {selectedOption ? selectedOption.label : 'Select an option...'}
          </span>
          <ChevronDown
            size={20}
            className={`text-black transition-all duration-300 flex-shrink-0 ml-2 ${
              isOpen ? 'rotate-180 scale-110' : ''
            }`}
          />
        </button>

        {/* Animated underline */}
        <div className={`
          absolute bottom-0 left-0 h-0.5 bg-black
          transition-all duration-300 ease-out
          ${isFocused || isOpen || value ? 'w-full' : 'w-0'}
        `} />
        
        {/* Focus background glow */}
        <div className={`
          absolute inset-0 -z-10 rounded-lg
          transition-all duration-300 ease-out
          ${isFocused || isOpen ? 'bg-gray-50 scale-105' : 'bg-transparent scale-100'}
        `} />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white shadow-2xl border border-gray-200 rounded-lg max-h-64 overflow-y-auto animate-dropdown">
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="
                w-full px-4 py-3 text-left hover:bg-gray-50 
                transition-all duration-200 ease-out
                flex items-center justify-between text-black text-base
                bg-white first:rounded-t-lg last:rounded-b-lg
                focus:bg-gray-100 focus:outline-none
                min-h-[48px] touch-manipulation
                transform hover:scale-[1.02] hover:translate-x-1
              "
              role="option"
              aria-selected={value === option.value}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="font-light">{option.label}</span>
              {value === option.value && (
                <Check size={18} className="text-black animate-scale-in" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownInput;