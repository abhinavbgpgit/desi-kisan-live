import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { apiService as api } from '../services/api';
import ProductCard from '../components/ProductCard';
import ComboPackCard from '../components/ComboPackCard';
import FarmerCard from '../components/FarmerCard';
import farmersData from '../data/farmers.json';

const HomeDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [comboPacks, setComboPacks] = useState([]);
  const [activeRequest, setActiveRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { getItemCount } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsResponse, packsResponse, requestResponse] = await Promise.all([
          api.getFeaturedProducts(),
          api.getComboPacks(),
          api.getActiveRequest()
        ]);

        setFeaturedProducts(productsResponse);
        setComboPacks(packsResponse);
        setActiveRequest(requestResponse);
      } catch (error) {
        console.error('Failed to load data:', error);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = [
    { name: t('categories.vegetables'), icon: "🥬", route: "/dashboard/category/Vegetables" },
    { name: t('categories.fruits'), icon: "🍎", route: "/dashboard/category/Fruits" },
    { name: t('categories.grains'), icon: "🌾", route: "/dashboard/category/Grains" },
    { name: t('categories.dairy'), icon: "🥛", route: "/dashboard/category/Dairy" },
    { name: t('categories.desi_nonveg'), icon: "🍖", route: "/dashboard/category/Desi Non-Veg" },
    { name: t('categories.local_processed'), icon: "🧈", route: "/dashboard/category/Local Processed Foods" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4 bg-white shadow-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for fresh produce..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled
            />
            <div className="absolute left-4 top-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-4 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('shop_by_category')}</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm animate-pulse flex-shrink-0 w-24">
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
      {/* Search Bar */}
      <div className="p-4 bg-white shadow-sm">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute left-4 top-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </form>
      </div>

      {/* Categories */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('shop_by_category')}</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.route}
              className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow flex-shrink-0 w-40"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium text-gray-700">{category.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{t('featured_this_week')}</h2>
          <Link to="/dashboard/category/all" className="text-green-600 text-sm hover:text-green-700">
            {t('see_all')}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Combo Packs */}
      <div className="p-4 mt-6 bg-white">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('weekly_combo_packs')}</h2>
        <div className="space-y-4">
          {comboPacks.map((pack) => (
            <ComboPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </div>

      {/* Request Status */}
      {activeRequest && (
        <div className="p-4 mt-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-green-800">{t('your_weekly_request')}</h3>
                <p className="text-sm text-gray-600">{t('request_status').replace('{status}', activeRequest.status)}</p>
                <p className="text-sm text-gray-600">{t('delivery_date').replace('{date}', activeRequest.deliveryDate)}</p>
              </div>
              <Link to="/dashboard/requests" className="text-green-600 text-sm hover:text-green-700">
                {t('view_details')}
              </Link>
            </div>
            <div className="mt-3 flex space-x-2">
              {activeRequest.items.slice(0, 3).map((item) => (
                <img
                  key={item.id}
                  src={item.image || '/placeholder-product.jpg'}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
              ))}
              {activeRequest.items.length > 3 && (
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs">
                  +{activeRequest.items.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Farmers Section */}
      <div className="p-4 mt-6 bg-white rounded-xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{t('meet_our_farmers')}</h2>
          <Link to="/dashboard/farmers" className="text-green-600 text-sm hover:text-green-700 flex items-center">
            {t('view_all_farmers').replace('{count}', farmersData.farmers.length)}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Display first 5 farmers using FarmerCard component */}
          {farmersData.farmers.slice(0, 5).map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}

          {/* Browse All Farmers Card */}
          <Link
            to="/dashboard/farmers"
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border-2 border-green-200 hover:border-green-300 flex flex-col items-center justify-center group"
          >
            <div className="w-14 h-14 rounded-full mx-auto mb-3 bg-green-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.273-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.273.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{t('explore_all_farmers')}</h3>
            <p className="text-xs text-gray-600 mb-3">Discover {farmersData.farmers.length}+ local farmers</p>
            <span className="inline-flex items-center text-green-600 text-sm font-semibold group-hover:text-green-700">
              {t('browse_all')}
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;