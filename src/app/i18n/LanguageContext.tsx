'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'zh';

interface TranslationItem {
  name: string;
  date: string;
  points: string[];
}

interface Translations {
  nav: {
    about: string;
    projects: string;
    contact: string;
  };
  about: {
    title: string;
    summary: string;
    description: string;
    contact: {
      location: string;
      phone: string;
      email: string;
      linkedin: string;
    };
    skills: {
      title: string;
      ml_ai: string;
      ml_ai_items: string[];
      data_cloud: string;
      data_cloud_items: string[];
      development: string;
      development_items: string[];
    };
    education: {
      title: string;
      nyu: {
        school: string;
        degree: string;
        location: string;
        date: string;
        gpa: string;
        courses: string;
      };
      ucsd: {
        school: string;
        degree: string;
        location: string;
        date: string;
        gpa: string;
      };
    };
    experience: {
      title: string;
      ucsd_job: {
        title: string;
        company: string;
        date: string;
        points: string[];
      };
      logitech: {
        title: string;
        company: string;
        date: string;
        points: string[];
      };
    };
    projects: {
      title: string;
      items: TranslationItem[];
    };
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const module = await import(`./locales/${language}.json`);
        setTranslations(module.default);
      } catch (error) {
        console.error('Error loading translations:', error);
        setTranslations(null);
      }
    };
    loadTranslations();
  }, [language]);

  const t = (key: string) => {
    if (!translations) return key;
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 