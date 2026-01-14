import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Home, Users, ClipboardList, LogOut, UserCircle, Package, Languages, LayoutDashboard, X } from 'lucide-react';
import desiLogo from '../assets/desi_logo.png';
import go1 from '../assets/go1.jpeg';
import go2 from '../assets/go2.jpeg';

// Import dashboard button images
import addProductImg from '../assets/dashboard_buttons/add_your_product .png';
import editProfileImg from '../assets/dashboard_buttons/edit_your profile.png';
import viewOrdersImg from '../assets/dashboard_buttons/view_your_orders.png';
import viewProductImg from '../assets/dashboard_buttons/view_your_product.png';
import viewProfileImg from '../assets/dashboard_buttons/view_your_profile.png';

const MainLayout = () => {
  const { getItemCount, cartChanged, setCartChanged } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileProfileModal, setShowMobileProfileModal] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMobileLanguageDropdown, setShowMobileLanguageDropdown] = useState(false);
  const [showGoDropdown, setShowGoDropdown] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [hideTooltips, setHideTooltips] = useState({
    dashboard: false,
    cart: false,
    language: false,
    home: false,
    profile: false
  });
  const dropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const mobileLanguageDropdownRef = useRef(null);
  const goDropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleTooltipClick = (tooltipName) => {
    setHideTooltips(prev => ({ ...prev, [tooltipName]: true }));
  };

  const handleTooltipHover = (tooltipName) => {
    setHideTooltips(prev => ({ ...prev, [tooltipName]: false }));
  };

  const currentItemCount = getItemCount();

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.first_name || !user.last_name) return '';
    const firstInitial = user.first_name.charAt(0).toUpperCase();
    const lastInitial = user.last_name.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  // Scroll effect
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 50) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

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

  // Close language dropdown and go dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
      if (mobileLanguageDropdownRef.current && !mobileLanguageDropdownRef.current.contains(event.target)) {
        setShowMobileLanguageDropdown(false);
      }
      if (goDropdownRef.current && !goDropdownRef.current.contains(event.target)) {
        setShowGoDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowProfileDropdown(false);
    setShowMobileProfileModal(false);
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
          isScrolled ? 'sm:py-0 md:py-2' : 'sm:py-0 md:py-3'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <img
                src={desiLogo}
                alt="Farm Fresh"
                className={`transition-all duration-300 ${
                  isScrolled ? 'md:w-24' : 'w-36'
                }`}
              />
            </Link>
          </div>
          {/* Go Button for Mobile Header - Right Side */}
          <div className="md:hidden relative" ref={goDropdownRef}>
            <button
              onClick={() => setShowGoDropdown(!showGoDropdown)}
              className="transition-all duration-200 active:scale-90"
            >
              <img
                src={showGoDropdown ? go2 : go1}
                alt={language === 'hi' ? 'जाओ' : 'Go'}
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? 'md:h-16 md:w-12' : 'h-20 w-16'
                }`}
              />
            </button>

            {/* Go Dropdown Menu - Mobile Only */}
            {showGoDropdown && (
              <div className="absolute right-0 mt-2 w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50 animate-fadeIn">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-gray-800">
                    {language === 'hi' ? 'त्वरित क्रियाएं' : 'Quick Actions'}
                  </h3>
                  <button
                    onClick={() => setShowGoDropdown(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {/* Add Product Card */}
                  <Link
                    to="/dashboard/add-product"
                    onClick={() => setShowGoDropdown(false)}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={addProductImg}
                        alt="Add Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 text-center bg-gradient-to-t from-green-600 to-green-500">
                      <p className="text-[10px] font-semibold text-white leading-tight">
                        {language === 'hi' ? 'उत्पाद जोड़ें' : 'Add Product'}
                      </p>
                    </div>
                  </Link>

                  {/* Edit Profile Card */}
                  <Link
                    to="/dashboard/edit-profile"
                    onClick={() => setShowGoDropdown(false)}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={editProfileImg}
                        alt="Edit Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 text-center bg-gradient-to-t from-blue-600 to-blue-500">
                      <p className="text-[10px] font-semibold text-white leading-tight">
                        {language === 'hi' ? 'प्रोफ़ाइल संपादित करें' : 'Edit Profile'}
                      </p>
                    </div>
                  </Link>

                  {/* View Orders Card */}
                  <Link
                    to="/dashboard/requests"
                    onClick={() => setShowGoDropdown(false)}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={viewOrdersImg}
                        alt="View Your Orders"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 text-center bg-gradient-to-t from-orange-600 to-orange-500">
                      <p className="text-[10px] font-semibold text-white leading-tight">
                        {language === 'hi' ? 'ऑर्डर देखें' : 'View Orders'}
                      </p>
                    </div>
                  </Link>

                  {/* View Products Card */}
                  <Link
                    to="/dashboard/manage-products"
                    onClick={() => setShowGoDropdown(false)}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={viewProductImg}
                        alt="View Products"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 text-center bg-gradient-to-t from-purple-600 to-purple-500">
                      <p className="text-[10px] font-semibold text-white leading-tight">
                        {language === 'hi' ? 'उत्पाद देखें' : 'View Products'}
                      </p>
                    </div>
                  </Link>

                  {/* View Profile Card */}
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setShowGoDropdown(false)}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={viewProfileImg}
                        alt="View Your Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 text-center bg-gradient-to-t from-indigo-600 to-indigo-500">
                      <p className="text-[10px] font-semibold text-white leading-tight">
                        {language === 'hi' ? 'प्रोफ़ाइल देखें' : 'View Profile'}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Desktop Navigation Menu - Same as Bottom Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="relative flex items-center justify-center text-gray-700 hover:text-green-600 transition-colors group"
              onMouseEnter={() => handleTooltipHover('dashboard')}
              onClick={() => handleTooltipClick('dashboard')}
            >
              <LayoutDashboard className={`transition-all duration-300 ${isScrolled ? 'md:w-5 md:h-5' : 'w-6 h-6'}`} />
              <span className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap pointer-events-none z-50 ${
                hideTooltips.dashboard ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {language === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
              </span>
            </Link>

            <Link
              to="/dashboard/cart"
              className="relative flex items-center justify-center text-gray-700 hover:text-green-600 transition-colors group"
              onMouseEnter={() => handleTooltipHover('cart')}
              onClick={() => handleTooltipClick('cart')}
            >
              <div className={`relative transition-all duration-300 ${cartAnimation ? 'animate-bounce' : ''}`}>
                {currentItemCount > 0 ? (
                  <ShoppingCart className={`${isScrolled ? 'md:w-5 md:h-5' : 'w-6 h-6'}`} fill="currentColor" />
                ) : (
                  <ShoppingCart className={`${isScrolled ? 'md:w-5 md:h-5' : 'w-6 h-6'}`} />
                )}
                {currentItemCount > 0 && (
                  <span className={`absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold ${
                    cartAnimation ? 'scale-125' : 'scale-100'
                  } transition-all duration-300`}>
                    {currentItemCount}
                  </span>
                )}
              </div>
              <span className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap pointer-events-none z-50 ${
                hideTooltips.cart ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {language === 'hi' ? 'कार्ट' : 'Cart'}
              </span>
            </Link>

            {/* Language Switcher */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={() => {
                  setShowLanguageDropdown(!showLanguageDropdown);
                  handleTooltipClick('language');
                }}
                onMouseEnter={() => handleTooltipHover('language')}
                className="relative flex items-center justify-center text-gray-700 hover:text-green-600 transition-colors group focus:outline-none"
              >
                <Languages className={`transition-all duration-300 ${isScrolled ? 'md:w-5 md:h-5' : 'w-6 h-6'}`} />
                <span className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap pointer-events-none z-50 ${
                  hideTooltips.language ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  {language === 'hi' ? 'भाषा' : 'Language'}
                </span>
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

            <Link
              to="/landingPage"
              className="relative flex items-center justify-center text-gray-700 hover:text-green-600 transition-colors group"
              onMouseEnter={() => handleTooltipHover('home')}
              onClick={() => handleTooltipClick('home')}
            >
              <Home className={`transition-all duration-300 ${isScrolled ? 'md:w-5 md:h-5' : 'w-6 h-6'}`} />
              <span className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap pointer-events-none z-50 ${
                hideTooltips.home ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {language === 'hi' ? 'होम' : 'Home'}
              </span>
            </Link>

            {/* Profile with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  handleTooltipClick('profile');
                }}
                onMouseEnter={() => handleTooltipHover('profile')}
                className="relative flex items-center justify-center text-gray-700 hover:text-green-600 transition-colors group focus:outline-none"
              >
                {getUserInitials() ? (
                  <div className={`rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                    isScrolled ? 'md:w-5 md:h-5 md:text-[10px]' : 'w-6 h-6 text-xs'
                  }`}>
                    {getUserInitials()}
                  </div>
                ) : (
                  <User className={`transition-all duration-300 ${isScrolled ? 'md:w-5 md:h-5' : 'w-6 h-6'}`} />
                )}
                <span className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap pointer-events-none z-50 ${
                  hideTooltips.profile ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  {user?.first_name || (language === 'hi' ? 'प्रोफ़ाइल' : 'Profile')}
                </span>
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
      <div className={`transition-all duration-300 ${isScrolled ? 'md:h-16' : 'h-20'}`}></div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 md:pb-6">
        <Outlet />
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
        <div className="flex justify-around items-center pt-3 pb-10">
          <Link
            to="/landingPage"
            className="flex flex-col items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            <Home className="w-7 h-7" />
          </Link>
          
          <div className="h-8 w-px bg-gray-300"></div>
          
          <Link
            to="/dashboard/cart"
            className="relative flex flex-col items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            <div className={`${cartAnimation ? 'animate-bounce' : ''}`}>
              {currentItemCount > 0 ? (
                <ShoppingCart className="w-7 h-7" fill="currentColor" />
              ) : (
                <ShoppingCart className="w-7 h-7" />
              )}
            </div>
            {currentItemCount > 0 && (
              <span className={`absolute -top-1 right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold ${
                cartAnimation ? 'scale-125' : 'scale-100'
              } transition-all duration-300`}>
                {currentItemCount}
              </span>
            )}
          </Link>
          
          <div className="h-8 w-px bg-gray-300"></div>
          
          <Link
            to="/dashboard"
            className="flex flex-col items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            <LayoutDashboard className="w-7 h-7" />
          </Link>
          
          <div className="h-8 w-px bg-gray-300"></div>
          
          <div className="relative w-12" ref={mobileLanguageDropdownRef}>
            <button
              onClick={() => setShowMobileLanguageDropdown(!showMobileLanguageDropdown)}
              className="flex flex-col items-center text-sm text-gray-600 hover:text-green-600 transition-colors w-full"
            >
              <Languages className="w-7 h-7" />
            </button>
            {showMobileLanguageDropdown && (
              <div className="absolute bottom-12 -left-10 transform  w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn">
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
          <div className="h-8 w-px bg-gray-300"></div>
          
          <button
            onClick={() => setShowMobileProfileModal(!showMobileProfileModal)}
            className="flex flex-col items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            {getUserInitials() ? (
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shadow-lg">
                {getUserInitials()}
              </div>
            ) : (
              <User className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Profile Modal */}
      {showMobileProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 md:hidden">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                {language === 'hi' ? 'प्रोफ़ाइल मेनू' : 'Profile Menu'}
              </h3>
              <button
                onClick={() => setShowMobileProfileModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {/* User Info */}
              <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-200">
                {getUserInitials() ? (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold text-base shadow-lg">
                    {getUserInitials()}
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-sm text-gray-500">{user?.mobile}</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                <Link
                  to="/dashboard/profile"
                  onClick={() => setShowMobileProfileModal(false)}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <UserCircle className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-gray-700 font-medium">
                    {language === 'hi' ? 'प्रोफ़ाइल देखें' : 'View Profile'}
                  </span>
                </Link>
                
                <Link
                  to="/dashboard/requests"
                  onClick={() => setShowMobileProfileModal(false)}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Package className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-gray-700 font-medium">
                    {language === 'hi' ? 'आपके ऑर्डर' : 'Your Orders'}
                  </span>
                </Link>

                <div className="border-t border-gray-200 my-2"></div>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 hover:bg-red-50 rounded-lg transition-colors text-left"
                >
                  <LogOut className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-red-600 font-medium">
                    {language === 'hi' ? 'लॉगआउट' : 'Logout'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;