
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import WordGrid from '@/components/WordGrid';
import Pagination from '@/components/Pagination';
import { words, categories } from '@/data/words';
import type { CategoryType } from '@/types';

const WORDS_PER_PAGE = 3;

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredWords, setFilteredWords] = useState(words);

  // Filter words when category changes
  useEffect(() => {
    if (activeCategory) {
      setFilteredWords(words.filter(word => word.category === activeCategory));
    } else {
      setFilteredWords(words);
    }
    setCurrentPage(1);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredWords.length / WORDS_PER_PAGE);

  const handleCategorySelect = (category: CategoryType) => {
    setActiveCategory(category === activeCategory ? null : category);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 pb-12">
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />
        
        <div className="text-center text-gray-600 mb-6">
          {activeCategory ? (
            <p>{filteredWords.length} מילים בקטגוריה</p>
          ) : (
            <p>{filteredWords.length} מילים בסך הכל</p>
          )}
        </div>
        
        <WordGrid 
          words={filteredWords}
          currentPage={currentPage}
          wordsPerPage={WORDS_PER_PAGE}
        />
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default Index;
