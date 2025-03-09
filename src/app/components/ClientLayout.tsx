'use client';

import LanguageSwitcher from './LanguageSwitcher';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/about" className="text-xl font-bold">Jiali Qian</a>
            </div>
            <div className="flex items-center space-x-8">
              <a href="/about" className="hover:text-gray-600">About</a>
              <a href="/projects" className="hover:text-gray-600">Projects</a>
              <a href="/contact" className="hover:text-gray-600">Contact</a>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-16">
        {children}
      </main>
      <footer className="bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-500">© {new Date().getFullYear()} Jiali Qian. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
} 