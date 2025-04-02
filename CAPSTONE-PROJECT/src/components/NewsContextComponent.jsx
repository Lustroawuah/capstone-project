import { createContext, useContext, useState, useEffect } from 'react';
import { fetchNews, searchNews } from '../NewsApi';

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const addFavorite = (article) => {
    setFavorites([...favorites, article]);
  };

  const removeFavorite = (url) => {
    setFavorites(favorites.filter(article => article.url !== url));
  };

  const loadNews = async (category = 'general') => {
    setLoading(true);
    const news = await fetchNews(category);
    setArticles(news);
    setLoading(false);
  };

  const searchArticles = async (query) => {
    setLoading(true);
    const results = await searchNews(query);
    setArticles(results);
    setLoading(false);
  };

  return (
    <NewsContext.Provider value={{
      articles,
      favorites,
      loading,
      loadNews,
      searchArticles,
      addFavorite,
      removeFavorite
    }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);