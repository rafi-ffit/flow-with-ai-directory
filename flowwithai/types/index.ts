export interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  tags: string[];
  website: string;
  logo: string;
  featured: boolean;
  dateAdded: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

export interface FilterState {
  category: string;
  pricing: string;
  tags: string[];
  search: string;
  sort: 'Newest' | 'Popular' | 'Trending';
}
