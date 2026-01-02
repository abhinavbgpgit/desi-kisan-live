import React from 'react';

const CategoryCard = ({ category, onClick, isSelected = false }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        ${isSelected ? 'bg-green-600' : 'bg-white'}
        rounded-2xl
        ${isSelected ? 'border-0' : 'border border-gray-200'}
        shadow-sm
        hover:shadow-md
        transition-all
        flex-shrink-0
        cursor-pointer

        w-[120px] h-[130px]
        md:w-[170px] md:h-[180px]

        flex flex-col
        items-center
        justify-between
        p-1.5 md:p-2
      `}
    >
      {/* Image container */}
      <div className="
        w-full
        h-[80px]
        md:h-[135px]
        rounded-xl
        overflow-hidden
        flex items-center justify-center
        bg-gray-50
      ">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Text */}
      <div className={`
        text-sm md:text-base
        font-medium
        ${isSelected ? 'text-white' : 'text-gray-800'}
        text-center
        mt-1
      `}>
        {category.name}
      </div>
    </div>
  );
};

export default CategoryCard;