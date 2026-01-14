import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGetProfileInfoQuery } from '../store/api/farmerApi';

const AddProduct = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Fetch products from API
  const { data: profileData, isLoading, error } = useGetProfileInfoQuery();
  
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load products from API response
  useEffect(() => {
    if (profileData && profileData.data && profileData.data.farmer && profileData.data.farmer.products) {
      setAvailableProducts(profileData.data.farmer.products);
    }
  }, [profileData]);

  // Filter products based on search
  const filteredProducts = availableProducts.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle product selection
  const toggleProductSelection = (product) => {
    const isSelected = selectedProducts.find(p => p.id === product.id);
    
    if (isSelected) {
      // Remove from selected
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      // Add to selected with default values
      setSelectedProducts([...selectedProducts, {
        ...product,
        isAvailable: true,
        availableDate: ''
      }]);
    }
  };

  // Update product availability status
  const updateProductAvailability = (productId, isAvailable) => {
    setSelectedProducts(selectedProducts.map(p => 
      p.id === productId ? { ...p, isAvailable, availableDate: isAvailable ? '' : p.availableDate } : p
    ));
  };

  // Update product available date
  const updateProductDate = (productId, date) => {
    setSelectedProducts(selectedProducts.map(p => 
      p.id === productId ? { ...p, availableDate: date } : p
    ));
  };

  // Handle save
  const handleSave = () => {
    if (selectedProducts.length === 0) {
      alert(t('please_select_product'));
      return;
    }

    // Validate that products with isAvailable=false have a date
    const invalidProducts = selectedProducts.filter(p => !p.isAvailable && !p.availableDate);
    if (invalidProducts.length > 0) {
      alert(t('please_select_date'));
      return;
    }

    console.log('Selected Products:', selectedProducts);
    alert(t('products_saved_successfully'));
    
    // Navigate back to dashboard
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('error_loading')}</h2>
          <p className="text-gray-600">{t('failed_to_load_products')}</p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {t('back_to_dashboard')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">
            {t('add_product')}
          </h1>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search_products')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Product Selection Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📦</span>
            {t('select_available_products')}
          </h2>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">{t('no_products_found')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => {
                const isSelected = selectedProducts.find(p => p.id === product.id);
                
                return (
                  <div
                    key={product.id}
                    onClick={() => toggleProductSelection(product)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        {product.category && (
                          <p className="text-sm text-gray-500 mt-1">
                            {product.category}
                          </p>
                        )}
                        {product.price && (
                          <p className="text-sm font-medium text-green-600 mt-1">
                            ₹{product.price}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Products Configuration */}
        {selectedProducts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              {t('selected_products')} ({selectedProducts.length})
            </h2>
            
            <div className="space-y-4">
              {selectedProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                      
                      {/* Availability Toggle */}
                      <div className="flex items-center gap-4 mb-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`availability-${product.id}`}
                            checked={product.isAvailable}
                            onChange={() => updateProductAvailability(product.id, true)}
                            className="w-4 h-4 text-green-600 focus:ring-2 focus:ring-green-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {t('available_now')}
                          </span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`availability-${product.id}`}
                            checked={!product.isAvailable}
                            onChange={() => updateProductAvailability(product.id, false)}
                            className="w-4 h-4 text-orange-600 focus:ring-2 focus:ring-orange-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {t('available_later')}
                          </span>
                        </label>
                      </div>

                      {/* Date Picker (shown when not available now) */}
                      {!product.isAvailable && (
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('available_date')} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={product.availableDate}
                            onChange={(e) => updateProductDate(product.id, e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => toggleProductSelection(product)}
                      className="text-red-500 hover:text-red-700 p-2"
                      title="Remove"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 sticky bottom-0 bg-gray-50 py-4 -mx-4 px-4 md:-mx-6 md:px-6">
          <Link
            to="/dashboard"
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-center font-medium"
          >
            {t('cancel')}
          </Link>
          <button
            onClick={handleSave}
            disabled={selectedProducts.length === 0}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {t('save')} ({selectedProducts.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;