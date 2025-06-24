import { Tool } from '@/types';
import ToolCard from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  loading?: boolean;
}

export default function ToolGrid({ tools, loading }: ToolGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-8">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          No tools found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md text-lg">
          Try adjusting your search terms or filters to find what you&apos;re looking for.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Reset Filters
          </button>
          <a
            href="https://github.com/ripienaar/free-for-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors"
          >
            Suggest a Tool
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
