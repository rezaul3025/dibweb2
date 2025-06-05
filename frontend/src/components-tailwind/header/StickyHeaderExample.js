import React from "react";
import { useState } from 'react';

const StickyHeaderExample = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const navItems = [
    { name: 'Home', href: '#' },
    {
      name: 'Products',
      href: '#',
      dropdown: [
        { name: 'Product 1', href: '#' },
        { name: 'Product 2', href: '#' },
        { name: 'Product 3', href: '#' },
      ]
    },
    {
      name: 'Services',
      href: '#',
      dropdown: [
        { name: 'Service 1', href: '#' },
        { name: 'Service 2', href: '#' },
        { name: 'Consulting', href: '#' },
      ]
    },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Logo</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 relative">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => item.dropdown && toggleDropdown(item.name)}
                  className={`px-4 py-2 text-gray-700 hover:text-blue-600 flex items-center ${item.dropdown ? 'pr-7' : ''}`}
                >
                  {item.name}
                  {item.dropdown && (
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen === item.name ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Desktop Dropdown */}
                {item.dropdown && (
                  <div
                    className={`absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 transition-all duration-300 origin-top ${dropdownOpen === item.name ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => item.dropdown && toggleDropdown(item.name)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex justify-between items-center ${item.dropdown ? 'pr-3' : ''}`}
                >
                  {item.name}
                  {item.dropdown && (
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen === item.name ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Mobile Dropdown */}
                {item.dropdown && dropdownOpen === item.name && (
                  <div className="pl-4">
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StickyHeaderExample;