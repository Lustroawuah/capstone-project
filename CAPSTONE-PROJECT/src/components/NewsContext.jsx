import React, { createContext, useState, useEffect } from 'react';
import { fetchTopHeadlines, fetchNewsByCategory, searchNews } from '../services/NewsApi';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [headlines, setHeadlines] = useState([]);
  const [categoryNews, setCategoryNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('general');
  const [favorites, setFavorites] = useState([]);
  
  const categories = [
    'general', 
    'business', 
    'technology', 
    'sports', 
    'health', 
    'entertainment', 
    'science'
  ];

  // Loads favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Saves favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetches headlines on mount
  useEffect(() => {
    const getTopHeadlines = async () => {
      try {
        setLoading(true);
        const data = await fetchTopHeadlines();
        setHeadlines(data.articles);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch headlines');
        setLoading(false);
      }
    };
    
    getTopHeadlines();
  }, []);

  // Fetches news by category
  const loadCategoryNews = async (category) => {
    if (categoryNews[category]) return; // Already loaded
    
    try {
      setLoading(true);
      const data = await fetchNewsByCategory(category);
      setCategoryNews(prev => ({
        ...prev,
        [category]: data.articles
      }));
      setLoading(false);
    } catch (err) {
      setError(`Failed to fetch ${category} news`);
      setLoading(false);
    }
  };

  // Changes current category
  const changeCategory = (category) => {
    setCurrentCategory(category);
    if (!categoryNews[category]) {
      loadCategoryNews(category);
    }
  };

  // Search news
  const performSearch = async (query) => {
    try {
      setLoading(true);
      const data = await searchNews(query);
      setLoading(false);
      return data.articles;
    } catch (err) {
      setError('Search failed');
      setLoading(false);
      return [];
    }
  };

  // Adds article to favorites
  const addToFavorites = (article) => {
    const exists = favorites.some(fav => fav.url === article.url);
    if (!exists) {
      setFavorites([...favorites, {...article, addedAt: new Date().toISOString()}]);
    }
  };

  // Removes article from favorites
  const removeFromFavorites = (articleUrl) => {
    setFavorites(favorites.filter(article => article.url !== articleUrl));
  };

  // Checks if article is in favorites
  const isInFavorites = (articleUrl) => {
    return favorites.some(article => article.url === articleUrl);
  };

  return (
    <NewsContext.Provider value={{
      headlines,
      categoryNews,
      loading,
      error,
      currentCategory,
      changeCategory,
      categories,
      performSearch,
      favorites,
      addToFavorites,
      removeFromFavorites,
      isInFavorites
    }}>
      {children}
    </NewsContext.Provider>
  );
};