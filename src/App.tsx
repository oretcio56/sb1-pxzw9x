import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { useStore } from './store/useStore';

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Router>
        <div className="min-h-screen bg-[#eef0f9] dark:bg-gray-900 text-gray-900 dark:text-white">
          <Header />
          <main className="max-w-7xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
            </Routes>
          </main>
        </div>
      </Router>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;