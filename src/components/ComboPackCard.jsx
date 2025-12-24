import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ComboPackCard = ({ pack }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add all items in the combo pack to cart
    pack.items.forEach(item => {
      addToCart({
        ...item,
        quantity: 1,
        isComboItem: true,
        comboId: pack.id
      });
    });
  };

  const handleClick = () => {
    // Could navigate to a combo detail page in future
    // navigate(`/combo/${pack.id}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm p-4 border border-green-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-green-800">{pack.name}</h3>
          <p className="text-sm text-gray-600">{pack.items.length} items</p>
        </div>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
          Save ₹{pack.discount}
        </span>
      </div>

      <div className="flex space-x-2 mb-3">
        {pack.items.slice(0, 4).map((item, index) => (
          <img
            key={index}
            src={item.images?.[0] || '/placeholder-product.jpg'}
            alt={item.name}
            className="w-12 h-12 rounded-lg object-cover"
            onError={(e) => {
              e.target.src = '/placeholder-product.jpg';
            }}
          />
        ))}
        {pack.items.length > 4 && (
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs">
            +{pack.items.length - 4}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-bold text-green-800">₹{pack.price}</p>
          <p className="text-xs text-gray-500 line-through">₹{pack.originalPrice}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          Add Combo
        </button>
      </div>
    </div>
  );
};

export default ComboPackCard;