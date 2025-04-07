import React, { useContext, useEffect } from 'react';
import { NewsContext } from '../components/NewsContext';
import NewsCard from '../components/NewCard';
import { Bookmark, Trash2 } from 'lucide-react';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(NewsContext);

  useEffect(() => {
    document.title = 'NewsReader - Favorites';
  }, []);

  // Sorts favorites by date added (newest first)always
  const sortedFavorites = [...favorites].sort((a, b) => {
    return new Date(b.addedAt) - new Date(a.addedAt);
  });

  // Clears all favorites
  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorite articles?')) {
      sortedFavorites.forEach(article => removeFromFavorites(article.url));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Bookmark className="mr-2" /> Saved Articles
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your collection of saved news articles
        </p>
      </div>

      {/* Favorites List */}
      {sortedFavorites.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              {sortedFavorites.length} saved article{sortedFavorites.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={clearAllFavorites}
              className="flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
            >
              <Trash2 size={16} className="mr-1" /> Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFavorites.map((article, index) => (
              <NewsCard key={article.url || index} article={article} index={index} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Bookmark size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">No saved articles</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Articles you save will appear here. Click the bookmark icon on any article to add it to your favorites.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;