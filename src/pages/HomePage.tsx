import React, { useEffect, useState, useCallback } from 'react';
import { NewsCard } from '../components/NewsCard';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import { ErrorFallback } from '../components/ErrorFallback';
import { fetchNews } from '../services/api';
import { Article } from '../types/news';
import { useStore } from '../store/useStore';
import { Newspaper } from 'lucide-react';

export function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const language = useStore((state) => state.language);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchNews({
        page: currentPage,
        q: searchQuery,
        language,
      });
      
      if (response.articles && Array.isArray(response.articles)) {
        setArticles(response.articles);
        setTotalPages(Math.ceil((response.totalResults || 0) / 10));
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch news');
      // Keep existing articles if available
      if (articles.length === 0) {
        setArticles([]);
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, language, articles.length]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-8">
        <Newspaper size={24} className="text-primary" />
        <h1 className="text-3xl font-bold text-center">Latest News</h1>
      </div>

      <SearchBar onSearch={setSearchQuery} />

      {loading && articles.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <ErrorFallback error={error} resetError={loadNews} />
      ) : articles.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No articles found</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}