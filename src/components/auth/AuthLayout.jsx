import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import AuthLogo from './AuthLogo';

/**
 * AuthLayout - Master authentication page layout
 * Handles the responsive background layers, glowing ambient orbs,
 * topographic wave patterns, film reel watermark, back button, and glass card.
 */
export default function AuthLayout({
  title,
  subtitle,
  children,
  serverError,
  serverSuccess,
  onClearServerError,
  onClearServerSuccess,
  onBack,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Default to back navigation or fallback to /login
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/login');
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* BACKGROUND LAYER (Responsive Desktop & Mobile System)                    */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
        {/* Desktop / Tablet / Large screens */}
        <img
          src="/large_screen.png"
          alt=""
          className="hidden md:block w-full h-full object-cover object-center"
        />
        {/* Mobile / Small screens */}
        <img
          src="/small_screen.png"
          alt=""
          className="block md:hidden w-full h-full object-cover object-center"
        />
      </div>

      {/* ========================================================================= */}
      {/* AUTHENTICATION CARD CONTAINER                                             */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[460px] relative z-10 my-auto">
        <div className="glass-auth-card rounded-[28px] p-6 sm:p-8 relative overflow-hidden">
          
          {/* Top-Left Back Button */}
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Go back"
              className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/[0.12] active:bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10" aria-hidden="true" />
          </div>

          {/* Logo */}
          <div className="mb-4">
            <AuthLogo />
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-zinc-400 font-normal mt-1.5 max-w-[320px] mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Server Error Alert Banner */}
          {serverError && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-2.5 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-2"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-snug">{serverError}</div>
              {onClearServerError && (
                <button
                  type="button"
                  onClick={onClearServerError}
                  aria-label="Dismiss error"
                  className="text-rose-400 hover:text-rose-200 cursor-pointer p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Server Success Alert Banner */}
          {serverSuccess && (
            <div
              role="status"
              className="mb-5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-2.5 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-snug">{serverSuccess}</div>
              {onClearServerSuccess && (
                <button
                  type="button"
                  onClick={onClearServerSuccess}
                  aria-label="Dismiss message"
                  className="text-emerald-400 hover:text-emerald-200 cursor-pointer p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Form Content Area */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
