import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import farmersData from '../data/farmers.json';
import naturalFarmingData from '../data/natural-farming-products.json';

// Import Ramesh Kumar's images
import rameshMain from '../assets/farmers/ramesh_kumar.png';
import rameshPic1 from '../assets/farmers/ramesh/ramesh_pic_1.png';
import rameshPic2 from '../assets/farmers/ramesh/ramesh_pic_2.png';
import rameshPic3 from '../assets/farmers/ramesh/ramesh_pic_3.png';
import rameshPic4 from '../assets/farmers/ramesh/ramesh_pic_4.png';
import rameshPic5 from '../assets/farmers/ramesh/ramesh_pic_5.png';
import rameshPic6 from '../assets/farmers/ramesh/ramesh_pic_6.png';
import rameshPic7 from '../assets/farmers/ramesh/ramesh_pic_7.png';
import rameshPic8 from '../assets/farmers/ramesh/ramesh_pic_8.png';
import rameshPic9 from '../assets/farmers/ramesh/ramesh_pic_9.png';

const FarmerDetails = () => {
  const { farmerId } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        setLoading(true);

        // Find farmer from farmers.json
        const farmerData = farmersData.farmers.find(f => f.id === farmerId);
        if (!farmerData) {
          throw new Error('Farmer not found');
        }

        // Get products from natural-farming-products.json and filter by farmer's specialties
        const allProducts = naturalFarmingData.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: Math.floor(Math.random() * 200) + 30,
          unit: item.quantity_units || 'kg',
          images: [item.image],
          isOrganic: item.local_only || false,
          certification: item.local_only ? 'Local Certified' : 'Standard',
          category: item.category,
          farmerId: farmerId // Assign to this farmer
        }));

        // Filter products that match farmer's specialties
        let farmerProducts = [];
        
        if (farmerId === "1") {
          // For Ramesh Kumar, show vegetables (especially leafy greens and root vegetables)
          farmerProducts = allProducts.filter(product =>
            product.category === 'vegetable' ||
            product.category === 'herb' ||
            (product.name.toLowerCase().includes('spinach')) ||
            (product.name.toLowerCase().includes('carrot')) ||
            (product.name.toLowerCase().includes('potato')) ||
            (product.name.toLowerCase().includes('tomato')) ||
            (product.name.toLowerCase().includes('cabbage')) ||
            (product.name.toLowerCase().includes('onion'))
          );
        } else {
          // For other farmers, use generic filtering
          farmerProducts = allProducts.filter(product => {
            return farmerData.specialties.some(specialty =>
              product.name.toLowerCase().includes(specialty.toLowerCase()) ||
              product.description.toLowerCase().includes(specialty.toLowerCase())
            );
          });
        }

        setFarmer(farmerData);
        setProducts(farmerProducts);
      } catch (error) {
        console.error('Failed to load farmer data:', error);
        setError('Failed to load farmer data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, [farmerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
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
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Farmer Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/dashboard/farmers"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Farmers
          </Link>
        </div>
      </div>
    );
  }

  // Get Ramesh Kumar's gallery images
  const getRameshGallery = () => {
    return [
      {
        src: rameshMain,
        alt: 'Ramesh Kumar - Main Profile',
        caption: 'Ramesh Kumar at Kumar Organic Farm'
      },
      {
        src: rameshPic1,
        alt: 'Organic Vegetable Farming',
        caption: 'Fresh organic vegetables ready for harvest'
      },
      {
        src: rameshPic2,
        alt: 'Farm Field View',
        caption: 'Lush green fields at Kumar Organic Farm'
      },
      {
        src: rameshPic3,
        alt: 'Organic Cultivation',
        caption: 'Traditional organic farming methods'
      },
      {
        src: rameshPic4,
        alt: 'Farm Activities',
        caption: 'Daily farm activities and crop care'
      },
      {
        src: rameshPic5,
        alt: 'Harvest Season',
        caption: 'Harvesting fresh organic produce'
      },
      {
        src: rameshPic6,
        alt: 'Quality Check',
        caption: 'Ensuring quality of organic vegetables'
      },
      {
        src: rameshPic7,
        alt: 'Farm Infrastructure',
        caption: 'Modern organic farming infrastructure'
      },
      {
        src: rameshPic8,
        alt: 'Sustainable Practices',
        caption: 'Implementing sustainable farming practices'
      },
      {
        src: rameshPic9,
        alt: 'Community Farming',
        caption: 'Working with local farming community'
      }
    ];
  };

  // Generate farm gallery images based on farmer
  const getFarmGallery = () => {
    // For Ramesh Kumar (id="1"), use his specific images
    if (farmerId === "1") {
      return getRameshGallery();
    }

    // For other farmers, use generic images (will be replaced when API comes)
    const farmImages = [];
    const farmSize = farmer.farmSize || '5 acres';

    // Add main farmer image
    farmImages.push({
      src: farmer.image || '/farmer-placeholder.jpg',
      alt: `${farmer.name}'s portrait`,
      caption: `${farmer.name} - ${farmer.yearsExperience}+ years of organic farming`
    });

    // Add specialty-based farm images
    farmer.specialties.forEach((specialty, index) => {
      farmImages.push({
        src: `/src/assets/farmers/farmer${(index % 13) + 1}.png`,
        alt: `${specialty} farming`,
        caption: `Organic ${specialty} cultivation at ${farmer.farmName}`
      });
    });

    return farmImages;
  };

  // Generate farmer story
  const getFarmerStory = () => {
    const firstName = farmer.name.split(' ')[0];
    const years = farmer.yearsExperience;

    return (
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p className="text-lg font-medium text-gray-800">
          {firstName}'s Journey to Organic Farming
        </p>

        <p>
          {firstName} was born and raised in {farmer.location}, surrounded by the rich agricultural traditions of
          the region. From a young age, {firstName} learned the value of sustainable farming from {firstName}'s
          family, who had been cultivating the land for generations using traditional methods.
        </p>

        <p>
          {years} years ago, {firstName} decided to take the bold step of converting the family farm to 100% organic
          practices. This decision came after witnessing the harmful effects of chemical fertilizers and pesticides
          on both the soil health and the well-being of local farmers.
        </p>

        <p>
          The transition wasn't easy. {firstName} spent years learning about organic certification processes,
          natural pest control methods, and soil regeneration techniques. Through perseverance and dedication,
          {firstName} transformed {farmer.farmSize} of land into a thriving organic farm that now produces some of
          the healthiest {farmer.specialties.join(', ')} in the region.
        </p>

        <p>
          Today, {farmer.farmName} is known for its commitment to sustainability and quality. {firstName} uses
          traditional Indian farming wisdom combined with modern organic techniques to create a harmonious
          ecosystem where plants, animals, and soil thrive together.
        </p>

        <p className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
          <strong>Our Organic Philosophy:</strong> "The soil is our most precious resource. By nurturing it with
          natural methods, we not only grow healthier food but also protect our land for future generations."
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-semibold text-green-600 mb-2">🌱 Organic Certifications</p>
            <ul className="text-sm space-y-1">
              {farmer.certifications.map((cert, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  {cert}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-semibold text-green-600 mb-2">🏆 Farm Achievements</p>
            <ul className="text-sm space-y-1">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                {years}+ years organic farming
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                {farmer.reviewCount}+ happy customers
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                {farmer.rating}★ customer rating
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const farmGallery = getFarmGallery();
  const farmerStory = getFarmerStory();

  // Get main profile image for Ramesh Kumar
  const getMainImage = () => {
    if (farmerId === "1") {
      return rameshPic5;
    }
    return farmer.image || '/farmer-placeholder.jpg';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with navigation */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <Link
              to="/dashboard/farmers"
              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Farmers
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-4 flex items-center">
            <span className="text-green-600 mr-3">🌾</span>
            {farmer.name}'s Organic Farm
          </h1>
          <p className="text-gray-600 mt-1">{farmer.farmName} • {farmer.location}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'story'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Our Story
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'gallery'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Farm Gallery
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'products'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Our Products
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-6">
              {/* Hero Section */}
              <div className="relative mb-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="relative">
                    <img
                      src={getMainImage()}
                      alt={farmer.name}
                      className="w-full h-80 object-cover rounded-lg shadow-lg"
                      onError={(e) => {
                        e.target.src = '/farmer-placeholder.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {farmer.yearsExperience}+ years experience
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                      <div className="flex items-center text-green-600 font-bold">
                        <span className="text-lg">{farmer.rating}</span>
                        <svg className="w-4 h-4 ml-1 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                      <span className="text-xs text-gray-600 block text-center">({farmer.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{farmer.name}</h2>
                    <p className="text-lg text-green-600 font-semibold mb-3">{farmer.farmName}</p>

                    <div className="flex items-center text-gray-600 mb-3">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                      </svg>
                      <span>{farmer.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-4">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                      <span>📞 {farmer.contact}</span>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {farmer.specialties.map((specialty, index) => (
                          <span key={index} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {farmer.certifications.map((cert, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">📏 Farm Size: <span className="font-semibold">{farmer.farmSize}</span></p>
                      <p className="text-sm text-gray-600">Our {farmer.farmSize} farm follows 100% organic practices with no chemical fertilizers or pesticides.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-green-600 mr-2">🌱</span>
                  About {farmer.name.split(' ')[0]}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">{farmer.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">{farmer.yearsExperience}+</p>
                    <p className="text-sm text-gray-600">Years of Experience</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">{farmer.reviewCount}+</p>
                    <p className="text-sm text-gray-600">Happy Customers</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">{farmer.rating}</p>
                    <p className="text-sm text-gray-600">Customer Rating</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">{farmer.specialties.length}+</p>
                    <p className="text-sm text-gray-600">Specialty Products</p>
                  </div>
                </div>
              </div>

              {/* Main Products */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-green-600 mr-2">🍅</span>
                  Our Main Products
                </h3>
                <div className="flex flex-wrap gap-2">
                  {farmer.mainProducts.map((product, index) => (
                    <span key={index} className="bg-white border border-green-200 text-green-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Story Tab */}
          {activeTab === 'story' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                {farmerStory}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-green-600 mr-2">📸</span>
                {farmerId === "1" ? "Kumar Organic Farm Gallery" : "Our Organic Farm Gallery"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {farmGallery.map((image, index) => (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/farmer-placeholder.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium">{image.caption}</p>
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Image Modal */}
              {selectedImage && (
                <div 
                  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <div className="relative max-w-5xl w-full">
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                    />
                    <div className="mt-4 text-center">
                      <p className="text-white text-lg font-medium">{selectedImage.caption}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-green-600 mr-2">🍎</span>
                Our Organic Products
              </h3>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="relative mb-2">
                        <img
                          src={product.images?.[0] || '/placeholder-product.jpg'}
                          alt={product.name}
                          className="w-full h-24 object-cover rounded"
                          onError={(e) => {
                            e.target.src = '/placeholder-product.jpg';
                          }}
                        />
                        {product.isOrganic && (
                          <span className="absolute top-1 left-1 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
                            Organic
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium text-sm text-gray-800 truncate">{product.name}</h3>
                      <p className="text-sm text-gray-600">₹{product.price}/{product.unit}</p>
                      <Link
                        to={`/dashboard/product/${product.id}`}
                        className="block text-center mt-2 text-xs bg-green-600 text-white py-1 rounded hover:bg-green-700 transition-colors"
                      >
                        View Product
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No products available at the moment. Check back soon!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDetails;