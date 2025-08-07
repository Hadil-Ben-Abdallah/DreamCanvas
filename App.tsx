
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { DreamInputForm } from './components/DreamInputForm';
import { DreamOutput } from './components/DreamOutput';
import { Loader } from './components/Loader';
import { generateDreamInterpretation, generateDreamImage } from './services/geminiService';

const App: React.FC = () => {
  const [dreamTitle, setDreamTitle] = useState<string>('');
  const [dreamDescription, setDreamDescription] = useState<string>('');
  const [interpretation, setInterpretation] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [formKey, setFormKey] = useState(Date.now());

  const handleDreamSubmit = useCallback(async (title: string, description: string) => {
    if (!description.trim()) {
      setError('Please describe your dream.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowOutput(false);
    setInterpretation('');
    setImageUrl('');

    try {
      const [interpretationResult, imageResult] = await Promise.all([
        generateDreamInterpretation(description),
        generateDreamImage(description),
      ]);
      
      setDreamTitle(title);
      setDreamDescription(description);
      setInterpretation(interpretationResult);
      setImageUrl(imageResult);
      setShowOutput(true);

    } catch (err) {
      console.error(err);
      setError('An error occurred while interpreting your dream. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNewDream = useCallback(() => {
    setShowOutput(false);
    setError(null);
    setFormKey(Date.now()); // Change key to force form remount, clearing its state
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-sky-900 text-gray-200 font-['Open_Sans'] p-4 sm:p-6 lg:p-8">
      <Header />
      
      <main className="max-w-4xl mx-auto mt-8">
        <DreamInputForm key={formKey} onSubmit={handleDreamSubmit} isLoading={isLoading} />
        
        {isLoading && <Loader />}

        {error && <div className="mt-8 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
        
        {showOutput && !isLoading && (
          <DreamOutput
            title={dreamTitle}
            interpretation={interpretation}
            imageUrl={imageUrl}
            onNewDream={handleNewDream}
          />
        )}
      </main>
    </div>
  );
};

export default App;
