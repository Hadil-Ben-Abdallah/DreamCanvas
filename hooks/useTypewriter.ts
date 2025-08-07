
import { useState, useEffect } from 'react';

export const useTypewriter = (text: string, speed: number = 50): string => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayText(''); // Reset on text change
    if (text) {
        const typingInterval = setInterval(() => {
          if (i < text.length) {
            setDisplayText(prev => prev + text.charAt(i));
            i++;
          } else {
            clearInterval(typingInterval);
          }
        }, speed);
    
        return () => {
          clearInterval(typingInterval);
        };
    }
  }, [text, speed]);

  return displayText;
};
