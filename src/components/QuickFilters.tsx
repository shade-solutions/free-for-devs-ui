'use client';

import { useState } from 'react';
import { Category } from '@/types';

interface QuickFiltersProps {
  categories: Category[];
  selectedCategory: string;
  selectedPricingModels: string[];
  onCategoryChange: (category: string) => void;
  onPricingModelChange: (models: string[]) => void;
  totalResults: number;
}

const pricingModels = [
  { id: 'free', label: 'Free', color: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200' },
  { id: 'freemium', label: 'Freemium', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200' },
  { id: 'trial', label: 'Trial', color: 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200' },
];

export default function QuickFilters({
  categories,
  selectedCategory,
  selectedPricingModels,
  onCategoryChange,
  onPricingModelChange,
  totalResults
}: QuickFiltersProps) {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const topCategories = categories
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const handlePricingToggle = (modelId: string) => {
    if (selectedPricingModels.includes(modelId)) {
      onPricingModelChange(selectedPricingModels.filter(id => id !== modelId));
    } else {
      onPricingModelChange([...selectedPricingModels, modelId]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Toggle Button */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="font-medium">Filters</span>
              {(selectedCategory !== 'all' || selectedPricingModels.length > 0) && (
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2 py-0.5 rounded-full">
                  {(selectedCategory !== 'all' ? 1 : 0) + selectedPricingModels.length}
                </span>
              )}
            </button>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{totalResults.toLocaleString()}</span> tools found
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedCategory !== 'all' || selectedPricingModels.length > 0) && (
            <button
              onClick={() => {
                onCategoryChange('all');
                onPricingModelChange([]);
              }}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Expandable Filters */}
        {isFiltersVisible && (
          <div className="pb-6 space-y-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            {/* Pricing Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Pricing</h3>
              <div className="flex flex-wrap gap-2">
                {pricingModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handlePricingToggle(model.id)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedPricingModels.includes(model.id)
                        ? `${model.color} ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800`
                        : `${model.color} opacity-60 hover:opacity-100`
                    }`}
                  >
                    {model.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Categories */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Popular Categories</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onCategoryChange('all')}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All Categories
                </button>
                {topCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                    <span className="ml-1 text-xs opacity-75">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
