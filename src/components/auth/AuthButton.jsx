import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

/**
 * AuthButton - Primary vibrant gradient CTA submit button
 */
export default function AuthButton({
  children,
  loading = false,
  disabled = false,
  type = 'submit',
  className = '',
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative w-full h-12 rounded-xl text-white font-semibold text-sm md:text-base flex items-center justify-center gap-2 bg-gradient-to-r from-[#f43f5e] via-[#c026d3] to-[#7c3aed] shadow-[0_4px_20px_rgba(192,38,211,0.35)] hover:shadow-[0_6px_25px_rgba(192,38,211,0.55)] hover:opacity-95 active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}
