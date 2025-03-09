'use client';

import Link from 'next/link';
import { useLanguage } from './i18n/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-8 md:p-24">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Hello, I&apos;m Jiali Qian
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12">
          {t('about.summary')}
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link 
            href="/about" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            {t('nav.about')}
          </Link>
          <Link 
            href="/projects" 
            className="bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-200 px-6 py-3 rounded-lg shadow-md transition"
          >
            {t('nav.projects')}
          </Link>
          <Link 
            href="/contact" 
            className="bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-200 px-6 py-3 rounded-lg shadow-md transition"
          >
            {t('nav.contact')}
          </Link>
        </div>
      </div>
    </main>
  );
}
