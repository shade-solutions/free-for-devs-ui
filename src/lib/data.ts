import fs from 'fs/promises';
import path from 'path';
import { Tool, Category } from '@/types';
import { parseMarkdownToTools } from '@/utils/parser';

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/ripienaar/free-for-dev/refs/heads/master/README.md';
const CACHE_FILE = path.join(process.cwd(), 'data', 'tools-cache.json');
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface CachedData {
  tools: Tool[];
  categories: Category[];
  timestamp: number;
}

async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

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

async function loadFromCache(): Promise<CachedData | null> {
  try {
    const cacheData = await fs.readFile(CACHE_FILE, 'utf-8');
    const parsed: CachedData = JSON.parse(cacheData);
    
    // Check if cache is still valid
    if (Date.now() - parsed.timestamp < CACHE_DURATION) {
      return parsed;
    }
  } catch (error) {
    console.log('No valid cache found');
  }
  
  return null;
}

async function saveToCache(data: CachedData): Promise<void> {
  try {
    await ensureDataDirectory();
    await fs.writeFile(CACHE_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
}

export async function getToolsData(): Promise<{ tools: Tool[]; categories: Category[]; lastUpdated?: string }> {
  try {
    // Try to load from cache first
    const cachedData = await loadFromCache();
    if (cachedData) {
      console.log('Using cached data');
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
    
    // Save to cache
    await saveToCache({
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
    
    // Fallback to local file if available
    try {
      const localPath = path.join(process.cwd(), 'public', 'free-for-dev', 'README.md');
      const localContent = await fs.readFile(localPath, 'utf-8');
      const { tools, categories } = parseMarkdownToTools(localContent);
      return { tools, categories };
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      return { tools: [], categories: [] };
    }
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
