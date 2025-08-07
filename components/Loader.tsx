
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-12 text-center">
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full animate-spin-slow">
            <svg className="w-full h-full text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
        </div>
        <div className="absolute w-full h-full animate-ping-slow opacity-50">
            <svg className="w-full h-full text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
        </div>
      </div>
      <p className="mt-4 text-sky-200">Analyzing your dream on the cosmic plane...</p>
    </div>
  );
};

// Add custom animations to tailwind config
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes ping-slow {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.5); opacity: 0.1; }
  }
  .animate-spin-slow {
    animation: spin-slow 4s linear infinite;
  }
  .animate-ping-slow {
    animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
`;
document.head.appendChild(style);
