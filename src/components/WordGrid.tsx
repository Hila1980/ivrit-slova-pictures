
import React from 'react';
import WordCard from './WordCard';
import { Word } from '@/types';

interface WordGridProps {
  words: Word[];
  currentPage: number;
  wordsPerPage: number;
}

const WordGrid: React.FC<WordGridProps> = ({ words, currentPage, wordsPerPage }) => {
  const startIndex = (currentPage - 1) * wordsPerPage;
  const selectedWords = words.slice(startIndex, startIndex + wordsPerPage);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {selectedWords.map((word) => (
        <WordCard key={word.id} word={word} />
      ))}
    </div>
  );
};

export default WordGrid;
