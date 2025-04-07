import React, { useContext, useEffect } from 'react';
import { NewsContext } from '../components/NewsContext';
import NewsCard from '../components/NewCard';
import { Newspaper } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { 
    headlines, 
    categoryNews, 
    loading, 
    error, 
    currentCategory, 
    changeCategory, 
    categories 
  } = useContext(NewsContext);

  useEffect(() => {
    document.title = 'NewsReader - Home';
  }, []);

  // Gets news for the current category
  const displayNews = currentCategory === 'general' 
    ? headlines 
    : categoryNews[currentCategory] || [];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Newspaper className="mr-2" /> Welcome to Your Daily Source of News
        </h1>
        
      </div>

      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => changeCategory(category)}
              className={`px-4 py-2 rounded-full capitalize whitespace-nowrap transition-colors ${
                currentCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
        </div>
      ) : (
        <>
          {/* News Grid */}
          {displayNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayNews.map((article, index) => (
                <NewsCard key={article.url || index} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                No news available for this category. Please try another category.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;