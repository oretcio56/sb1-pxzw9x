import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Comment {
  id: string;
  text: string;
  timestamp: number;
}

interface AppState {
  isDarkMode: boolean;
  language: 'en' | 'es';
  notificationsEnabled: boolean;
  readArticles: string[];
  favoriteCategories: string[];
  comments: Record<string, Comment[]>;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
  toggleNotifications: () => void;
  addReadArticle: (url: string) => void;
  toggleFavoriteCategory: (category: string) => void;
  addComment: (articleUrl: string, text: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      language: 'en',
      notificationsEnabled: false,
      readArticles: [],
      favoriteCategories: [],
      comments: {},
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'es' : 'en' })),
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
      addReadArticle: (url) => set((state) => ({ readArticles: [...state.readArticles, url] })),
      toggleFavoriteCategory: (category) =>
        set((state) => ({
          favoriteCategories: state.favoriteCategories.includes(category)
            ? state.favoriteCategories.filter((c) => c !== category)
            : [...state.favoriteCategories, category],
        })),
      addComment: (articleUrl, text) =>
        set((state) => ({
          comments: {
            ...state.comments,
            [articleUrl]: [
              ...(state.comments[articleUrl] || []),
              {
                id: crypto.randomUUID(),
                text,
                timestamp: Date.now(),
              },
            ],
          },
        })),
    }),
    {
      name: 'news-storage',
    }
  )
);