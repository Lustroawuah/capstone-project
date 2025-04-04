import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookmarkPlus, BookmarkCheck, ExternalLink } from 'lucide-react';
import { NewsContext } from '../components/NewsContext';

const NewsCard = ({ article, index }) => {
  const { addToFavorites, removeFromFavorites, isInFavorites } = useContext(NewsContext);
  
  // Generate a unique ID for the article
  const articleId = article.url ? 
    encodeURIComponent(article.url.split('/').pop() || index) 
    : index;
  
  // Check if article is in favorites
  const favorite = isInFavorites(article.url);
  
  // Format publication date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(article.url);
    } else {
      addToFavorites(article);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.01]">
      <Link to={`/article/${articleId}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title || 'News'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/api/placeholder/400/240';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">No Image</span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <button
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-full ${
                favorite 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300'
              }`}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {favorite ? <BookmarkCheck size={18} /> : <BookmarkPlus size={18} />}
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {article.source?.name || 'News'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(article.publishedAt)}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold line-clamp-2 mb-2">
            {article.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
            {article.description || 'No description available'}
          </p>
          
          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
              Read more <ExternalLink size={16} className="ml-1" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;