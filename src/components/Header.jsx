import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import desiLogo from '../assets/desi_logo.png';

const Header = () => {
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-btn')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const menuItems = [
    {
      title: language === 'hi' ? 'होम' : 'Home',
      path: '/',
      submenu: null
    },
    {
      title: language === 'hi' ? 'कंपनी' : 'Company',
      path: '#',
      submenu: [
        { title: language === 'hi' ? 'हमारे बारे में' : 'About Us', path: '/about' },
        { title: language === 'hi' ? 'हमारी टीम' : 'Leadership / Team', path: '/team' },
        { title: language === 'hi' ? 'लक्ष्य और उद्देश्य' : 'Mission & Vision', path: '/mission' },
        { title: language === 'hi' ? 'सहयोगी' : 'Partners', path: '/partners' }
      ]
    },
    {
      title: language === 'hi' ? 'किसान प्रशिक्षण' : 'Farmer Training',
      path: '#',
      submenu: [
        { title: language === 'hi' ? 'आगामी प्रशिक्षण' : 'All Trainings', path: '/training/all-tranings'},
        { title: language === 'hi' ? 'आगामी प्रशिक्षण' : 'Upcoming Trainings', path: '/training/upcoming'},
        { title: language === 'hi' ? 'प्रशिक्षण के लिए आवेदन करें' : 'Apply for Training', path: '/training/apply' },
        { title: language === 'hi' ? 'संपन्न प्रशिक्षण' : 'Successful Trainings', path: '/training/gallery' },       
      ]
    },
    {
      title: language === 'hi' ? 'सेवाएं' : 'Services',
      path: '#',
      submenu: [
        { title: language === 'hi' ? 'फसल बीमा' : 'Crop Insurance', path: '/services/insurance' },
        { title: language === 'hi' ? 'कृषि ऋण' : 'Agriculture Loan', path: '/services/loan' },
        { title: language === 'hi' ? 'मिट्टी जाँच' : 'Soil Testing', path: '/services/soil-testing' }
      ]
    },
    {
      title: language === 'hi' ? 'कृषि समाचार' : 'Farming News',
      path: '#',
      submenu: [
        { title: language === 'hi' ? 'ताज़ा ख़बरें' : 'Latest News', path: '/news/latest' },
        { title: language === 'hi' ? 'वीडियो समाचार' : 'Video News', path: '/news/videos' },
        { title: language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes', path: '/news/schemes' }
      ]
    },
    {
      title: language === 'hi' ? 'बाज़ार' : 'Market',
      path: '#',
      submenu: [
        { title: language === 'hi' ? 'उत्पाद खरीदें' : 'Buy Products', path: '/market/buy' },
        { title: language === 'hi' ? 'उत्पाद बेचें' : 'Sell Products', path: '/market/sell' },
        { title: language === 'hi' ? 'थोक खरीद' : 'Bulk Order', path: '/market/bulk' }
      ]
    },
   
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <header className={`bg-white/95 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-green-100 transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/">
              <img
                src={desiLogo}
                alt="Desi Kisan"
                className={`transition-all duration-300 ${isScrolled ? 'w-32' : 'w-40'}`}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => item.submenu && setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.submenu ? (
                  <button
                    className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 flex items-center gap-1"
                  >
                    {item.title}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                )}

                {/* Desktop Dropdown */}
                {item.submenu && (
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-green-100 py-2 animate-fadeIn"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >          
           
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 border border-gray-300 rounded-lg hover:border-green-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-sm">{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* Login/Dashboard Button */}
            <Link
              to={user ? "/app" : "/auth"}
              className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isScrolled ? 'px-4 py-2 text-sm' : 'px-6 py-2.5 text-base'
              }`}
            >
              {user
                ? (language === 'hi' ? 'डैशबोर्ड' : 'Dashboard')
                : (language === 'hi' ? 'लॉगिन' : 'Login')
              }
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden hamburger-btn p-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mobile-menu overflow-hidden"
            >
              <nav className="py-4 space-y-2">
                {/* Mobile Language Switcher */}
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span>{language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}</span>
                </button>

                {menuItems.map((item, index) => (
                  <div key={index}>
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 rounded-lg"
                        >
                          <span className="font-medium">{item.title}</span>
                          <svg
                            className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-1 space-y-1 overflow-hidden"
                            >
                              {item.submenu.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  to={subItem.path}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 rounded-lg"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 rounded-lg font-medium"
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;