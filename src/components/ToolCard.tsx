import { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
}

const pricingColors = {
  free: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  freemium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  paid: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  trial: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
};

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:-translate-y-1">
      {/* Logo and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={tool.logoUrl}
              alt={`${tool.name} logo`}
              className="w-12 h-12 rounded-xl object-cover bg-gray-100 dark:bg-gray-700"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-logo.svg';
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{tool.domain}</p>
          </div>
        </div>
        
        {/* Status Badge */}
        <img
          src={`https://img.shields.io/website?url=https%3A%2F%2F${tool.domain}&up_message=online&down_message=offline&style=flat-square&color=4ade80&labelColor=gray`}
          alt="Status"
          className="h-5"
        />
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
        {tool.description}
      </p>

      {/* Features */}
      {tool.features.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Key Features
          </h4>
          <ul className="space-y-1">
            {tool.features.slice(0, 2).map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tool.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${pricingColors[tool.pricingModel]}`}>
          {tool.pricingModel === 'freemium' ? 'Freemium' : 
           tool.pricingModel === 'trial' ? 'Free Trial' :
           tool.pricingModel === 'paid' ? 'Paid' : 'Free'}
        </span>
        
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
        >
          Visit Site
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
