// services/newsApi.js

const API_KEY = "b9fda8b2bb794c18b0b59e18cf2083e9" 
const BASE_URL = 'https://newsapi.org/v2';

// Function to fetch top headlines
export const fetchTopHeadlines = async (country = 'us') => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=${country}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
};

// Function to fetch news by category
export const fetchNewsByCategory = async (category, country = 'us') => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    throw error;
  }
};

// Function to search news
export const searchNews = async (query, language = 'en') => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(query)}&language=${language}&sortBy=publishedAt&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

// Function to get news article by URL - for details page
export const getArticleByUrl = async (url) => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?qInTitle=${encodeURIComponent(url)}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data.articles[0]; // Return the first match
  } catch (error) {
    console.error('Error fetching article details:', error);
    throw error;
  }
};