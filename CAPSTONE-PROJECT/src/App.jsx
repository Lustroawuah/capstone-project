import React,{useContext,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomepageComponent';
import { NewsProvider } from './components/NewsContextComponent';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <NewsProvider>
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Router>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<NewsList />} />
            <Route path="/search/:query" element={<NewsList />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </div>
    </NewsProvider>
  );
};

export default App;
