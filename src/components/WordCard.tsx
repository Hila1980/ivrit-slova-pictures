
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Volume2 } from 'lucide-react';
import { Word } from '@/types';

interface WordCardProps {
  word: Word;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    setIsPlaying(true);
    // In a real application, you would play the audio file here
    // For now we'll just simulate it with a timeout
    setTimeout(() => {
      setIsPlaying(false);
    }, 1000);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square bg-gray-100">
        <img 
          src={word.image} 
          alt={word.hebrew} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="text-2xl font-bold">{word.hebrewNikud}</h3>
            <p className="text-gray-600">{word.russian}</p>
          </div>
          <button 
            onClick={playAudio}
            className={`p-2 rounded-full ${isPlaying ? 'bg-primary/20' : 'bg-gray-100'} hover:bg-primary/10 transition-colors`}
            aria-label="השמע מילה"
          >
            <Volume2 className={`h-6 w-6 ${isPlaying ? 'text-primary animate-pulse' : 'text-gray-600'}`} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordCard;
