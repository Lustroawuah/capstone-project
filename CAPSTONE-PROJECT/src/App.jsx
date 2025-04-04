import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Hompage';
import Search from './components/Searchpage';
import Favorites from './components/FavoritesPage';
import NewsDetails from './components/NewsDetailPage';
import { NewsProvider } from './components/NewsContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    setDarkMode(savedTheme === 'true');
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save theme preference
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <NewsProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-white">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/article/:id" element={<NewsDetails />} />
            </Routes>
          </main>
          <footer className="p-4 bg-gray-100 dark:bg-gray-800 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">© {new Date().getFullYear()} News Reader App</p>
          </footer>
        </div>
      </Router>
    </NewsProvider>
  );
}

export default App;