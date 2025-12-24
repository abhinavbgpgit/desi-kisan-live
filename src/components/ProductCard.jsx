import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      ...product,
      quantity: 1
    });
  };

  const handleClick = () => {
    navigate(`/dashboard/product/${product.id}`);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="flex h-48">
        {/* Image Section - Left side with fixed height */}
        <div className="w-2/5 relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
          <img
            src={product.images?.[0] || product.image || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = '/placeholder-product.jpg';
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Price Badge */}
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
            ₹{product.price}/{product.unit}
          </div>
        </div>

        {/* Content Section - Middle */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            {/* Product Name */}
            <h3 className="font-bold text-gray-900 mb-2 text-sm leading-tight group-hover:text-green-700 transition-colors line-clamp-2">
              {product.name}
            </h3>
            
            {/* Description */}
            <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Additional Info */}
          {product.category && (
            <div className="mt-2">
              <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>
          )}
        </div>

        {/* Buttons Section - Right side */}
        <div className="w-24 flex flex-col gap-2 p-3 bg-gray-50 border-l border-gray-100">
          <button
            onClick={handleClick}
            className="flex-1 bg-white border-2 border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center"
          >
            Detail
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-all duration-200 flex items-center justify-center shadow-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;