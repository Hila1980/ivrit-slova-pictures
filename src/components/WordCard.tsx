
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, AlertCircle } from 'lucide-react';
import { Word } from '@/types';
import { useToast } from "@/hooks/use-toast";

interface WordCardProps {
  word: Word;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Pre-load audio to check for errors
  useEffect(() => {
    const audio = new Audio(word.audio);
    audio.addEventListener('error', () => {
      setAudioError(true);
      console.error(`Error loading audio: ${word.audio}`);
    });
    
    // Cleanup listener
    return () => {
      audio.removeEventListener('error', () => {
        setAudioError(true);
      });
    };
  }, [word.audio]);

  const playAudio = () => {
    if (!audioRef.current || audioError) {
      toast({
        title: "שגיאת שמע",
        description: "לא ניתן להשמיע את הקובץ כרגע",
        variant: "destructive",
      });
      return;
    }
    
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
      toast({
        title: "שגיאת שמע",
        description: "אירעה שגיאה בהשמעת הקובץ",
        variant: "destructive",
      });
    });
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleImageError = () => {
    console.error(`Image failed to load: ${word.image}`);
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square bg-gray-100">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-100">
            <AlertCircle className="h-12 w-12 text-slate-400 mb-2" />
            <p className="text-slate-500 text-center">{word.hebrew}</p>
          </div>
        ) : (
          <img 
            src={word.image} 
            alt={word.hebrew} 
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        )}
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
            disabled={audioError}
          >
            <Volume2 className={`h-6 w-6 ${isPlaying ? 'text-primary animate-pulse' : audioError ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>
        {!audioError && (
          <audio 
            ref={audioRef}
            src={word.audio} 
            onEnded={handleAudioEnded}
            preload="none"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default WordCard;
