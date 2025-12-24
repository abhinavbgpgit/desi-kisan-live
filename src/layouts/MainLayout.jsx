import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Home, Users, ClipboardList, LogOut, UserCircle, Package, Languages } from 'lucide-react';
import desiLogo from '../assets/desi_logo.png';

const MainLayout = () => {
  const { getItemCount, cartChanged, setCartChanged } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMobileLanguageDropdown, setShowMobileLanguageDropdown] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const dropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const mobileLanguageDropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const currentItemCount = getItemCount();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart animation effect - triggers only when cart changes
  useEffect(() => {
    if (cartChanged) {
      setCartAnimation(true);
      const timer = setTimeout(() => {
        setCartAnimation(false);
        setCartChanged(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [cartChanged, setCartChanged]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
      if (mobileLanguageDropdownRef.current && !mobileLanguageDropdownRef.current.contains(event.target)) {
        setShowMobileLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowProfileDropdown(false);
    logout();
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
    setShowMobileLanguageDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className={`bg-white shadow-sm fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-3'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <img
                src={desiLogo}
                alt="Farm Fresh"
                className={`transition-all duration-300 ${
                  isScrolled ? 'w-24' : 'w-36'
                }`}
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Home Icon - Navigate to Landing Page */}
            <Link
              to="/landingPage"
              className="group"
              title={language === 'hi' ? 'होम पेज पर जाएं' : 'Go to Home Page'}
            >
              <Home
                className={`text-gray-700 group-hover:text-green-600 transition-all duration-300 ${
                  isScrolled ? 'w-5 h-5' : 'w-6 h-6'
                }`}
              />
            </Link>

            {/* Language Switcher */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="focus:outline-none group"
              >
                <Languages
                  className={`text-gray-700 group-hover:text-green-600 transition-all duration-300 ${
                    isScrolled ? 'w-5 h-5' : 'w-6 h-6'
                  }`}
                />
              </button>

              {/* Language Dropdown Menu */}
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className="flex items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className={`text-gray-700 font-medium ${language === 'en' ? 'text-green-600 font-semibold' : ''}`}>
                      English
                    </span>
                    {language === 'en' && (
                      <svg className="w-4 h-4 ml-auto text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={() => toggleLanguage('hi')}
                    className="flex items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className={`text-gray-700 font-medium ${language === 'hi' ? 'text-green-600 font-semibold' : ''}`}>
                      हिन्दी
                    </span>
                    {language === 'hi' && (
                      <svg className="w-4 h-4 ml-auto text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Cart Icon with Animation */}
            <Link to="/dashboard/cart" className="relative group">
              <div className={`transition-all duration-300 ${cartAnimation ? 'animate-bounce' : ''}`}>
                {currentItemCount > 0 ? (
                  <ShoppingCart
                    className={`text-gray-700 group-hover:text-green-600 transition-all duration-300 ${
                      isScrolled ? 'w-5 h-5' : 'w-6 h-6'
                    }`}
                    fill="currentColor"
                  />
                ) : (
                  <ShoppingCart
                    className={`text-gray-700 group-hover:text-green-600 transition-all duration-300 ${
                      isScrolled ? 'w-5 h-5' : 'w-6 h-6'
                    }`}
                  />
                )}
              </div>
              {currentItemCount > 0 && (
                <span className={`absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold transition-all duration-300 ${
                  cartAnimation ? 'scale-125' : 'scale-100'
                }`}>
                  {currentItemCount}
                </span>
              )}
            </Link>

            {/* Profile Icon with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="focus:outline-none group"
              >
                <User
                  className={`text-gray-700 group-hover:text-green-600 transition-all duration-300 ${
                    isScrolled ? 'w-5 h-5' : 'w-6 h-6'
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn">
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setShowProfileDropdown(false)}
                    className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <UserCircle className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-700 font-medium">View Profile</span>
                  </Link>
                  
                  <Link
                    to="/dashboard/requests"
                    onClick={() => setShowProfileDropdown(false)}
                    className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <Package className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-700 font-medium">Your Orders</span>
                  </Link>

                  <div className="border-t border-gray-200 my-2"></div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-red-600 font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}></div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
        <div className="flex justify-around py-3">
          <Link to="/landingPage" className="flex flex-col items-center text-sm text-gray-600 hover:text-green-600 transition-colors">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/dashboard/farmers" className="flex flex-col items-center text-sm text-gray-600 hover:text-green-600 transition-colors">
            <Users className="w-6 h-6" />
            <span className="text-xs mt-1">Farmers</span>
          </Link>
          <Link to="/dashboard/requests" className="flex flex-col items-center text-sm text-gray-600 hover:text-green-600 transition-colors">
            <ClipboardList className="w-6 h-6" />
            <span className="text-xs mt-1">Requests</span>
          </Link>
          <Link to="/dashboard/cart" className="flex flex-col items-center text-sm text-gray-600 hover:text-green-600 relative transition-colors">
            <div className={`${cartAnimation ? 'animate-bounce' : ''}`}>
              {currentItemCount > 0 ? (
                <ShoppingCart className="w-6 h-6" fill="currentColor" />
              ) : (
                <ShoppingCart className="w-6 h-6" />
              )}
            </div>
            <span className="text-xs mt-1">Cart</span>
            {currentItemCount > 0 && (
              <span className={`absolute -top-1 right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold ${
                cartAnimation ? 'scale-125' : 'scale-100'
              } transition-all duration-300`}>
                {currentItemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex flex-col items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
          <div className="relative" ref={mobileLanguageDropdownRef}>
            <button
              onClick={() => setShowMobileLanguageDropdown(!showMobileLanguageDropdown)}
              className="flex flex-col items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
            >
              <Languages className="w-6 h-6" />
              <span className="text-xs mt-1">{t('language_switcher')}</span>
            </button>
            {showMobileLanguageDropdown && (
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn">
                <button
                  onClick={() => toggleLanguage('en')}
                  className="flex items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className={`text-gray-700 font-medium ${language === 'en' ? 'text-green-600 font-semibold' : ''}`}>
                    {t('language_english')}
                  </span>
                  {language === 'en' && (
                    <svg className="w-4 h-4 ml-auto text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={() => toggleLanguage('hi')}
                  className="flex items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className={`text-gray-700 font-medium ${language === 'hi' ? 'text-green-600 font-semibold' : ''}`}>
                    {t('language_hindi')}
                  </span>
                  {language === 'hi' && (
                    <svg className="w-4 h-4 ml-auto text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;