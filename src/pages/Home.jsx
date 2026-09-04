import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLogo from '../components/auth/AuthLogo';
import { LogOut, Sparkles, Video } from 'lucide-react';

/**
 * Home Page - Placeholder Landing Page for Post-Login Redirect
 */
export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any token/session state if needed
    navigate('/login');
  };

  return (
    <div className="min-h-screen text-zinc-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
        <img
          src="/large_screen.png"
          alt=""
          className="hidden md:block w-full h-full object-cover object-center"
        />
        <img
          src="/small_screen.png"
          alt=""
          className="block md:hidden w-full h-full object-cover object-center"
        />
      </div>

      <div className="glass-auth-card rounded-3xl p-8 max-w-md w-full text-center relative z-10 space-y-6">
        <AuthLogo />

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Vibely</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            You're Signed In! 🎉
          </h1>
          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            The authentication flow is complete. Connect your backend API when ready to stream video feeds.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full h-11 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 hover:text-white font-medium text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
