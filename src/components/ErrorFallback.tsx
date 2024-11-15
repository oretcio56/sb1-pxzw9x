import React from 'react';
import { RefreshCcw } from 'lucide-react';

interface ErrorFallbackProps {
  error: string;
  resetError?: () => void;
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 text-red-500">
        <svg
          className="w-12 h-12 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
      {resetError && (
        <button
          onClick={resetError}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
        >
          <RefreshCcw size={18} />
          Try Again
        </button>
      )}
    </div>
  );
}