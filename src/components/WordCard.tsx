
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Volume2 } from 'lucide-react';
import { Word } from '@/types';

interface WordCardProps {
  word: Word;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    audioRef.current.play().catch(error => {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    });
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square bg-gray-100">
        <img 
          src={word.image} 
          alt={word.hebrew} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // If image fails to load, use a fallback
            e.currentTarget.src = '/placeholder.svg';
          }}
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
        <audio 
          ref={audioRef}
          src={word.audio} 
          onEnded={handleAudioEnded}
          preload="none"
        />
      </CardContent>
    </Card>
  );
};

export default WordCard;
