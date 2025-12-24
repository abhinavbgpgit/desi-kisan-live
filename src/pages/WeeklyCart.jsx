import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { apiService as api } from '../services/api';

const WeeklyCart = () => {
  const { cartItems, updateQuantity, removeItem, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const [deliveryDay, setDeliveryDay] = useState('Friday');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showAddressPrompt, setShowAddressPrompt] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const navigate = useNavigate();

  const deliveryDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    // Check if user has address
    const checkAddress = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
        
        // Check if user has added address in profile
        const hasAddr = profileData.addresses && profileData.addresses.length > 0;
        setHasAddress(hasAddr);
      } catch (error) {
        console.error('Error checking address:', error);
        setHasAddress(false);
      }
    };

    checkAddress();
  }, []);

  const handleSubmitRequest = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty!');
      return;
    }

    // Check if user has address before submitting
    const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
    const hasAddr = profileData.addresses && profileData.addresses.length > 0;

    if (!hasAddr) {
      setShowAddressPrompt(true);
      setError('Please add a delivery address before placing your order.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const requestData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          deliveryDay: item.deliveryDay || deliveryDay
        })),
        totalAmount: getCartTotal(),
        deliveryDay
      };

      const response = await api.createRequest(requestData);

      if (response.success) {
        clearCart();
        navigate('/dashboard/request-confirmation', {
          state: {
            requestId: response.requestId,
            items: cartItems,
            deliveryDay,
            totalAmount: getCartTotal()
          }
        });
      }
    } catch (error) {
      console.error('Failed to submit request:', error);
      setError(error.message || 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CartItem = ({ item }) => {
    return (
      <div className="flex items-center p-4 border-b border-gray-100">
        <img
          src={item.images?.[0] || '/placeholder-product.jpg'}
          alt={item.name}
          className="w-16 h-16 rounded-lg object-cover mr-4"
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg';
          }}
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-600">₹{item.price}/{item.unit}</p>
          <div className="flex items-center mt-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="mx-3 text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">₹{item.price * item.quantity}</p>
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 text-sm hover:text-red-600 mt-1"
          >
            Remove
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Your Weekly Request</h1>
        <p className="text-sm text-gray-600 mb-6">Review and customize your weekly basket</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="text-sm font-medium">{error}</p>
            {showAddressPrompt && (
              <button
                onClick={() => navigate('/dashboard/profile')}
                className="mt-2 text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Add Delivery Address
              </button>
            )}
          </div>
        )}

        {/* Cart Items */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <img src="/empty-cart.png" alt="Empty cart" className="w-32 h-32 mx-auto mb-4" />
              <p className="text-gray-600">Your weekly basket is empty</p>
              <Link to="/dashboard" className="text-green-600 mt-2 inline-block hover:text-green-700">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Delivery Day Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Preferred Delivery Day</h3>
          <div className="grid grid-cols-3 gap-2">
            {deliveryDays.map((day) => (
              <button
                key={day}
                onClick={() => setDeliveryDay(day)}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  deliveryDay === day
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-8">
          <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Items ({cartItems.length})</span>
              <span className="font-medium">₹{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
          </div>
          <div className="flex justify-between items-center border-t border-gray-100 pt-3">
            <span className="font-semibold text-gray-800">Total Amount</span>
            <span className="text-xl font-bold text-green-800">₹{getCartTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitRequest}
          disabled={isSubmitting || cartItems.length === 0}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
            cartItems.length === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" />
              </svg>
              Processing...
            </span>
          ) : (
            'Submit Weekly Request'
          )}
        </button>
      </div>
    </div>
  );
};

export default WeeklyCart;