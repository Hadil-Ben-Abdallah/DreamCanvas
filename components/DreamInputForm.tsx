
import React, { useState } from 'react';

interface DreamInputFormProps {
  onSubmit: (title: string, description: string) => void;
  isLoading: boolean;
}

export const DreamInputForm: React.FC<DreamInputFormProps> = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10 shadow-2xl shadow-indigo-500/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="dream-title" className="block text-sm font-medium text-sky-200 mb-2">
            Dream Title (Optional)
          </label>
          <input
            type="text"
            id="dream-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Flying Over a Neon City"
            className="w-full bg-white/10 border border-sky-400/30 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-all duration-300"
          />
        </div>
        <div>
          <label htmlFor="dream-description" className="block text-sm font-medium text-sky-200 mb-2">
            Describe Your Dream
          </label>
          <textarea
            id="dream-description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="I dreamt I was floating through a forest where the trees were made of crystal..."
            className="w-full bg-white/10 border border-sky-400/30 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-all duration-300"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-block px-12 py-3 font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full shadow-lg hover:from-sky-400 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Creating...' : 'Interpret My Dream'}
          </button>
        </div>
      </form>
    </div>
  );
};
