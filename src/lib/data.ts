import { Tool, Category } from '@/types';
import { parseMarkdownToTools } from '@/utils/parser';

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/ripienaar/free-for-dev/refs/heads/master/README.md';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface CachedData {
  tools: Tool[];
  categories: Category[];
  timestamp: number;
}

// In-memory cache for Edge runtime compatibility
let memoryCache: CachedData | null = null;

async function fetchFromGitHub(): Promise<string> {
  try {
    const response = await fetch(GITHUB_RAW_URL, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error fetching from GitHub:', error);
    throw error;
  }
}

function loadFromMemoryCache(): CachedData | null {
  if (!memoryCache) return null;
  
  // Check if cache is still valid
  if (Date.now() - memoryCache.timestamp < CACHE_DURATION) {
    return memoryCache;
  }
  
  // Cache expired
  memoryCache = null;
  return null;
}

function saveToMemoryCache(data: CachedData): void {
  memoryCache = data;
}

export async function getToolsData(): Promise<{ tools: Tool[]; categories: Category[]; lastUpdated?: string }> {
  try {
    // Try to load from memory cache first
    const cachedData = loadFromMemoryCache();
    if (cachedData) {
      console.log('Using cached data from memory');
      return { 
        tools: cachedData.tools, 
        categories: cachedData.categories,
        lastUpdated: new Date(cachedData.timestamp).toISOString()
      };
    }

    console.log('Fetching fresh data from GitHub');
    
    // Fetch fresh data from GitHub
    const markdownContent = await fetchFromGitHub();
    const { tools, categories } = parseMarkdownToTools(markdownContent);
    
    const timestamp = Date.now();
    
    // Save to memory cache
    saveToMemoryCache({
      tools,
      categories,
      timestamp
    });
    
    return { 
      tools, 
      categories,
      lastUpdated: new Date(timestamp).toISOString()
    };
  } catch (error) {
    console.error('Error in getToolsData:', error);
    
    // Fallback to public endpoint if GitHub fails
    try {
      const fallbackResponse = await fetch('https://free-on.pages.dev/free-for-dev/README.md');
      if (fallbackResponse.ok) {
        const fallbackContent = await fallbackResponse.text();
        const { tools, categories } = parseMarkdownToTools(fallbackContent);
        return { tools, categories };
      }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
    }
    
    // Return empty data if all fails
    return { tools: [], categories: [] };
  }
}

export async function getToolsMetadata() {
  const { tools, categories, lastUpdated } = await getToolsData();
  
  return {
    totalTools: tools.length,
    totalCategories: categories.length,
    freeTools: tools.filter(t => t.pricingModel === 'free').length,
    freemiumTools: tools.filter(t => t.pricingModel === 'freemium').length,
    lastUpdated: lastUpdated || new Date().toISOString()
  };
}
