'use client';

import { useLanguage } from '../i18n/LanguageContext';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Define types for journey items
interface JourneyItem {
  title: string;
  date: string;
  description: string;
  summary?: string;
  category: string;
  logo?: string;
  skills: string[];
}

export default function About() {
  const { t, tString } = useLanguage();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [journeyItems, setJourneyItems] = useState<JourneyItem[]>([]);

  // Categories with their colors
  const categories = [
    { id: 'education', label: tString('about.categories.education') || 'Education', color: 'bg-blue-100 text-blue-800' },
    { id: 'work', label: tString('about.categories.work') || 'Work', color: 'bg-green-100 text-green-800' },
    { id: 'research', label: tString('about.categories.research') || 'Research', color: 'bg-purple-100 text-purple-800' },
    { id: 'project', label: tString('about.categories.project') || 'Project', color: 'bg-amber-100 text-amber-800' }
  ];

  // Initialize journey items from translations
  useEffect(() => {
    const journeyData = t('about.journey.items');
    if (Array.isArray(journeyData)) {
      // Force the type since we know the shape matches
      setJourneyItems(journeyData as unknown as JourneyItem[]);
    }
  }, [t]);

  // Toggle filter selection
  const toggleFilter = (categoryId: string) => {
    setSelectedFilters(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  // Filter journey items based on selected filters
  const filteredJourneyItems = selectedFilters.length === 0 
    ? journeyItems 
    : journeyItems.filter(item => 
        selectedFilters.includes(item.category)
      );

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 relative flex-shrink-0">
              <Image
                src="/profile.png"
                alt="Jiali Qian"
                width={192}
                height={192}
                className="rounded-full object-cover shadow-lg"
                priority
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4">{tString('about.name') || 'Jiali Qian'}</h1>
              <p className="text-xl text-gray-600 mb-4">{tString('about.summary')}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a href={`mailto:${tString('about.contact.email')}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {tString('about.contact.email')}
                </a>
                <a href={`https://${tString('about.contact.linkedin')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href={`https://${tString('about.contact.github')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Content with Filters */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold mb-4">{tString('about.filters.title') || 'Filters'}</h2>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-medium mb-3">{tString('about.filters.categories') || 'Categories'}</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => toggleFilter(category.id)}
                      className={`flex items-center w-full p-2 rounded-md transition-colors ${
                        selectedFilters.includes(category.id)
                          ? category.color
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="flex-1 text-left">{category.label}</span>
                      {selectedFilters.includes(category.id) && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
                {selectedFilters.length > 0 && (
                  <button
                    onClick={() => setSelectedFilters([])}
                    className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    {tString('about.filters.clear') || 'Clear filters'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Timeline Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-8">{tString('about.journey.title') || 'My Journey'}</h2>
            <div className="relative border-l-4 border-indigo-200 pl-6 space-y-12">
              {filteredJourneyItems.length > 0 ? (
                filteredJourneyItems.map((item, index) => {
                  const category = categories.find(cat => cat.id === item.category) || categories[0];
                  
                  return (
                    <div key={index} className="mb-12 relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-10 mt-1.5">
                        <div className={`w-4 h-4 rounded-full ${category.color.split(' ')[0].replace('100', '500')}`}></div>
                      </div>
                      
                      {/* Content card */}
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold">{item.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm ${category.color}`}>
                                {category.label}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{item.date}</p>
                          </div>
                          
                          {/* Optional logo */}
                          {item.logo && (
                            <div className="w-16 h-16 relative flex-shrink-0">
                              <Image
                                src={item.logo}
                                alt={item.title}
                                width={64}
                                height={64}
                                className="object-contain"
                              />
                            </div>
                          )}
                        </div>
                        
                        <p className="text-gray-800 mb-6">{item.description}</p>
                        
                        {/* Summary - shorter than detailed achievements */}
                        {item.summary && (
                          <p className="text-gray-600 mb-6">{item.summary}</p>
                        )}
                        
                        {/* Related skills */}
                        {Array.isArray(item.skills) && item.skills.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">
                              {tString('about.journey.skills') || 'Skills Used'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {item.skills.map((skill: string, skillIndex: number) => (
                                <span
                                  key={skillIndex}
                                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-gray-500">
                  {tString('about.journey.empty') || 'No items match your filters. Try adjusting your selection.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 