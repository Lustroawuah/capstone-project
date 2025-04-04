import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { NewsContext } from '../components/NewsContext';
import NewsCard from '../components/NewCard';
import { Search as SearchIcon } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Search = () => {
  const location = useLocation();
  const { performSearch } = useContext(NewsContext);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');

    if (query) {
      setSearchQuery(query);
      searchNews(query);
    }
  }, [location.search]);

  const searchNews = async (query) => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const results = await performSearch(query);
      setSearchResults(results);
      document.title = `Search: ${query} - NewsReader`;
    } catch (err) {
      setError('Failed to perform search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchNews(searchQuery);
      // Update URL without reloading
      const url = new URL(window.location);
      url.searchParams.set('q', searchQuery);
      window.history.pushState({}, '', url);
    }
  };

  return (
    <div>
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <SearchIcon className="mr-2" /> Search News
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for news articles..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400">
              <SearchIcon size={20} />
            </div>
            <button
              type="submit"
              className="absolute right-3 top-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Search Results */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
        </div>
      ) : (
        <>
          {searchResults.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Found {searchResults.length} results for "{searchQuery}"
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((article, index) => (
                  <NewsCard key={article.url || index} article={article} index={index} />
                ))}
              </div>
            </>
          ) : (
            <>
              {searchQuery && (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    No results found for "{searchQuery}". Please try a different search term.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Search;