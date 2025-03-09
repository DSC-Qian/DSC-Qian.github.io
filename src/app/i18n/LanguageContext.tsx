'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from './locales/en.json';
import zh from './locales/zh.json';

// Define translation data structure
interface TranslationData {
  [key: string]: TranslationData | string | string[] | Record<string, unknown>;
}

// Define context type
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => any;
  tString: (key: string) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  tString: () => '',
});

// Define available languages
const languages: Record<string, TranslationData> = {
  en: en as TranslationData,
  zh: zh as TranslationData,
};

// Create language provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Get preferred language from localStorage or default to 'en'
  const getInitialLanguage = () => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('language');
      if (storedLanguage && Object.keys(languages).includes(storedLanguage)) {
        return storedLanguage;
      }
    }
    return 'en';
  };

  const [language, setLanguage] = useState<string>(getInitialLanguage);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  // Translation function that returns any type
  const t = (key: string): any => {
    const keys = key.split('.');
    let value: TranslationData | string | string[] | Record<string, unknown> = 
      languages[language as keyof typeof languages];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        const objValue = value as TranslationData;
        value = objValue[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value;
  };

  // Translation function specifically for strings (for React nodes)
  const tString = (key: string): string => {
    const value = t(key);
    if (typeof value === 'string') {
      return value;
    }
    return key; // Fallback to key
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tString }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for using the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Handle SSR (Server-Side Rendering)
// Don't assign to module directly
export const getInitialProps = async () => {
  return {
    translations: {
      en,
      zh,
    },
  };
}; 