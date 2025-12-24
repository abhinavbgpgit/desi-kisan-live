import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { apiService as api } from '../services/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    email: '',
    profilePicture: '',
    addresses: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [showImageHover, setShowImageHover] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    isDefault: false
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // Load from localStorage first
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const storedProfile = JSON.parse(localStorage.getItem('profileData') || '{}');
        
        setProfileData({
          name: storedProfile.name || storedUser.name || '',
          phone: storedUser.phone || '',
          email: storedProfile.email || storedUser.email || '',
          profilePicture: storedProfile.profilePicture || '',
          addresses: storedProfile.addresses || []
        });
        
        // Try to fetch from API (will fail gracefully if API not ready)
        try {
          const response = await api.getUserProfile();
          setProfileData(response.user);
        } catch (apiError) {
          console.log('API not ready, using local data');
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setUploadingImage(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProfile = {
          ...profileData,
          profilePicture: reader.result
        };
        setProfileData(updatedProfile);
        localStorage.setItem('profileData', JSON.stringify(updatedProfile));
        setUploadingImage(false);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    const updatedProfile = {
      ...profileData,
      profilePicture: ''
    };
    setProfileData(updatedProfile);
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      
      // Save to localStorage
      localStorage.setItem('profileData', JSON.stringify(profileData));
      
      // Try to save to API (will fail gracefully if API not ready)
      try {
        await api.updateProfile(profileData);
      } catch (apiError) {
        console.log('API not ready, saved locally');
      }
      
      setEditing(false);
      setError('');
    } catch (error) {
      console.error('Failed to save profile:', error);
      setError('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = () => {
    // Validate required fields
    if (!newAddress.name.trim() || !newAddress.phone.trim() ||
        !newAddress.addressLine1.trim() || !newAddress.city.trim() ||
        !newAddress.state.trim() || !newAddress.pincode.trim()) {
      setError('Please fill all required address fields');
      return;
    }

    if (!newAddress.phone.match(/^[6-9]\d{9}$/)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!newAddress.pincode.match(/^\d{6}$/)) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    const updatedProfile = {
      ...profileData,
      addresses: [...profileData.addresses, newAddress]
    };

    setProfileData(updatedProfile);
    
    // Save to localStorage immediately
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));
    
    setNewAddress({
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      isDefault: false
    });
    
    setError('');
  };

  const handleDeleteAddress = (index) => {
    const updatedProfile = {
      ...profileData,
      addresses: profileData.addresses.filter((_, i) => i !== index)
    };
    setProfileData(updatedProfile);
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8 animate-pulse"></div>

            <div className="bg-white rounded-3xl p-8 shadow-xl mb-6">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      <div className="p-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t('my_profile')}</h1>
            {editing ? (
              <div className="flex space-x-3">
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-2.5 rounded-xl text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg shadow-green-200"
                >
                  {t('save_changes')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-2.5 rounded-xl text-green-700 bg-green-50 hover:bg-green-100 transition-all duration-200 font-medium border-2 border-green-200"
              >
                {t('edit_profile')}
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center space-x-3 animate-fadeIn">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800 text-sm font-medium">{error}</p>
              <button onClick={() => setError('')} className="ml-auto text-red-600 hover:text-red-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-6 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
              {/* Profile Picture */}
              <div className="relative group">
                <div
                  className="relative"
                  onMouseEnter={() => setShowImageHover(true)}
                  onMouseLeave={() => setShowImageHover(false)}
                >
                  {profileData.profilePicture ? (
                    <img
                      src={profileData.profilePicture}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-green-100 shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center border-4 border-green-100 shadow-lg">
                      <span className="text-4xl font-bold text-white">
                        {getInitials(profileData.name)}
                      </span>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  {showImageHover && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center transition-all duration-200">
                      <div className="text-center">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-white text-sm font-medium hover:text-green-300 transition-colors"
                        >
                          <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Edit Photo
                        </button>
                        {profileData.profilePicture && (
                          <button
                            onClick={handleRemoveImage}
                            className="text-red-300 text-xs mt-2 hover:text-red-200 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{profileData.name || 'User'}</h2>
                <p className="text-gray-600 flex items-center justify-center md:justify-start space-x-2 mb-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium">{profileData.phone}</span>
                </p>
                {profileData.email && (
                  <p className="text-gray-600 flex items-center justify-center md:justify-start space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{profileData.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Personal Information Form */}
            <div className="border-t border-gray-100 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {t('personal_information')}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('full_name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      editing
                        ? 'border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-white'
                        : 'border-transparent bg-gray-50 text-gray-600'
                    }`}
                    placeholder={t('full_name')}
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('phone_number')}
                    <span className="ml-2 text-xs font-normal text-gray-500">({t('cannot_be_changed')})</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      disabled
                      className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <svg className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
  
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('email_address')}</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      editing
                        ? 'border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-white'
                        : 'border-transparent bg-gray-50 text-gray-600'
                    }`}
                    placeholder={t('email_address')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Addresses Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t('saved_addresses')}
              </h3>
              <button
                onClick={() => setNewAddress({
                  name: '',
                  phone: '',
                  addressLine1: '',
                  addressLine2: '',
                  city: '',
                  state: '',
                  pincode: '',
                  landmark: '',
                  isDefault: profileData.addresses.length === 0
                })}
                className="px-4 py-2 rounded-xl text-green-700 bg-green-50 hover:bg-green-100 transition-all duration-200 font-medium text-sm flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>{t('add_new_address')}</span>
              </button>
            </div>

            {/* Add New Address Form */}
            {(newAddress.name !== '' || newAddress.addressLine1 !== '') && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border-2 border-green-200">
                <h4 className="font-bold text-green-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Address
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newAddress.name}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
                      placeholder="Recipient's name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newAddress.phone}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 1 *</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={newAddress.addressLine1}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
                      placeholder="House no., Building name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 2</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={newAddress.addressLine2}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
                      placeholder="Road name, Area, Colony (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={newAddress.state}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={newAddress.pincode}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
                      placeholder="6-digit pincode"
                      maxLength={6}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Landmark</label>
                    <input
                      type="text"
                      name="landmark"
                      value={newAddress.landmark}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
                      placeholder="Nearby landmark (optional)"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center">
                    <input
                      type="checkbox"
                      id="isDefault"
                      name="isDefault"
                      checked={newAddress.isDefault}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor="isDefault" className="ml-3 text-sm font-medium text-gray-700">
                      Set as default delivery address
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleAddAddress}
                    className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg shadow-green-200"
                  >
                    {t('save_address')}
                  </button>
                  <button
                    onClick={() => setNewAddress({
                      name: '',
                      phone: '',
                      addressLine1: '',
                      addressLine2: '',
                      city: '',
                      state: '',
                      pincode: '',
                      landmark: '',
                      isDefault: false
                    })}
                    className="px-6 py-3 rounded-xl text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            )}

            {/* Saved Addresses List */}
            {profileData.addresses && profileData.addresses.length > 0 ? (
              <div className="space-y-4">
                {profileData.addresses.map((address, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:border-green-300 transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h4 className="font-bold text-gray-900 text-lg">{address.name}</h4>
                          {address.isDefault && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 flex items-center space-x-2 mb-2">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="font-medium">{address.phone}</span>
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          {address.addressLine1}
                          {address.addressLine2 && `, ${address.addressLine2}`}
                          <br />
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        {address.landmark && (
                          <p className="text-gray-600 text-sm mt-2 flex items-center">
                            <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Landmark: {address.landmark}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteAddress(index)}
                        className="ml-4 p-2 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
                        title="Delete address"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-500 font-medium">{t('no_addresses')}</p>
                <p className="text-gray-400 text-sm mt-1">{t('add_first_address')}</p>
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t('settings_information')}
            </h3>

            <div className="space-y-3">
              <button className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{t('notification_preferences')}</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{t('about_farmfresh')}</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{t('terms_conditions')}</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{t('privacy_policy')}</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-50 to-red-100 text-red-600 py-4 rounded-2xl font-bold hover:from-red-100 hover:to-red-200 transition-all duration-200 border-2 border-red-200 hover:border-red-300 flex items-center justify-center space-x-3 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;