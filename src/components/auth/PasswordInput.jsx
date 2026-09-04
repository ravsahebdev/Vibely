import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import AuthInput from './AuthInput';

/**
 * PasswordInput - Password field with secure toggle for show/hide password
 */
export default function PasswordInput({
  id,
  name,
  label = 'Password',
  value,
  onChange,
  onBlur,
  placeholder = 'Enter your password',
  error,
  required = false,
  autoComplete = 'current-password',
  disabled = false,
  className = '',
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <AuthInput
      id={id}
      name={name}
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      icon={Lock}
      error={error}
      required={required}
      autoComplete={autoComplete}
      disabled={disabled}
      className={className}
      rightElement={
        <button
          type="button"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          tabIndex={0}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="text-purple-400/80 hover:text-purple-300 focus:text-purple-300 p-1 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500/50 cursor-pointer"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      }
    />
  );
}
