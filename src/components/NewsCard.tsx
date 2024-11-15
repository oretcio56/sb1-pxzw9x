import React from 'react';
import { format } from 'date-fns';
import { Share2, Star, MessageSquare, ThumbsUp } from 'lucide-react';
import { Article } from '../types/news';
import { useStore } from '../store/useStore';
import { CommentSection } from './CommentSection';

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const [showComments, setShowComments] = React.useState(false);
  const { addReadArticle, readArticles } = useStore((state) => ({
    addReadArticle: state.addReadArticle,
    readArticles: state.readArticles,
  }));

  const isRead = readArticles.includes(article.url);

  const handleClick = () => {
    addReadArticle(article.url);
    window.open(article.url, '_blank');
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={article.urlToImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800'}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className={`text-xl font-bold mb-2 text-gray-900 dark:text-white ${isRead ? 'opacity-60' : ''}`}>
          {article.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{article.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{article.source.name}</span>
          <span>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#54b9ff]">
              <ThumbsUp size={18} />
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#54b9ff]"
            >
              <MessageSquare size={18} />
            </button>
            <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#54b9ff]">
              <Star size={18} />
            </button>
            <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#54b9ff]">
              <Share2 size={18} />
            </button>
          </div>
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-[#54b9ff] text-white rounded-md hover:bg-[#4bf3c8] transition-colors"
          >
            Read More
          </button>
        </div>

        {showComments && <CommentSection articleUrl={article.url} />}
      </div>
    </article>
  );
}