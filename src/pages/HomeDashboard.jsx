import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { apiService as api } from '../services/api';
import ProductCard from '../components/ProductCard';

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

  // Updated categories matching JSON data (9 categories)
  const categories = [
    {
      name: t('categories.fertilizers') || 'खाद व उर्वरक',
      nameEn: 'Fertilizers',
      icon: "🌱",
      slug: "fertilizers"
    },
    {
      name: t('categories.bio_pesticides') || 'प्राकृतिक कीटनाशक',
      nameEn: 'Bio Pesticides',
      icon: "🛡️",
      slug: "bio-pesticides"
    },
    {
      name: t('categories.desi_seeds') || 'देसी बीज',
      nameEn: 'Desi Seeds',
      icon: "🌾",
      slug: "desi-seeds"
    },
    {
      name: t('categories.plants_saplings') || 'पौधे / नर्सरी',
      nameEn: 'Plants & Saplings',
      icon: "🌿",
      slug: "plants-saplings"
    },
    {
      name: t('categories.tools_machinery') || 'औज़ार व मशीनें',
      nameEn: 'Tools & Machinery',
      icon: "🔨",
      slug: "tools-machinery"
    },
    {
      name: t('categories.irrigation') || 'सिंचाई सामान',
      nameEn: 'Irrigation Items',
      icon: "💧",
      slug: "irrigation"
    },
    {
      name: t('categories.animal_care') || 'पशुपालन उत्पाद',
      nameEn: 'Animal Care',
      icon: "🐄",
      slug: "animal-care"
    },
    {
      name: t('categories.storage_packaging') || 'भंडारण व पैकिंग',
      nameEn: 'Storage & Packaging',
      icon: "📦",
      slug: "storage-packaging"
    },
    {
      name: t('categories.training_services') || 'प्रशिक्षण व सेवाएँ',
      nameEn: 'Training & Services',
      icon: "📚",
      slug: "training-services"
    },
  ];

  // Handle category click
  const handleCategoryClick = (categorySlug) => {
    if (selectedCategory === categorySlug) {
      // If same category clicked, reset to show all
      setSelectedCategory(null);
      setFilteredProducts([]);
    } else {
      // Filter products by category
      setSelectedCategory(categorySlug);
      const filtered = allProducts.filter(product => product.category === categorySlug);
      setFilteredProducts(filtered);
    }
  };

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
            to="/dashboard/orders"
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
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category.slug)}
              className={`bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all hover:scale-105 flex-shrink-0 w-32 border-2 ${
                selectedCategory === category.slug
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-100'
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-xs font-medium text-gray-700 line-clamp-2">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Category Products or Featured Products */}
      <div className="p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedCategory
              ? `${categories.find(c => c.slug === selectedCategory)?.name || ''} - ${filteredProducts.length} ${t('products') || 'Products'}`
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