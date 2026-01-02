import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { apiService as api } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { categories } from '../data/categories';

// Import dashboard button images
import addProductImg from '../assets/dashboard_buttons/add_your_product .png';
import editProfileImg from '../assets/dashboard_buttons/edit_your profile.png';
import viewOrdersImg from '../assets/dashboard_buttons/view_your_orders.png';
import viewProductImg from '../assets/dashboard_buttons/view_your_product.png';
import viewProfileImg from '../assets/dashboard_buttons/view_your_profile.png';

const HomeDashboard = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const categoryScrollRef = useRef(null);
  const { getItemCount } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsResponse = await api.getFeaturedProducts();
        setFeaturedProducts(productsResponse);

        // Fetch all products for filtering
        const allProductsResponse = await api.getProducts();
        setAllProducts(allProductsResponse);
      } catch (error) {
        console.error('Failed to load data:', error);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    if (isDragging) return; // Prevent click when dragging
    
    if (selectedCategory === categoryId) {
      // If same category clicked, reset to show all
      setSelectedCategory(null);
      setFilteredProducts([]);
    } else {
      // Filter products by category
      setSelectedCategory(categoryId);
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        const categorySlug = category.route.split('/').pop();
        const filtered = allProducts.filter(product => product.category === categorySlug);
        setFilteredProducts(filtered);
      }
    }
  };

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      const isScrollable = scrollWidth > clientWidth;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(isScrollable && scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll categories left/right
  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left'
        ? categoryScrollRef.current.scrollLeft - scrollAmount
        : categoryScrollRef.current.scrollLeft + scrollAmount;
      
      categoryScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Drag to scroll functionality
  const handleMouseDown = (e) => {
    if (!categoryScrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - categoryScrollRef.current.offsetLeft);
    setScrollLeft(categoryScrollRef.current.scrollLeft);
    // Prevent text selection while dragging
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !categoryScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    categoryScrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch events for mobile drag
  const handleTouchStart = (e) => {
    if (!categoryScrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - categoryScrollRef.current.offsetLeft);
    setScrollLeft(categoryScrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !categoryScrollRef.current) return;
    const x = e.touches[0].pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    categoryScrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add scroll listener and check on mount and when categories change
  useEffect(() => {
    const scrollContainer = categoryScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      
      // Multiple checks to ensure arrows appear correctly
      const timer1 = setTimeout(() => checkScrollPosition(), 100);
      const timer2 = setTimeout(() => checkScrollPosition(), 300);
      const timer3 = setTimeout(() => checkScrollPosition(), 500);
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [categories]);

  // Additional check when loading completes
  useEffect(() => {
    if (!loading && categoryScrollRef.current) {
      const timer = setTimeout(() => checkScrollPosition(), 200);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4 bg-white shadow-sm">
          <div className="w-full bg-gray-200 py-3 px-6 rounded-full animate-pulse"></div>
        </div>

        <div className="p-4 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('shop_by_category')}</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...Array(11)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm animate-pulse flex-shrink-0 w-32">
                <div className="text-3xl mb-2 bg-gray-200 rounded-full w-12 h-12 mx-auto"></div>
                <div className="text-sm font-medium text-gray-700 bg-gray-200 rounded h-4"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 bg-gray-200 rounded h-6 w-32"></h2>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden w-48 animate-pulse">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 mt-6 bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 bg-gray-200 rounded h-6 w-40"></h2>
          <div className="space-y-4">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-xl p-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{t('error_loading')}</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {t('try_again')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Action Cards */}
      <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Add Product Card */}
          <Link
            to="/dashboard/add-product"
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
          >
            <div className="aspect-square relative">
              <img
                src={addProductImg}
                alt="Add Product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center bg-gradient-to-t from-green-600 to-green-500">
              <p className="text-sm font-semibold text-white">
                {t('add_product') || 'Add Product'}
              </p>
            </div>
          </Link>

          {/* Edit Profile Card */}
          <Link
            to="/dashboard/edit-profile"
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
          >
            <div className="aspect-square relative">
              <img
                src={editProfileImg}
                alt="Edit Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center bg-gradient-to-t from-blue-600 to-blue-500">
              <p className="text-sm font-semibold text-white">
                {t('edit_your_profile') || 'Edit Profile'}
              </p>
            </div>
          </Link>

          {/* View Orders Card */}
          <Link
            to="/dashboard/requests"
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
          >
            <div className="aspect-square relative">
              <img
                src={viewOrdersImg}
                alt="View Your Orders"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center bg-gradient-to-t from-orange-600 to-orange-500">
              <p className="text-sm font-semibold text-white">
                {t('view_orders') || 'View Your Orders'}
              </p>
            </div>
          </Link>

          {/* View Products Card */}
          <Link
            to="/dashboard/manage-products"
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
          >
            <div className="aspect-square relative">
              <img
                src={viewProductImg}
                alt="View Products"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center bg-gradient-to-t from-purple-600 to-purple-500">
              <p className="text-sm font-semibold text-white">
                {t('view_edit_products') || 'View Products'}
              </p>
            </div>
          </Link>

          {/* View Profile Card */}
          <Link
            to="/dashboard/profile"
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
          >
            <div className="aspect-square relative">
              <img
                src={viewProfileImg}
                alt="View Your Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center bg-gradient-to-t from-indigo-600 to-indigo-500">
              <p className="text-sm font-semibold text-white">
                {t('view_profile') || 'View Your Profile'}
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('shop_by_category') || '🌱 Natural Farming Categories'}</h2>
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scrollCategories('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all hover:scale-110"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Categories Container */}
          <div
            ref={categoryScrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`flex gap-3 md:gap-4 overflow-x-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              userSelect: 'none'
            }}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => handleCategoryClick(category.id)}
                isSelected={selectedCategory === category.id}
              />
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scrollCategories('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all hover:scale-110"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Products or Featured Products */}
      <div className="p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedCategory
              ? `${categories.find(c => c.id === selectedCategory)?.name || ''} - ${filteredProducts.length} ${t('products') || 'Products'}`
              : t('featured_this_week')
            }
          </h2>
          {selectedCategory && (
            <button
              onClick={() => handleCategoryClick(selectedCategory)}
              className="text-green-600 text-sm hover:text-green-700 font-medium"
            >
              {t('clear_filter') || 'Clear Filter'}
            </button>
          )}
          {!selectedCategory && (
            <Link to="/dashboard/category/all" className="text-green-600 text-sm hover:text-green-700">
              {t('see_all')}
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedCategory ? (
            filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-2 md:col-span-4 text-center py-12">
                <div className="text-gray-400 text-5xl mb-4">📦</div>
                <p className="text-gray-600 text-lg font-medium">{t('no_products_found') || 'No products found in this category'}</p>
                <button
                  onClick={() => handleCategoryClick(selectedCategory)}
                  className="mt-4 text-green-600 hover:text-green-700 font-medium"
                >
                  {t('view_all_products') || 'View All Products'}
                </button>
              </div>
            )
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default HomeDashboard;