import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { apiService as api } from '../services/api';
import ProductCard from '../components/ProductCard';
import ComboPackCard from '../components/ComboPackCard';

const HomeDashboard = () => {
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
    {
      name: t('categories.natural_fertilizers') || 'प्राकृतिक खाद',
      nameEn: 'Natural Fertilizers',
      icon: "🌱",
      route: "/dashboard/category/natural-fertilizers"
    },
    {
      name: t('categories.bio_pesticides') || 'प्राकृतिक कीटनाशक',
      nameEn: 'Bio Pesticides',
      icon: "🛡️",
      route: "/dashboard/category/bio-pesticides"
    },
    {
      name: t('categories.bio_fertilizers') || 'जैव उर्वरक',
      nameEn: 'Bio Fertilizers',
      icon: "🦠",
      route: "/dashboard/category/bio-fertilizers"
    },
    {
      name: t('categories.desi_seeds') || 'देसी बीज',
      nameEn: 'Desi Seeds',
      icon: "🌾",
      route: "/dashboard/category/desi-seeds"
    },
    {
      name: t('categories.plants_saplings') || 'पौधे / नर्सरी',
      nameEn: 'Plants & Saplings',
      icon: "🌿",
      route: "/dashboard/category/plants-saplings"
    },
    {
      name: t('categories.farm_tools') || 'कृषि औज़ार',
      nameEn: 'Farm Tools',
      icon: "🔨",
      route: "/dashboard/category/farm-tools"
    },
    {
      name: t('categories.small_machinery') || 'छोटी मशीनें',
      nameEn: 'Small Machinery',
      icon: "⚙️",
      route: "/dashboard/category/small-machinery"
    },
    {
      name: t('categories.irrigation') || 'सिंचाई सामान',
      nameEn: 'Irrigation Items',
      icon: "💧",
      route: "/dashboard/category/irrigation"
    },
    {
      name: t('categories.animal_care') || 'पशुपालन उत्पाद',
      nameEn: 'Animal Care',
      icon: "🐄",
      route: "/dashboard/category/animal-care"
    },
    {
      name: t('categories.storage_packaging') || 'भंडारण व पैकिंग',
      nameEn: 'Storage & Packaging',
      icon: "📦",
      route: "/dashboard/category/storage-packaging"
    },
    {
      name: t('categories.training_services') || 'प्रशिक्षण व सेवाएँ',
      nameEn: 'Training & Services',
      icon: "📚",
      route: "/dashboard/category/training-services"
    },
  ];

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
      {/* Action Buttons */}
      <div className="p-4 bg-white shadow-sm">
        <div className="grid grid-cols-1 gap-3">
          {/* Add Product Button */}
          <Link
            to="/dashboard/add-product"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t('add_product') || 'Add Product'}
          </Link>

          {/* Edit Profile Button */}
          <Link
            to="/dashboard/edit-profile"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {t('edit_your_profile') || 'Edit Your Profile'}
          </Link>

          {/* View/Edit Products Button */}
          <Link
            to="/dashboard/manage-products"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            {t('view_edit_products') || 'View/Edit Your Products'}
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('shop_by_category') || '🌱 Natural Farming Categories'}</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.route}
              to={category.route}
              className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all hover:scale-105 flex-shrink-0 w-32 border border-gray-100"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-xs font-medium text-gray-700 line-clamp-2">{category.name}</div>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

    </div>
  );
};

export default HomeDashboard;