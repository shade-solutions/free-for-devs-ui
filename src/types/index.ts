export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  domain: string;
  category: string;
  pricingModel: 'free' | 'freemium' | 'paid' | 'trial';
  features: string[];
  logoUrl: string;
  isActive?: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface FilterOptions {
  category: string;
  pricingModel: string[];
  search: string;
  isActive?: boolean;
}
