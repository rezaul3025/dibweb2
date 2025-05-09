import React from "react";

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const StickyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const menuRef = useRef(null);
  const langRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
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
  const [currentLang, setCurrentLang] = useState(languages[0]);

  const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#', dropdown: ['Product 1', 'Product 2'] },
    { name: 'Vision', href: '#' },
    { name: 'Membership', href: '#' },
    {name: 'Prayer Time', href: '#' },
      {name: 'Academy', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Donation', href: '#' },

  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-16">
              {/* Logo */}
              <img src={'/static/assets/images/dib-logo-new.png'} alt="Logo"/>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-4">
                  {menuItems.map((item, index) => (
                      <div key={index} className="relative" ref={item.dropdown ? menuRef : null}>
                          {item.dropdown ? (
                              <>
                                  <button
                                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                                      className="flex items-center text-gray-800 hover:text-green-500"
                                  >
                                      {item.name}
                                      <ChevronDownIcon className="ml-1 h-4 w-4"/>
                                  </button>
                                  {isMenuOpen && (
                                      <div
                                          className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                          {item.dropdown.map((subItem, subIndex) => (
                                              <a
                                                  key={subIndex}
                                                  href="#"
                                                  className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                                              >
                                                  {subItem}
                                              </a>
                                          ))}
                                      </div>
                                  )}
                              </>
                          ) : (
                              <a href={item.href} className="text-gray-800 hover:text-green-500">
                                  {item.name}
                              </a>
                          )}
                      </div>
                  ))}

                  {/* Language Selector */}
                  <div className="relative ml-4" ref={langRef}>
                      <button
                          onClick={() => setIsLangOpen(!isLangOpen)}
                          className="flex items-center text-gray-800 hover:text-green-500"
                      >
                          <GlobeAltIcon className="h-5 w-5"/>
                          <span className="ml-2">{currentLang.flag} {currentLang.name}</span>
                          <ChevronDownIcon className="ml-1 h-4 w-4"/>
                      </button>
                      {isLangOpen && (
                          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50">
                              {languages.map((lang) => (
                                  <button
                                      key={lang.code}
                                      onClick={() => {
                                          setCurrentLang(lang);
                                          setIsLangOpen(false);
                                      }}
                                      className={`flex items-center w-full px-4 py-2 text-left ${
                                          currentLang.code === lang.code
                                              ? 'bg-green-50 text-blue-600'
                                              : 'text-gray-700 hover:bg-gray-100'
                                      }`}
                                  >
                                      <span className="mr-2">{lang.flag}</span>
                                      <span>{lang.name}</span>
                                  </button>
                              ))}
                          </div>
                      )}
                  </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                  <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="text-gray-800 hover:text-green-500"
                  >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"/>
                      </svg>
                  </button>
              </div>
          </div>
      </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden bg-white pb-3 px-4">
          {menuItems.map((item, index) => (
            <div key={index} className="pt-2">
              <a
                href={item.href}
                className="block px-3 py-2 text-gray-800 hover:bg-green-50 rounded-md"
              >
                {item.name}
              </a>
              {item.dropdown && (
                <div className="pl-4">
                  {item.dropdown.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="block px-3 py-2 text-gray-600 hover:bg-green-50 rounded-md"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-2 border-t mt-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setCurrentLang(lang)}
                className={`flex items-center w-full px-3 py-2 text-left rounded-md ${
                  currentLang.code === lang.code
                    ? 'bg-green-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default StickyNavbar;