import axios from 'axios';

const API_KEY = 'b9fda8b2bb794c18b0b59e18cf2083e9';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (category = 'general', searchQuery = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country: 'us',
        category,
        q: searchQuery,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export const searchNews = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        sortBy: 'publishedAt',
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error searching news:', error);
    return [];
  }
};