import React, { useState } from 'react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, required }) => {
  const [error, setError] = useState<string | null>(null);

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

  const handleBlur = () => {
    if (value) {
      validateEmail(value);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <input
        type="email"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        className={`
          w-full px-0 py-4 text-lg sm:text-xl
          border-0 border-b-2 transition-colors duration-200 ease-out
          bg-transparent placeholder-gray-400 font-light
          focus:outline-none
          ${error ? 'border-red-500' : 'border-gray-300 focus:border-black'}
        `}
        placeholder="example@email.com"
        autoFocus
        aria-label="Email input field"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && (
        <p id="email-error\" className="mt-3 text-sm text-red-600 font-medium\" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default EmailInput;