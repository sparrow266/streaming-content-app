import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Streaming Content App' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Stream your favorite content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-primary-700 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" legacyBehavior>
            <a className="flex items-center space-x-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-xl font-bold">StreamFlix</span>
            </a>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" legacyBehavior>
                  <a className="hover:text-primary-200 transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about" legacyBehavior>
                  <a className="hover:text-primary-200 transition-colors">About</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" legacyBehavior>
                <a className="flex items-center space-x-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="text-lg font-bold">StreamFlix</span>
                </a>
              </Link>
              <p className="text-sm text-gray-400 mt-2">Stream your favorite content anytime, anywhere.</p>
            </div>
            
            <div className="flex space-x-6">
              <Link href="/" legacyBehavior>
                <a className="hover:text-primary-300 transition-colors">Home</a>
              </Link>
              <Link href="/about" legacyBehavior>
                <a className="hover:text-primary-300 transition-colors">About</a>
              </Link>
              <Link href="/contact" legacyBehavior>
                <a className="hover:text-primary-300 transition-colors">Contact</a>
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} StreamFlix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
