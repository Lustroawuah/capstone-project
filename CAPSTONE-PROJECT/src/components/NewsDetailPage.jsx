import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NewsContext } from '../components/NewsContext';
import { ArrowLeft, BookmarkPlus, BookmarkCheck, Globe, Calendar, User } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { headlines, categoryNews, favorites, addToFavorites, removeFromFavorites, isInFavorites } = useContext(NewsContext);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findArticle = () => {
      setLoading(true);
      
      // First check in favorites
      const favoriteArticle = favorites.find(article => {
        const articleId = article.url ? encodeURIComponent(article.url.split('/').pop()) : '';
        return articleId === id;
      });
      
      if (favoriteArticle) {
        setArticle(favoriteArticle);
        document.title = `${favoriteArticle.title} - NewsReader`;
        setLoading(false);
        return;
      }
      
      // Then check in headlines
      const headlineArticle = headlines.find(article => {
        const articleId = article.url ? encodeURIComponent(article.url.split('/').pop()) : '';
        return articleId === id;
      });
      
      if (headlineArticle) {
        setArticle(headlineArticle);
        document.title = `${headlineArticle.title} - NewsReader`;
        setLoading(false);
        return;
      }
      
      // Finally check in all category news
      for (const category in categoryNews) {
        const categoryArticle = categoryNews[category]?.find(article => {
          const articleId = article.url ? encodeURIComponent(article.url.split('/').pop()) : '';
          return articleId === id;
        });
        
        if (categoryArticle) {
          setArticle(categoryArticle);
          document.title = `${categoryArticle.title} - NewsReader`;
          setLoading(false);
          return;
        }
      }
      
      // If we still haven't found it, try to decode the ID as it might be a URL
      try {
        // This could potentially be the full URL or just the slug
        const decodedId = decodeURIComponent(id);
        
        // Check if we can find the article with this URL in any of our data sources
        const allArticles = [
          ...favorites,
          ...headlines,
          ...Object.values(categoryNews).flat()
        ];
        
        const matchedArticle = allArticles.find(article => 
          article.url && article.url.includes(decodedId)
        );
        
        if (matchedArticle) {
          setArticle(matchedArticle);
          document.title = `${matchedArticle.title} - NewsReader`;
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error decoding article ID:", error);
      }
      
      // If we get here, we couldn't find the article
      setLoading(false);
    };
    
    findArticle();
    
    return () => {
      document.title = 'NewsReader';
    };
  }, [id, headlines, categoryNews, favorites]);

  // Format publication date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle favorite toggle
  const toggleFavorite = () => {
    if (!article) return;
    
    if (isInFavorites(article.url)) {
      removeFromFavorites(article.url);
    } else {
      addToFavorites(article);
    }
  };

  // Go back to previous page
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft size={20} className="mr-1" /> Back to articles
      </button>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
        </div>
      ) : article ? (
        <>
          {/* Article Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-300 mb-4 gap-4">
              {article.source?.name && (
                <div className="flex items-center">
                  <Globe size={16} className="mr-1" />
                  <span>{article.source.name}</span>
                </div>
              )}
              
              {article.publishedAt && (
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              )}
              
              {article.author && (
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  <span>{article.author}</span>
                </div>
              )}
            </div>
            
            {/* Save Button */}
            <button
              onClick={toggleFavorite}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                isInFavorites(article.url)
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {isInFavorites(article.url) ? (
                <>
                  <BookmarkCheck size={16} className="mr-2" /> Saved
                </>
              ) : (
                <>
                  <BookmarkPlus size={16} className="mr-2" /> Save Article
                </>
              )}
            </button>
          </div>
          
          {/* Featured Image */}
          {article.urlToImage && (
            <div className="mb-6">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-auto rounded-lg shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/api/placeholder/800/400';
                }}
              />
              {article.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                  {article.description}
                </p>
              )}
            </div>
          )}
          
          {/* Article Content */}
          <div className="prose dark:prose-invert prose-lg max-w-none">
            {article.content ? (
              <p>{article.content.split('[+')[0]}</p>
            ) : article.description ? (
              <p>{article.description}</p>
            ) : (
              <p>No content available for this article.</p>
            )}
            
            {/* Read More Link */}
            <div className="mt-8 not-prose">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
              >
                Read Full Article
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Article not found</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6">
            The article you're looking for doesn't exist or may have been removed.
          </p>
          <button
            onClick={goBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsDetails;