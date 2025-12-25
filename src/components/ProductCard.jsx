import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, updateQuantity, removeItem } = useCart();
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Check if product is in cart
  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  // Extract name based on language
  const getProductName = () => {
    const fullName = product.name || '';
    const match = fullName.match(/^(.+?)\s*\((.+?)\)$/);
    if (match) {
      const hindiName = match[1].trim();
      const englishName = match[2].trim();
      return language === 'hi' ? hindiName : englishName;
    }
    return fullName;
  };

  const displayName = getProductName();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeItem(product.id);
  };

  const handleClick = () => {
    navigate(`/dashboard/product/${product.id}`);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden bg-white aspect-square p-2">
        <img
          src={product.images?.[0] || product.image || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0"></div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name */}
        <h3 onClick={handleClick} className="font-semibold text-gray-900 text-lg leading-tight hover:text-green-700 transition-colors line-clamp-2 cursor-pointer">
          {displayName}
        </h3>

        {/* Price */}
        <p className="text-lg font-bold text-gray-900 my-2">
          ₹{product.price}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 flex-grow mt-1">
          {product.description}
        </p>

        {/* Cart Action */}
        <div className="mt-4">
          {!isInCart ? (
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-xl font-medium text-sm hover:from-green-600 hover:to-green-700 transition-all shadow hover:shadow-md"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between bg-gray-50 rounded-full p-1.5 border border-green-500">
              <button
                onClick={handleRemove}
                className="p-1.5 text-gray-700 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Remove from cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              <span className="text-lg font-bold text-gray-900 min-w-[28px] text-center">
                {quantity}
              </span>

              <button
                onClick={handleIncrement}
                className="p-1.5 text-gray-700 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors"
                aria-label="Increase quantity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;