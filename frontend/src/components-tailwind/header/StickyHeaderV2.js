import React from "react";
 import { useState, useRef, useEffect } from 'react';
import {Link} from "react-router-dom";

const StickyHeaderV2 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const langMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
  ];

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '/history/' },
    { name: 'Vision', href: '#pricing' },
    { name: 'Membership', href: '#contact' },
    { name: 'Academy', href: '#contact' },
    { name: 'Donation', href: '/donation-tailwind/' },
    { name: 'Contact Us', href: '#contact' },

  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
              {/*<a href="#" className="text-xl font-bold text-gray-900">
              <span className="text-green-500">Brand</span>Name
            </a>*}
              {/* Logo */}
              <Link to={ '/'}>
                <img className="h-16 w-18" src={'/static/assets/images/dib-logo-new.png'} alt="Logo"/>
              </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-green-50"
              >
                {item.name}
              </Link>
            ))}

            {/* Language Dropdown - Desktop */}
            <div className="relative ml-4" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center text-gray-700 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-green-50"
              >
                <span className="mr-1">{languages.find(l => l.name === currentLanguage)?.flag}</span>
                {currentLanguage}
                <svg
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${isLangMenuOpen ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isLangMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang.name);
                          setIsLangMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white transition-colors duration-200 ${currentLanguage === lang.name ? 'bg-green-100 text-green-700' : ''}`}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-500 hover:bg-green-50 focus:outline-none transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`} ref={mobileMenuRef}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-500 hover:bg-green-50 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}

          {/* Language Dropdown - Mobile */}
          <div className="pt-2 border-t border-gray-200 mt-2">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-500 hover:bg-green-50 transition-colors duration-300"
            >
              <span className="mr-1">{languages.find(l => l.name === currentLanguage)?.flag}</span>
              {currentLanguage}
              <svg
                className={`ml-2 h-4 w-4 transition-transform duration-200 ${isLangMenuOpen ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isLangMenuOpen && (
              <div className="mt-1 pl-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLanguage(lang.name);
                      setIsLangMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-500 hover:text-white transition-colors duration-200 ${currentLanguage === lang.name ? 'bg-green-100 text-green-700' : ''}`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StickyHeaderV2;