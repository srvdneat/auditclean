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
    <div className="max-w-2xl">
      <input
        type="email"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        className={`w-full px-4 py-3 text-lg border-b-2 ${
          error ? 'border-red-500' : 'border-gray-300 focus:border-black'
        } outline-none transition-colors bg-transparent`}
        placeholder="example@email.com"
        autoFocus
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default EmailInput