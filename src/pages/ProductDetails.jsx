import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { apiService as api } from '../services/api';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDeliveryDay, setSelectedDeliveryDay] = useState('');

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.getProductDetails(productId);
        setProduct(response);
        if (response.deliveryDays && response.deliveryDays.length > 0) {
          setSelectedDeliveryDay(response.deliveryDays[0]);
        }
      } catch (error) {
        console.error('Failed to load product details:', error);
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      ...product,
      quantity,
      deliveryDay: selectedDeliveryDay
    });
    navigate('/dashboard/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="relative h-64 bg-gray-200 animate-pulse"></div>

        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>

          <div className="bg-green-50 rounded-lg p-3 mb-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>

          <div className="mb-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>

          <div className="space-y-3 mb-6 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          <div className="h-10 bg-green-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Product</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <img src="/product-not-found.png" alt="Product not found" className="w-48 h-48 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Image Gallery */}
      <div className="relative bg-white">
        <div className="h-80 w-full relative overflow-hidden">
          <img
            src={product.images?.[selectedImage] || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/placeholder-product.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Certification Badge */}
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            {product.certification || '✓ Certified Organic'}
          </div>
        </div>

        {product.images?.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex justify-center space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-14 h-14 rounded-lg border-3 overflow-hidden transition-all ${
                    index === selectedImage
                      ? 'border-green-500 scale-110 shadow-lg'
                      : 'border-white/50 hover:border-white'
                  }`}
                >
                  <img
                    src={image || '/placeholder-product.jpg'}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-5">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
              <p className="text-sm text-green-600 font-medium">{product.category}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-700">₹{product.price}</div>
              <div className="text-sm text-gray-500">per {product.unit}</div>
            </div>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm font-semibold text-gray-700">4.8</span>
            </div>
            <span className="text-sm text-gray-500">(127 reviews)</span>
          </div>
        </div>

        {/* Farmer Info */}
        {product.farmer && (
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center">
              <img
                src={product.farmer.image || '/farmer-placeholder.jpg'}
                alt={product.farmer.name}
                className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-green-100"
                onError={(e) => {
                  e.target.src = '/farmer-placeholder.jpg';
                }}
              />
              <div className="flex-1">
                <p className="font-bold text-gray-900">{product.farmer.name}</p>
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  {product.farmer.location}
                </p>
              </div>
              <button className="text-green-600 text-sm font-semibold hover:text-green-700">
                View Profile →
              </button>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center">
            <span className="text-xl mr-2">📝</span>
            About this Product
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Natural Growing Methods */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-sm p-5 border border-green-100">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center">
            <span className="text-xl mr-2">🌱</span>
            How We Grow It Naturally
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">100% Organic Farming</p>
                <p className="text-xs text-gray-600 mt-1">No chemical pesticides or synthetic fertilizers used</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Natural Composting</p>
                <p className="text-xs text-gray-600 mt-1">Enriched with organic compost and cow dung manure</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Traditional Methods</p>
                <p className="text-xs text-gray-600 mt-1">Grown using time-tested farming techniques passed down generations</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Fresh Harvest</p>
                <p className="text-xs text-gray-600 mt-1">Picked at peak ripeness and delivered within 24-48 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nutritional Information */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-xl mr-2">💪</span>
            Nutritional Information
          </h3>
          
          {/* Vitamins */}
          <div className="mb-4">
            <h4 className="font-semibold text-green-700 text-sm mb-2">Rich in Vitamins</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-orange-700">Vitamin A</span>
                  <span className="text-xs text-orange-600">High</span>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-yellow-700">Vitamin C</span>
                  <span className="text-xs text-yellow-600">High</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-700">Vitamin K</span>
                  <span className="text-xs text-blue-600">Medium</span>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-700">B Vitamins</span>
                  <span className="text-xs text-purple-600">Medium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Minerals */}
          <div>
            <h4 className="font-semibold text-green-700 text-sm mb-2">Essential Minerals</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-gray-700">Fe</div>
                <div className="text-xs text-gray-600">Iron</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-gray-700">Ca</div>
                <div className="text-xs text-gray-600">Calcium</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-gray-700">K</div>
                <div className="text-xs text-gray-600">Potassium</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-gray-700">Mg</div>
                <div className="text-xs text-gray-600">Magnesium</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-gray-700">P</div>
                <div className="text-xs text-gray-600">Phosphorus</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-gray-700">Zn</div>
                <div className="text-xs text-gray-600">Zinc</div>
              </div>
            </div>
          </div>

          {/* Additional Nutrients */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <div className="text-xs font-semibold text-green-700">Dietary Fiber</div>
              <div className="text-xs text-green-600">3.5g per 100g</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <div className="text-xs font-semibold text-green-700">Antioxidants</div>
              <div className="text-xs text-green-600">Rich source</div>
            </div>
          </div>
        </div>

        {/* Health Benefits */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center">
            <span className="text-xl mr-2">❤️</span>
            Health Benefits
          </h3>
          <div className="space-y-2">
            {(product.benefits || [
              'Boosts immunity and strengthens the body',
              'Rich in antioxidants that fight free radicals',
              'Supports healthy digestion and gut health',
              'Promotes heart health and reduces cholesterol',
              'Helps maintain healthy blood pressure',
              'Supports bone health and strength'
            ]).map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Storage & Usage Tips */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center">
            <span className="text-xl mr-2">💡</span>
            Storage & Usage Tips
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-green-600 font-bold mr-2">•</span>
              <p className="text-sm text-gray-700">Store in a cool, dry place away from direct sunlight</p>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 font-bold mr-2">•</span>
              <p className="text-sm text-gray-700">Best consumed within 3-5 days of delivery for maximum freshness</p>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 font-bold mr-2">•</span>
              <p className="text-sm text-gray-700">Wash thoroughly before consumption</p>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 font-bold mr-2">•</span>
              <p className="text-sm text-gray-700">Can be used in salads, cooking, juicing, or eaten raw</p>
            </div>
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-900">Quantity</span>
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors font-bold"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-6 py-2 border-l-2 border-r-2 border-gray-200 font-bold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors font-bold"
              >
                +
              </button>
            </div>
          </div>

          {product.deliveryDays && product.deliveryDays.length > 0 && (
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Delivery Day</span>
              <select
                value={selectedDeliveryDay}
                onChange={(e) => setSelectedDeliveryDay(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:border-green-500 focus:outline-none"
              >
                {product.deliveryDays.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Total Price */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-5 text-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-3xl font-bold">₹{(product.price * quantity).toFixed(2)}</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-green-700 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Add to Weekly Request
          </button>
        </div>

        {/* Delivery Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-blue-900 mb-1">Delivery Information</p>
              <p className="text-sm text-blue-700">Your weekly request will be delivered fresh every {selectedDeliveryDay}. You can modify your order anytime from your cart.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;