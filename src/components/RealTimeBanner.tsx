import Link from 'next/link';

interface RealTimeBannerProps {
  lastUpdated?: string;
  totalTools: number;
}

export default function RealTimeBanner({ lastUpdated, totalTools }: RealTimeBannerProps) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-b border-green-200 dark:border-green-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Live Data
              </span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              • Synced directly from{' '}
              <a 
                href="https://github.com/ripienaar/free-for-dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                free-for-dev
              </a>{' '}
              repository
            </span>
            <span className="hidden md:inline text-sm text-gray-500 dark:text-gray-500">
              • {totalTools} tools available
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Updated: {new Date(lastUpdated).toLocaleDateString()}
              </span>
            )}
            <Link
              href="/about"
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
