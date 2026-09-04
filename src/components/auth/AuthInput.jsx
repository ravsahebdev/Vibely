import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * AuthInput - Accessible text / email / username input field with icon and inline error handling
 */
export default function AuthInput({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  icon: Icon,
  rightElement,
  error,
  required = false,
  autoComplete,
  disabled = false,
  className = '',
  inputClassName = '',
}) {
  const errorId = error ? `${id || name}-error` : undefined;

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="text-xs md:text-[13px] font-medium text-zinc-300 mb-1.5 flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-rose-400">*</span>}
          </span>
        </label>
      )}

      <div
        className={`auth-input-container relative flex items-center bg-[#121020]/90 border rounded-xl px-3.5 h-12 transition-all duration-200 ${
          error
            ? 'border-rose-500/70 focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500/40'
            : 'border-purple-500/20 hover:border-purple-500/40 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500/50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {Icon && (
          <div className="text-purple-400/90 mr-3 shrink-0 flex items-center justify-center pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none font-normal ${inputClassName}`}
        />

        {rightElement && <div className="shrink-0 ml-2 flex items-center">{rightElement}</div>}
      </div>

      {error && (
        <div
          id={errorId}
          role="alert"
          className="text-xs text-rose-400 mt-1 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-0.5 duration-150"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
