import React from 'react';

/**
 * AuthDivider - Subtle horizontal rule separator with "OR" text
 */
export default function AuthDivider({ text = 'OR' }) {
  return (
    <div className="relative flex items-center justify-center my-5">
      <div className="flex-grow border-t border-zinc-800/90" />
      <span className="shrink-0 px-3.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 select-none">
        {text}
      </span>
      <div className="flex-grow border-t border-zinc-800/90" />
    </div>
  );
}
