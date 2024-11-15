import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Bell, BellOff, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';

const categories = ['General', 'Business', 'Technology', 'Entertainment', 'Sports', 'Science', 'Health'];

export function Header() {
  const { isDarkMode, language, notificationsEnabled, toggleDarkMode, toggleLanguage, toggleNotifications } = useStore();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-[#54b9ff]">
            LatestNewsWorldWide
          </Link>
          
          <nav className="hidden md:flex space-x-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="text-gray-600 dark:text-gray-300 hover:text-[#54b9ff] transition-colors"
              >
                {category}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#54b9ff] transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#54b9ff] transition-colors"
            >
              <Globe size={20} />
              <span className="ml-1">{language.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleNotifications}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#54b9ff] transition-colors"
            >
              {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}