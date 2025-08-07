
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white drop-shadow-[0_0_8px_rgba(173,216,230,0.6)]">
        DreamCanvas
      </h1>
      <p className="mt-2 text-sky-200/80">Turn your dreams into art and insight.</p>
    </header>
  );
};
