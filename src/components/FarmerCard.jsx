import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import all farmer images
import farmer1 from '../assets/farmers/ramesh_kumar.png';
import farmer2 from '../assets/farmers/farmer2.jpg';
import farmer3 from '../assets/farmers/farmer3.jpg';
import farmer4 from '../assets/farmers/farmer4.jpg';
import farmer5 from '../assets/farmers/farmer5.png';
import farmer6 from '../assets/farmers/farmer6.png';
import farmer7 from '../assets/farmers/farmer7.png';
import farmer8 from '../assets/farmers/farmer8.png';
import farmer9 from '../assets/farmers/farmer9.png';
import farmer10 from '../assets/farmers/farmer10.png';
import farmer11 from '../assets/farmers/farmer11.png';
import farmer12 from '../assets/farmers/farmer12.png';
import farmer13 from '../assets/farmers/farmer13.png';

const FarmerCard = ({ farmer, compact = false }) => {
  // Map image references to imported images
  const imageMap = {
    'farmer1.jpg': farmer1,
    'farmer2.jpg': farmer2,
    'farmer3.jpg': farmer3,
    'farmer4.jpg': farmer4,
    'farmer5.png': farmer5,
    'farmer6.png': farmer6,
    'farmer7.png': farmer7,
    'farmer8.png': farmer8,
    'farmer9.png': farmer9,
    'farmer10.png': farmer10,
    'farmer11.png': farmer11,
    'farmer12.png': farmer12,
    'farmer13.png': farmer13,
  };

  // Handle image path - get the imported image or fallback
  const getImagePath = (imagePath) => {
    if (!imagePath) return '/farmer-placeholder.jpg';
    
    // Extract filename from path (e.g., "farmer1.jpg" from "/src/assets/farmers/farmer1.jpg")
    const filename = imagePath.split('/').pop();
    
    // Return the imported image if it exists, otherwise use fallback
    return imageMap[filename] || '/farmer-placeholder.jpg';
  };

  if (compact) {
    // Compact version for grid layouts (HomeDashboard)
    return (
      <Link 
        to={`/dashboard/farmer/${farmer.id}`}
        className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
      >
        <div className="flex h-full ">
          {/* Image Section - Mobile Portrait Aspect Ratio (3:4) */}
          <div className="w-2/5 relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
            <img
              src={getImagePath(farmer.image)}
              alt={farmer.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.src = '/farmer-placeholder.jpg';
              }}
            />
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Experience Badge */}
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
              {farmer.yearsExperience}+ yrs
            </div>
          </div>

          {/* Content Section */}
          <div className="w-3/5 p-4 flex flex-col justify-between">
            <div>
              {/* Name */}
              <h3 className="font-bold text-gray-900 mb-1 text-sm leading-tight group-hover:text-green-700 transition-colors">
                {farmer.name}
              </h3>
              
              {/* Primary Specialty */}
              <div className="flex items-center mb-2">
                <span className="text-xs text-green-600 font-medium">
                  {farmer.specialties && farmer.specialties.length > 0 
                    ? `🌱 ${farmer.specialties[0]}` 
                    : '🌱 Local Produce'}
                </span>
              </div>
              
              {/* Location */}
              <div className="flex items-center text-xs text-gray-600 mb-2">
                <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                <span className="truncate">{farmer.location || 'Bhagalpur, Bihar'}</span>
              </div>
              
              {/* Certification */}
              <div className="flex items-center text-xs text-green-700 mb-2">
                <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="truncate">
                  {farmer.certifications && farmer.certifications.length > 0 
                    ? farmer.certifications[0] 
                    : 'Certified Farmer'}
                </span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center text-xs text-amber-600 font-medium">
                <svg className="w-3 h-3 mr-1 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span>{farmer.rating || '4.5'}</span>
                <span className="text-gray-500 ml-1">({farmer.reviewCount || '50'})</span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-600 font-semibold group-hover:text-green-700">
                  View Profile
                </span>
                <svg className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Full version for Farmers page - PROPERLY FITTED DESIGN
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex h-96">
        {/* Image Section - 40% width, clean without overlays */}
        <div className="w-[40%] relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100">
          <img
            src={getImagePath(farmer.image)}
            alt={farmer.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = '/farmer-placeholder.jpg';
            }}
          />
        </div>

        {/* Content Section - 60% width with proper spacing */}
        <div className="w-[60%] p-5 flex flex-col justify-between">
          <div className="space-y-2.5">
            {/* Name & Experience */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-green-700 transition-colors truncate">
                  {farmer.name}
                </h3>
                {farmer.farmName && (
                  <p className="text-xs text-gray-500 italic truncate mt-0.5">{farmer.farmName}</p>
                )}
              </div>
              <div className="ml-2 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                {farmer.yearsExperience}+ yrs
              </div>
            </div>
            
            {/* Primary Specialty */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg px-3 py-2">
              <span className="text-xs text-green-700 font-semibold flex items-center">
                <span className="mr-1.5">🌱</span>
                <span className="truncate">
                  {farmer.specialties && farmer.specialties.length > 0 
                    ? farmer.specialties[0] 
                    : 'Local Produce'}
                </span>
              </span>
            </div>
            
            {/* Location */}
            <div className="flex items-center text-xs text-gray-700">
              <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <span className="font-medium truncate">{farmer.location || 'Bhagalpur, Bihar'}</span>
            </div>
            
            {/* Certifications */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              {farmer.certifications && farmer.certifications.length > 0 ? (
                farmer.certifications.slice(0, 2).map((cert, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                    {cert}
                  </span>
                ))
              ) : (
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  Certified
                </span>
              )}
              {farmer.farmSize && (
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  🏡 {farmer.farmSize}
                </span>
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-3 h-3 ${i < Math.floor(farmer.rating || 4.5) ? 'text-amber-400 fill-current' : 'text-gray-300 fill-current'}`} 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-xs font-bold text-gray-900">{farmer.rating || '4.5'}</span>
              <span className="text-xs text-gray-600 ml-1">({farmer.reviewCount || '50'})</span>
            </div>

            {/* Main Products */}
            {farmer.mainProducts && farmer.mainProducts.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {farmer.mainProducts.slice(0, 3).map((product, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
                    {product}
                  </span>
                ))}
                {farmer.mainProducts.length > 3 && (
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded font-medium">
                    +{farmer.mainProducts.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <Link
              to={`/dashboard/farmer/${farmer.id}`}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 group"
            >
              <span className="text-sm font-semibold">View Profile</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

FarmerCard.propTypes = {
  farmer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    farmName: PropTypes.string,
    image: PropTypes.string,
    specialties: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    yearsExperience: PropTypes.number,
    certifications: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    farmSize: PropTypes.string,
    mainProducts: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  compact: PropTypes.bool,
};

export default FarmerCard;