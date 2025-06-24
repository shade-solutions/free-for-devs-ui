import { Category } from '@/types';

interface FilterSidebarProps {
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

export default function FilterSidebar({
  categories,
  selectedCategory,
  selectedPricingModels,
  onCategoryChange,
  onPricingModelChange
}: FilterSidebarProps) {
  const handlePricingModelToggle = (modelId: string) => {
    if (selectedPricingModels.includes(modelId)) {
      onPricingModelChange(selectedPricingModels.filter(id => id !== modelId));
    } else {
      onPricingModelChange([...selectedPricingModels, modelId]);
    }
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
      <div className="space-y-8">
        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Categories
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange('all')}
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
                onClick={() => onCategoryChange(category.id)}
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
            }}
            className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}
