import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService as api } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';

const CategoryListing = () => {
  const { categoryId } = useParams();
  const { language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  // Category mapping for display names
  const categoryNames = {
    'natural-fertilizers': {
      hi: 'प्राकृतिक खाद',
      en: 'Natural Fertilizers',
      icon: '🌱'
    },
    'bio-pesticides': {
      hi: 'प्राकृतिक कीटनाशक',
      en: 'Bio Pesticides',
      icon: '🛡️'
    },
    'bio-fertilizers': {
      hi: 'जैव उर्वरक',
      en: 'Bio Fertilizers',
      icon: '🦠'
    },
    'desi-seeds': {
      hi: 'देसी बीज',
      en: 'Desi Seeds',
      icon: '🌾'
    },
    'plants-saplings': {
      hi: 'पौधे / नर्सरी',
      en: 'Plants & Saplings',
      icon: '🌿'
    },
    'farm-tools': {
      hi: 'कृषि औज़ार',
      en: 'Farm Tools',
      icon: '🔨'
    },
    'small-machinery': {
      hi: 'छोटी मशीनें',
      en: 'Small Machinery',
      icon: '⚙️'
    },
    'irrigation': {
      hi: 'सिंचाई सामान',
      en: 'Irrigation Items',
      icon: '💧'
    },
    'animal-care': {
      hi: 'पशुपालन उत्पाद',
      en: 'Animal Care',
      icon: '🐄'
    },
    'storage-packaging': {
      hi: 'भंडारण व पैकिंग',
      en: 'Storage & Packaging',
      icon: '📦'
    },
    'training-services': {
      hi: 'प्रशिक्षण व सेवाएँ',
      en: 'Training & Services',
      icon: '📚'
    }
  };

  const getCategoryDisplay = () => {
    const category = categoryNames[categoryId];
    if (category) {
      return {
        name: language === 'hi' ? category.hi : category.en,
        icon: category.icon
      };
    }
    return {
      name: categoryId,
      icon: '📦'
    };
  };

  const categoryDisplay = getCategoryDisplay();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.getProductsByCategory(categoryId);
        setProducts(response);
      } catch (error) {
        console.error('Failed to load products:', error);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const sortedProducts = products
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // Default sort (popularity)
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
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
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {/* Back Button */}
        <Link
          to="/app"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Categories
        </Link>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{categoryDisplay.icon}</span>
            <h1 className="text-xl font-bold text-gray-800">{categoryDisplay.name}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-md text-sm"
            >
              <option value="popularity">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-8">
            <img src="/empty-products.png" alt="No products found" className="w-32 h-32 mx-auto mb-4" />
            <p className="text-gray-600">No products found in this category</p>
            <Link to="/app" className="text-green-600 mt-2 inline-block hover:text-green-700">
              Browse other categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryListing;