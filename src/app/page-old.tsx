'use client';

import { useState, useEffect, useMemo } from 'react';
import { Tool, Category } from '@/types';
import { parseMarkdownToTools, filterTools } from '@/utils/parser';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import ToolGrid from '@/components/ToolGrid';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPricingModels, setSelectedPricingModels] = useState<string[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Read the markdown file from the free-for-dev folder
        const response = await fetch('/free-for-dev/README.md');
        const markdownContent = await response.text();
        
        const { tools: parsedTools, categories: parsedCategories } = parseMarkdownToTools(markdownContent);
        
        setTools(parsedTools);
        setCategories(parsedCategories);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to empty arrays if loading fails
        setTools([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredTools = useMemo(() => {
    return filterTools(tools, {
      search: searchTerm,
      category: selectedCategory,
      pricingModel: selectedPricingModels
    });
  }, [tools, searchTerm, selectedCategory, selectedPricingModels]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalResults={filteredTools.length}
      />
      
      <div className="flex">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          selectedPricingModels={selectedPricingModels}
          onCategoryChange={setSelectedCategory}
          onPricingModelChange={setSelectedPricingModels}
        />
        
        <main className="flex-1 min-h-screen">
          <ToolGrid tools={filteredTools} />
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Built with ❤️ for the developer community. Data sourced from{' '}
            <a
              href="https://github.com/ripienaar/free-for-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              free-for-dev
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
