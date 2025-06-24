'use client';

import { useState, useMemo } from 'react';
import { Tool, Category } from '@/types';
import { filterTools } from '@/utils/parser';
import Header from '@/components/Header';
import RealTimeBanner from '@/components/RealTimeBanner';
import SearchBar from '@/components/SearchBar';
import QuickFilters from '@/components/QuickFilters';
import ToolGrid from '@/components/ToolGrid';
import Stats from '@/components/Stats';
import ApiShowcase from '@/components/ApiShowcase';

interface ToolsPageProps {
  initialTools: Tool[];
  initialCategories: Category[];
  lastUpdated?: string;
}

export default function ToolsPage({ initialTools, initialCategories, lastUpdated }: ToolsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPricingModels, setSelectedPricingModels] = useState<string[]>([]);

  const filteredTools = useMemo(() => {
    return filterTools(initialTools, {
      search: searchTerm,
      category: selectedCategory,
      pricingModel: selectedPricingModels
    });
  }, [initialTools, searchTerm, selectedCategory, selectedPricingModels]);

  return (
    <>
      <Header />
      
      <RealTimeBanner totalTools={initialTools.length} lastUpdated={lastUpdated} />
      
      <Stats tools={initialTools} categories={initialCategories} />
      
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalResults={filteredTools.length}
      />
      
      <QuickFilters
        categories={initialCategories}
        selectedCategory={selectedCategory}
        selectedPricingModels={selectedPricingModels}
        onCategoryChange={setSelectedCategory}
        onPricingModelChange={setSelectedPricingModels}
        totalResults={filteredTools.length}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToolGrid tools={filteredTools} />
      </main>
      
      <ApiShowcase />
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">
                  Free<span className="text-blue-600">Dev</span>
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Discover amazing free tools, services, and resources for developers. 
                Built with ❤️ for the developer community.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/ripienaar/free-for-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20collection%20of%20free%20developer%20tools!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    All Tools
                  </a>
                </li>
                <li>
                  <a href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Popular</h3>
              <ul className="space-y-2">
                {initialCategories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-left"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Data sourced from{' '}
              <a
                href="https://github.com/ripienaar/free-for-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                free-for-dev
              </a>
              {' '}• Updated daily • Built with ❤️ for developers
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
