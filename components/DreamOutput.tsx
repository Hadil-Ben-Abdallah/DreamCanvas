
import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { DownloadIcon } from './icons';

interface DreamOutputProps {
  title: string;
  interpretation: string;
  imageUrl: string;
  onNewDream: () => void;
}

export const DreamOutput: React.FC<DreamOutputProps> = ({ title, interpretation, imageUrl, onNewDream }) => {
  const displayedInterpretation = useTypewriter(interpretation, 20);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.replace(/\s+/g, '_') || 'dream_art'}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-12 animate-fade-in">
      <div className="bg-black/20 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10 shadow-2xl shadow-indigo-500/10">
        {imageUrl && (
          <div className="mb-6 relative group">
            <img src={imageUrl} alt="AI-generated visualization of the dream" className="w-full h-auto object-cover rounded-lg shadow-lg" />
            <button
              onClick={handleDownload}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/75"
              aria-label="Download Dream Art"
            >
              <DownloadIcon />
            </button>
          </div>
        )}
        <div className="text-left">
          {title && (
            <h2 className="font-playfair text-3xl font-bold text-white mb-4">
              {title}
            </h2>
          )}
          <h3 className="font-playfair text-2xl font-bold text-sky-200 mb-2">A Gentle Interpretation</h3>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap min-h-[50px]">
            {displayedInterpretation}
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <button
            onClick={onNewDream}
            className="inline-block px-12 py-3 font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full shadow-lg hover:from-teal-400 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300/50"
          >
            Dream Again
          </button>
        </div>
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind config
const tailwindConfig = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};
// This is a conceptual addition. Actual tailwind.config.js is not generated.
// We will use inline style or a simple class for animation if needed.
// For now, let's use a simple fade-in.
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-in-out;
  }
`;
document.head.appendChild(style);
