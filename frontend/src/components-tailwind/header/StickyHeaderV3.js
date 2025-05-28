import React, {useEffect, useState} from 'react';
import {FiChevronDown, FiGlobe, FiMenu, FiX} from 'react-icons/fi';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import i18n from "i18next";

const StickyHeaderV3 = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("languageName")?localStorage.getItem("languageName") : 'বাংলা');

    const languages = [
        {code: 'bn', name: 'বাংলা', flag: '🇧🇩'},
        {code: 'de', name: 'Deutsch', flag: '🇩🇪'},
        {code: 'en', name: 'English', flag: '🇬🇧'},
    ];

    const navItems = [
    { name: t('Home.title'), href: '/' },
    { name: t('AboutUs.title'), href: '/history/' },
    { name: t('Vision.title'), href: '/vision/' },
    { name: t('Membership.title'), href: '/membership/' },
    { name: t('Academy.nav_title'), href: '/academy/' },
    { name: t('Donation.title'), href: '/donation-tailwind/' },
    { name: t('Download.title'), href: '/download/' },
  ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguageDropdown = () => {
        setIsLanguageOpen(!isLanguageOpen);
    };

    const selectLanguage = (lang) => {
        setSelectedLanguage(lang.name);
        setIsLanguageOpen(false);
        i18n.changeLanguage(lang.code);
        localStorage.setItem("languageCode", lang.code);
        localStorage.setItem("languageName", lang.name);
    };

    return (
        <nav
            className={`fixed w-full z-50 mb-8 transition-all duration-300 ${
                isScrolled ? 'bg-green-600 shadow-lg' : 'bg-green-500'
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and main nav items */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-16 w-18" src={'/static/assets/images/dib-logo-new.png'} alt="Logo"/>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-6">
                                {navItems.map((item) => (
                                  <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`${location.pathname === item.href ? "bg-green-600" : ""} text-green-100 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                                {/*<a
                                    href="#"
                                    className="text-green-100 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Home
                                </a>
                                <a
                                    href="#"
                                    className="text-green-100 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Features
                                </a>
                                <a
                                    href="#"
                                    className="text-green-100 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Pricing
                                </a>
                                <a
                                    href="#"
                                    className="text-green-100 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Contact
                                </a>*/}
                            </div>
                        </div>
                    </div>

                    {/* Right side items (language selector, etc) */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {/* Language Selector */}
                            <div className="ml-3 relative">
                                <div>
                                    <button
                                        type="button"
                                        onClick={toggleLanguageDropdown}
                                        className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none"
                                        id="language-menu"
                                    >
                                        <FiGlobe className="h-4 w-4"/>
                                        <span
                                            className="mx-2">{languages.find(l => l.name === selectedLanguage)?.flag}</span>
                                        <span className="ml-1">{selectedLanguage}</span>
                                        <FiChevronDown className="ml-1 h-4 w-4"/>
                                    </button>
                                </div>

                                {isLanguageOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => selectLanguage(lang)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 w-full text-left"
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

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-green-200 hover:text-white hover:bg-green-600 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <FiX className="h-6 w-6"/> : <FiMenu className="h-6 w-6"/>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                                  <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`${location.pathname === item.href ? "bg-green-600" : ""} text-green-100 hover:bg-green-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                        {/*<a
                            href="#"
                            className="text-green-100 hover:bg-green-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="text-green-100 hover:bg-green-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Features
                        </a>
                        <a
                            href="#"
                            className="text-green-100 hover:bg-green-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Pricing
                        </a>
                        <a
                            href="#"
                            className="text-green-100 hover:bg-green-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Contact
                        </a>*/}
                    </div>
                    <div className="pt-4 pb-3 border-t border-green-800">
                        <div className="px-5">
                            <button
                                type="button"
                                onClick={toggleLanguageDropdown}
                                className="flex items-center text-sm text-white focus:outline-none"
                            >
                                <FiGlobe className="h-5 w-5"/>
                                <span
                                    className="mx-2">{languages.find(l => l.name === selectedLanguage)?.flag}</span>
                                <span className="ml-1">{selectedLanguage}</span>
                                <FiChevronDown className="ml-1 h-4 w-4"/>
                            </button>
                            {isLanguageOpen && (
                                <div className="mt-2 px-2 space-y-1">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => selectLanguage(lang)}
                                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 w-full text-left rounded-md"
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
            )}
        </nav>
    );
};

export default StickyHeaderV3;