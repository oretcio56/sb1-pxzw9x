import { NewsResponse } from '../types/news';
import toast from 'react-hot-toast';

const API_KEY = '28aaaed9b7d84360ab3163c725c256a8';
const BASE_URL = 'https://newsapi.org/v2';

// Fallback data for development when API is unavailable
const fallbackData: NewsResponse = {
  status: 'ok',
  totalResults: 2,
  articles: [
    {
      title: 'Sample News Article 1',
      description: 'This is a fallback article for development purposes when the API is unavailable.',
      url: 'https://example.com',
      urlToImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800',
      publishedAt: new Date().toISOString(),
      source: { name: 'Development News' },
      content: 'Sample content for development',
      author: 'Development Team'
    },
    {
      title: 'Sample News Article 2',
      description: 'Another fallback article for development purposes.',
      url: 'https://example.com',
      urlToImage: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800',
      publishedAt: new Date().toISOString(),
      source: { name: 'Development News' },
      content: 'More sample content for development',
      author: 'Development Team'
    }
  ]
};

export async function fetchNews(params: {
  category?: string;
  page?: number;
  q?: string;
  language?: string;
}): Promise<NewsResponse> {
  const searchParams = new URLSearchParams({
    apiKey: API_KEY,
    pageSize: '10',
    page: (params.page || 1).toString(),
    language: params.language || 'en',
    ...(params.category && { category: params.category }),
    ...(params.q && { q: params.q }),
  });

  try {
    const response = await fetch(`${BASE_URL}/top-headlines?${searchParams}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
      // Add cache control to prevent stale responses
      cache: 'no-cache',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error occurred' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message || 'API returned an error');
    }

    return data;
  } catch (error) {
    console.error('News API Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch news';
    toast.error(message);

    // In development, return fallback data instead of throwing
    if (import.meta.env.DEV) {
      console.log('Using fallback data for development');
      return fallbackData;
    }

    throw error;
  }
}