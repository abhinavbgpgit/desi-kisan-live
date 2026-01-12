import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get('/profile/info');
      
      if (response.success && response.data) {
        setProfileData(response.data.farmer);
      } else {
        setError('Failed to load profile data');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.response?.data?.message || 'Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleEditProfile = () => {
    navigate('/dashboard/edit-profile');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Loading Skeleton */}
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-3xl mb-6"></div>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchProfileData}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full text-center">
          <p className="text-gray-600">No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pb-24">
      {/* Cover Photo Section */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-green-600 to-emerald-600 overflow-hidden">
        {profileData.cover_photo ? (
          <img
            src={profileData.cover_photo}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Header Actions */}
        <div className="absolute top-4 right-4 flex space-x-3">
          <button
            onClick={handleEditProfile}
            className="px-4 py-2 bg-white/90 backdrop-blur-sm text-green-700 rounded-xl font-semibold hover:bg-white transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="hidden md:inline">Edit Profile</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/90 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Photo */}
            <div className="relative">
              {profileData.profile_photo ? (
                <img
                  src={profileData.profile_photo}
                  alt={profileData.farmer_name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center border-4 border-white shadow-xl">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {profileData.farmer_name?.charAt(0).toUpperCase() || 'F'}
                  </span>
                </div>
              )}
              {!profileData.is_completed && (
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Incomplete
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {profileData.farmer_name}
              </h1>
              <p className="text-xl text-green-600 font-semibold mb-4">{profileData.farm_name}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{profileData.village}, {profileData.district}, {profileData.state}</span>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{profileData.mobile}</span>
                </div>

                {profileData.whatsapp && (
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>{profileData.whatsapp}</span>
                  </div>
                )}

                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {profileData.experience_years
                      ? `${profileData.experience_years} years experience`
                      : 'Experience not specified'}
                  </span>
                </div>

                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>
                    {profileData.farm_size && profileData.farm_size.trim() !== ''
                      ? profileData.farm_size
                      : 'Farm size not specified'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {profileData.user?.role || 'Farmer'}
                </span>
                {profileData.agreed_to_terms && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        {profileData.products && profileData.products.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-7 h-7 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Products ({profileData.products.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileData.products.map((product) => (
                <div key={product.id} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-200 hover:border-green-400 transition-all duration-200 hover:shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-green-600 font-semibold">{product.category}</p>
                    </div>
                    {product.images && product.images.length > 0 && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
                      />
                    )}
                  </div>
                  {product.images && product.images.length > 1 && (
                    <p className="text-xs text-gray-500">+{product.images.length - 1} more images</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Section */}
        {profileData.gallery && profileData.gallery.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-7 h-7 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Gallery ({profileData.gallery.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {profileData.gallery.map((image) => (
                <div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.secure_url}
                    alt={image.fileName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Story Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-7 h-7 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            My Story
          </h2>
          <div className="prose max-w-none">
            {profileData.journey && profileData.journey.trim() !== '' ? (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{profileData.journey}</p>
            ) : (
              <p className="text-gray-400 italic">No story added yet. Edit your profile to share your farming journey.</p>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-7 h-7 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">User ID</p>
              <p className="font-semibold text-gray-900">{profileData.userId}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">Farmer ID</p>
              <p className="font-semibold text-gray-900">{profileData.id}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">Member Since</p>
              <p className="font-semibold text-gray-900">
                {new Date(profileData.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">Last Updated</p>
              <p className="font-semibold text-gray-900">
                {new Date(profileData.updatedAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-4xl w-full">
            <img
              src={selectedImage.secure_url}
              alt={selectedImage.fileName}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white text-sm">{selectedImage.fileName}</p>
              <p className="text-gray-400 text-xs mt-1">
                {(selectedImage.fileSize / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;