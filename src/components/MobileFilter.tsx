import { useState } from 'react';
import { Category } from '@/types';

interface MobileFilterProps {
  categories: Category[];
  selectedCategory: string;
  selectedPricingModels: string[];
  onCategoryChange: (category: string) => void;
  onPricingModelChange: (models: string[]) => void;
}

const pricingModels = [
  { id: 'free', label: 'Free', color: 'text-green-600' },
  { id: 'freemium', label: 'Freemium', color: 'text-blue-600' },
  { id: 'trial', label: 'Free Trial', color: 'text-purple-600' },
  { id: 'paid', label: 'Paid', color: 'text-orange-600' }
];

export default function MobileFilter({
  categories,
  selectedCategory,
  selectedPricingModels,
  onCategoryChange,
  onPricingModelChange
}: MobileFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePricingModelToggle = (modelId: string) => {
    if (selectedPricingModels.includes(modelId)) {
      onPricingModelChange(selectedPricingModels.filter(id => id !== modelId));
    } else {
      onPricingModelChange([...selectedPricingModels, modelId]);
    }
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Filters</span>
          {(selectedCategory !== 'all' || selectedPricingModels.length > 0) && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {selectedCategory !== 'all' ? 1 : 0 + selectedPricingModels.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onCategoryChange('all');
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>All Categories</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {categories.reduce((sum, cat) => sum + cat.count, 0)}
                      </span>
                    </div>
                  </button>
                  
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategoryChange(category.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{category.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing Models */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Pricing
                </h3>
                <div className="space-y-3">
                  {pricingModels.map((model) => (
                    <label key={model.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPricingModels.includes(model.id)}
                        onChange={() => handlePricingModelToggle(model.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className={`text-sm font-medium ${model.color}`}>
                        {model.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    onCategoryChange('all');
                    onPricingModelChange([]);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
