import React, { useState, useEffect } from 'react';
import FarmerCard from '../components/FarmerCard';
import farmersData from '../data/farmers.json';

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  useEffect(() => {
    const loadFarmers = async () => {
      try {
        setLoading(true);
        // Simulate API call delay for smooth loading experience
        await new Promise(resolve => setTimeout(resolve, 500));
        setFarmers(farmersData.farmers);
      } catch (error) {
        console.error('Failed to load farmers:', error);
        setError('Failed to load farmers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadFarmers();
  }, []);

  // Get unique specialties for filter
  const specialties = ['all', ...new Set(farmers.flatMap(f => f.specialties || []))];

  // Filter farmers based on search and specialty
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = searchQuery === '' || 
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (farmer.specialties && farmer.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesSpecialty = filterSpecialty === 'all' || 
      (farmer.specialties && farmer.specialties.includes(filterSpecialty));
    
    return matchesSearch && matchesSpecialty;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="mb-6">
          <div className="h-12 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden animate-pulse">
              <div className="flex h-64">
                <div className="w-2/5 bg-gray-200"></div>
                <div className="w-3/5 p-6">
                  <div className="h-5 bg-gray-200 rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Farmers</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 pb-8">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <span className="text-green-600 mr-2">🌾</span>
          Our Local Farmers
        </h1>
        <p className="text-gray-600">
          Connect directly with {farmers.length} verified local farmers in your region
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search farmers by name, location, or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
          />
          <div className="absolute left-4 top-3.5 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Specialty Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by:</span>
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setFilterSpecialty(specialty)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filterSpecialty === specialty
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-green-500 hover:text-green-600'
              }`}
            >
              {specialty === 'all' ? 'All Farmers' : specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredFarmers.length}</span> farmer{filteredFarmers.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
          {filterSpecialty !== 'all' && ` in ${filterSpecialty}`}
        </p>
      </div>

      {/* Farmers Grid */}
      {filteredFarmers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {filteredFarmers.map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No farmers found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterSpecialty('all');
            }}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">About Our Farmers</h2>
            <p className="text-gray-700 mb-3">
              All our farmers are local to the Bihar and Uttar Pradesh regions and follow traditional, sustainable farming practices.
              They are certified and committed to providing the freshest, most natural produce to our community.
            </p>
            <p className="text-gray-700">
              By purchasing from our platform, you're directly supporting local farmers and helping to sustain
              traditional agricultural practices in our region. Each farmer profile includes their specialties,
              certifications, and customer reviews to help you make informed choices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmers;