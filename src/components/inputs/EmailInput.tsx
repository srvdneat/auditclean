import React, { useState } from 'react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, required }) => {
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const validateEmail = (email: string) => {
    if (!email && required) {
      setError('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue) {
      validateEmail(newValue);
    } else {
      setError(null);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value) {
      validateEmail(value);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="email"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={`
            w-full px-0 py-4 text-base
            border-0 border-b border-gray-300
            focus:border-transparent focus:outline-none 
            transition-all duration-300 ease-out
            bg-transparent placeholder-gray-400
            font-light text-black
            transform focus:scale-[1.02] focus:translate-y-[-2px]
            min-h-[48px] touch-manipulation
          `}
          placeholder="example@email.com"
          autoFocus
          aria-label="Email input field"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'email-error' : undefined}
        />
        
        {/* Animated underline */}
        <div className={`
          absolute bottom-0 left-0 h-0.5
          transition-all duration-300 ease-out
          ${error 
            ? 'bg-red-500' 
            : 'bg-black'
          }
          ${isFocused || value ? 'w-full' : 'w-0'}
        `} />
        
        {/* Focus background glow */}
        <div className={`
          absolute inset-0 -z-10 rounded-lg
          transition-all duration-300 ease-out
          ${isFocused 
            ? error 
              ? 'bg-red-50 scale-105' 
              : 'bg-gray-50 scale-105'
            : 'bg-transparent scale-100'
          }
        `} />
      </div>
      
      {error && (
        <div className="mt-3 animate-slide-down">
          <p 
            id="email-error" 
            className="text-sm text-red-600 font-medium flex items-center gap-2" 
            role="alert"
          >
            <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></span>
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailInput;