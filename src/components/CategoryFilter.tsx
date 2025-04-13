
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import type { CategoryType } from '@/types';

interface CategoryFilterProps {
  categories: CategoryType[];
  activeCategory: CategoryType | null;
  onSelectCategory: (category: CategoryType) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          size="lg"
          className={cn(
            "rounded-full px-6 text-lg font-medium transition-all",
            activeCategory === category 
              ? "bg-primary text-white hover:bg-primary/90" 
              : "bg-white hover:bg-gray-100"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
