import { Tool, Category } from '@/types';

const PRICING_PATTERNS = {
  free: [
    'free', 'no cost', 'at no charge', 'without charge', 'gratis',
    'complimentary', 'no fee', 'zero cost'
  ],
  freemium: [
    'free tier', 'free plan', 'free version', 'starter plan',
    'basic plan', 'limited free', 'up to', 'free forever'
  ],
  trial: [
    'free trial', 'trial', 'demo', 'evaluation', 'test drive'
  ]
};

function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url.replace(/^https?:\/\//, '').replace('www.', '').split('/')[0];
  }
}

function determinePricingModel(description: string): Tool['pricingModel'] {
  const lowerDesc = description.toLowerCase();
  
  if (PRICING_PATTERNS.freemium.some(pattern => lowerDesc.includes(pattern))) {
    return 'freemium';
  }
  if (PRICING_PATTERNS.trial.some(pattern => lowerDesc.includes(pattern))) {
    return 'trial';
  }
  if (PRICING_PATTERNS.free.some(pattern => lowerDesc.includes(pattern))) {
    return 'free';
  }
  
  return 'freemium'; // Default assumption for most services
}

function extractFeatures(description: string): string[] {
  const features: string[] = [];
  const sentences = description.split(/[.!?]/).map(s => s.trim()).filter(Boolean);
  
  sentences.forEach(sentence => {
    if (sentence.length > 10 && sentence.length < 100) {
      features.push(sentence);
    }
  });
  
  return features.slice(0, 3); // Limit to 3 key features
}

function extractTags(description: string, category: string): string[] {
  const commonTags = [
    'API', 'CLI', 'Dashboard', 'Mobile', 'Web', 'Cloud', 'Open Source',
    'SaaS', 'Self-hosted', 'No-code', 'Analytics', 'Monitoring', 'SSL',
    'CDN', 'Storage', 'Database', 'Authentication', 'Email', 'Hosting'
  ];
  
  const tags = new Set<string>();
  const lowerDesc = description.toLowerCase();
  
  commonTags.forEach(tag => {
    if (lowerDesc.includes(tag.toLowerCase())) {
      tags.add(tag);
    }
  });
  
  // Add category as a tag
  tags.add(category);
  
  return Array.from(tags).slice(0, 5);
}

export function parseMarkdownToTools(markdownContent: string): { tools: Tool[], categories: Category[] } {
  const tools: Tool[] = [];
  const categoryMap = new Map<string, number>();
  
  // Split content by major sections
  const sections = markdownContent.split(/^##\s+(.+)$/gm);
  
  let currentCategory = '';
  
  for (let i = 1; i < sections.length; i += 2) {
    const categoryTitle = sections[i].trim();
    const categoryContent = sections[i + 1] || '';
    
    // Skip table of contents and other non-service sections
    if (categoryTitle.toLowerCase().includes('table of contents') ||
        categoryTitle.toLowerCase().includes('back to top') ||
        categoryContent.length < 50) {
      continue;
    }
    
    currentCategory = categoryTitle;
    categoryMap.set(currentCategory, 0);
    
    // Extract tools from bullet points
    const bulletPoints = categoryContent.match(/^\s*\*\s+\[([^\]]+)\]\(([^)]+)\)\s+[-—]\s*(.+)$/gm) || [];
    
    bulletPoints.forEach((line, index) => {
      const match = line.match(/^\s*\*\s+\[([^\]]+)\]\(([^)]+)\)\s+[-—]\s*(.+)$/);
      if (match) {
        const [, name, url, description] = match;
        const domain = extractDomain(url);
        const pricingModel = determinePricingModel(description);
        const features = extractFeatures(description);
        const tags = extractTags(description, currentCategory);
        
        const tool: Tool = {
          id: `${domain}-${index}`,
          name: name.trim(),
          description: description.trim(),
          url: url.trim(),
          domain,
          category: currentCategory,
          pricingModel,
          features,
          logoUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=180`,
          tags
        };
        
        tools.push(tool);
        categoryMap.set(currentCategory, (categoryMap.get(currentCategory) || 0) + 1);
      }
    });
  }
  
  // Create categories array
  const categories: Category[] = Array.from(categoryMap.entries()).map(([name, count]) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    description: `${count} tools available`,
    count
  }));
  
  return { tools, categories };
}

export function filterTools(tools: Tool[], filters: { search?: string; category?: string; pricingModel?: string[] }): Tool[] {
  return tools.filter(tool => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = `${tool.name} ${tool.description} ${tool.tags.join(' ')}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }
    
    // Category filter
    if (filters.category && filters.category !== 'all') {
      if (tool.category.toLowerCase().replace(/\s+/g, '-') !== filters.category) {
        return false;
      }
    }
    
    // Pricing model filter
    if (filters.pricingModel && filters.pricingModel.length > 0) {
      if (!filters.pricingModel.includes(tool.pricingModel)) {
        return false;
      }
    }
    
    return true;
  });
}

export function getStatusBadgeUrl(domain: string): string {
  return `https://img.shields.io/website?url=https%3A%2F%2F${domain}&up_message=online&down_message=offline&style=flat-square`;
}
