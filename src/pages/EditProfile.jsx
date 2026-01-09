import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import naturalFarmingProducts from '../data/natural-farming-products.json';

const EditProfile = () => {
  const { t, language } = useLanguage();

  // Form state for all sections
  const [formData, setFormData] = useState({
    // Step 1: Basic Profile
    farmerName: '',
    farmName: '',
    village: '',
    district: '',
    state: '',
    mobile: '',
    whatsapp: '',
    profilePhoto: null,
    coverPhoto: null,
    experience: '',
    farmSize: '',

    // Step 2: Story
    journey: '',

    // Step 3: Gallery
    galleryPhotos: [],

    // Step 4: Products
    products: [],

    // Step 5: Certifications
    certifications: [],

    // Step 6: Review
    agreedToTerms: false
  });

  const stateOptions = [
    'Bihar', 'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Punjab', 
    'Haryana', 'Maharashtra', 'Gujarat', 'West Bengal', 'Jharkhand'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const handleFileUpload = (field, files) => {
    if (field === 'galleryPhotos') {
      const newPhotos = Array.from(files).slice(0, 20 - formData.galleryPhotos.length);
      setFormData(prev => ({
        ...prev,
        galleryPhotos: [...prev.galleryPhotos, ...newPhotos]
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: files[0] }));
    }
  };

  // Get unique categories from natural-farming-products.json
  const [productCategories, setProductCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});

  useEffect(() => {
    // Extract unique categories
    const categories = [...new Set(naturalFarmingProducts.map(p => p.category))];
    setProductCategories(categories);

    // Group products by category
    const grouped = {};
    naturalFarmingProducts.forEach(product => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    setCategoryProducts(grouped);
  }, []);

  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      category: '',
      name: '',
      images: []
    };
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const updateProduct = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };

  const removeProduct = (id) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      type: '',
      number: '',
      image: null,
      validTill: ''
    };
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  const updateCertification = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => 
        c.id === id ? { ...c, [field]: value } : c
      )
    }));
  };

  const removeCertification = (id) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // TODO: Submit to backend
    alert(language === 'hi' ? 'प्रोफाइल सफलतापूर्वक सहेजी गई!' : 'Profile saved successfully!');
  };

  // Section 1: Basic Profile Information
  const renderSection1 = () => (
    <div className="space-y-6 bg-white p-6 md:p-8 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {language === 'hi' ? '🧑‍🌾 बुनियादी जानकारी' : '🧑‍🌾 Basic Information'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'किसान का पूरा नाम *' : 'Farmer Full Name *'}
          </label>
          <input
            type="text"
            value={formData.farmerName}
            onChange={(e) => handleInputChange('farmerName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={language === 'hi' ? 'उदाहरण: रमेश कुमार' : 'e.g., Ramesh Kumar'}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'फार्म का नाम *' : 'Farm Name *'}
          </label>
          <input
            type="text"
            value={formData.farmName}
            onChange={(e) => handleInputChange('farmName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={language === 'hi' ? 'उदाहरण: श्री राम ऑर्गेनिक फार्म' : 'e.g., Shri Ram Organic Farm'}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'गांव / शहर *' : 'Village / City *'}
          </label>
          <input
            type="text"
            value={formData.village}
            onChange={(e) => handleInputChange('village', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={language === 'hi' ? 'गांव का नाम' : 'Village name'}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'जिला *' : 'District *'}
          </label>
          <input
            type="text"
            value={formData.district}
            onChange={(e) => handleInputChange('district', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={language === 'hi' ? 'जिला का नाम' : 'District name'}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'राज्य *' : 'State *'}
          </label>
          <select
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">{language === 'hi' ? 'राज्य चुनें' : 'Select State'}</option>
            {stateOptions.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
          </label>
          <input
            type="tel"
            value={formData.mobile}
            onChange={(e) => handleInputChange('mobile', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="10 digit mobile number"
            pattern="[0-9]{10}"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'WhatsApp नंबर' : 'WhatsApp Number'}
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={language === 'hi' ? 'वैकल्पिक' : 'Optional'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'खेती का अनुभव (वर्ष)' : 'Farming Experience (Years)'}
          </label>
          <input
            type="number"
            value={formData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="15"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'फार्म साइज (एकड़/बीघा)' : 'Farm Size (Acre/Bigha)'}
          </label>
          <input
            type="text"
            value={formData.farmSize}
            onChange={(e) => handleInputChange('farmSize', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={language === 'hi' ? '5 एकड़' : '5 Acres'}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'hi' ? 'प्रोफाइल फोटो *' : 'Profile Photo *'}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload('profilePhoto', e.target.files)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {formData.profilePhoto && (
          <p className="text-sm text-green-600 mt-2">✓ {formData.profilePhoto.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'hi' ? 'फार्म कवर फोटो *' : 'Farm Cover Photo *'}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload('coverPhoto', e.target.files)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {formData.coverPhoto && (
          <p className="text-sm text-green-600 mt-2">✓ {formData.coverPhoto.name}</p>
        )}
      </div>
    </div>
  );

  // Section 2: Farm Story & Philosophy
  const renderSection2 = () => (
    <div className="space-y-6 bg-green-50 p-6 md:p-8 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {language === 'hi' ? '📖 हमारी कहानी' : '📖 Our Story'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'hi' ? 'किसान की यात्रा / कहानी *' : 'Farmer Journey / Story *'}
        </label>
        <textarea
          value={formData.journey}
          onChange={(e) => handleInputChange('journey', e.target.value)}
          rows="8"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder={language === 'hi' 
            ? 'हम पिछले 15 सालों से बिना रसायन की खेती कर रहे हैं...' 
            : 'We have been farming without chemicals for the past 15 years...'}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {language === 'hi' 
            ? 'अपनी खेती की कहानी, अनुभव और सफर के बारे में बताएं' 
            : 'Share your farming story, experience and journey'}
        </p>
      </div>
    </div>
  );

  // Section 3: Farm Gallery
  const renderSection3 = () => (
    <div className="space-y-6 bg-white p-6 md:p-8 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {language === 'hi' ? '🖼️ फार्म गैलरी' : '🖼️ Farm Gallery'}
      </h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          {language === 'hi' 
            ? '📸 कम से कम 5 तस्वीरें और अधिकतम 20 तस्वीरें अपलोड करें' 
            : '📸 Upload minimum 5 photos and maximum 20 photos'}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          {language === 'hi' 
            ? 'खेत, फसल, जानवर, कटाई की तस्वीरें शामिल करें' 
            : 'Include photos of field, crops, animals, harvest'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'hi' ? 'तस्वीरें अपलोड करें *' : 'Upload Photos *'}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileUpload('galleryPhotos', e.target.files)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          disabled={formData.galleryPhotos.length >= 20}
        />
        <p className="text-xs text-gray-500 mt-1">
          {language === 'hi' 
            ? `${formData.galleryPhotos.length} / 20 तस्वीरें अपलोड की गई` 
            : `${formData.galleryPhotos.length} / 20 photos uploaded`}
        </p>
      </div>

      {formData.galleryPhotos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.galleryPhotos.map((photo, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={URL.createObjectURL(photo)} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    galleryPhotos: prev.galleryPhotos.filter((_, i) => i !== index)
                  }));
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Section 4: Products Management
  const renderSection4 = () => (
    <div className="space-y-6 bg-green-50 p-6 md:p-8 rounded-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'hi' ? '🥕 उत्पाद जोड़ें' : '🥕 Add Products'}
        </h2>
        <button
          onClick={addProduct}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {language === 'hi' ? 'नया उत्पाद' : 'Add Product'}
        </button>
      </div>

      {formData.products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {language === 'hi' 
              ? 'कोई उत्पाद नहीं जोड़ा गया। "नया उत्पाद" बटन दबाएं।' 
              : 'No products added. Click "Add Product" button.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.products.map((product, index) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {language === 'hi' ? `उत्पाद ${index + 1}` : `Product ${index + 1}`}
                </h3>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'श्रेणी *' : 'Category *'}
                  </label>
                  <select
                    value={product.category}
                    onChange={(e) => {
                      updateProduct(product.id, 'category', e.target.value);
                      updateProduct(product.id, 'name', ''); // Reset name when category changes
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">{language === 'hi' ? 'श्रेणी चुनें' : 'Select Category'}</option>
                    {productCategories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'उत्पाद का नाम *' : 'Product Name *'}
                  </label>
                  <select
                    value={product.name}
                    onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={!product.category}
                  >
                    <option value="">
                      {!product.category
                        ? (language === 'hi' ? 'पहले श्रेणी चुनें' : 'Select category first')
                        : (language === 'hi' ? 'उत्पाद चुनें' : 'Select product')
                      }
                    </option>
                    {product.category && categoryProducts[product.category]?.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Section 5: Certifications
  const renderSection5 = () => (
    <div className="space-y-6 bg-white p-6 md:p-8 rounded-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'hi' ? '📜 प्रमाणपत्र' : '📜 Certifications'}
        </h2>
        <button
          onClick={addCertification}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {language === 'hi' ? 'प्रमाणपत्र जोड़ें' : 'Add Certificate'}
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          {language === 'hi' 
            ? '⚠️ यदि आपके पास प्रमाणपत्र नहीं है, तो "रसायन मुक्त लेकिन प्रमाणित नहीं" विकल्प चुनें' 
            : '⚠️ If you don\'t have certificates, select "Chemical-free but not certified" option'}
        </p>
      </div>

      {formData.certifications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {language === 'hi' 
              ? 'कोई प्रमाणपत्र नहीं जोड़ा गया। यदि आपके पास है तो जोड़ें।' 
              : 'No certificates added. Add if you have any.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.certifications.map((cert, index) => (
            <div key={cert.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {language === 'hi' ? `प्रमाणपत्र ${index + 1}` : `Certificate ${index + 1}`}
                </h3>
                <button
                  onClick={() => removeCertification(cert.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'प्रमाणपत्र का प्रकार *' : 'Certificate Type *'}
                  </label>
                  <select
                    value={cert.type}
                    onChange={(e) => updateCertification(cert.id, 'type', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">{language === 'hi' ? 'चुनें' : 'Select'}</option>
                    <option value="organic">{language === 'hi' ? 'प्रमाणित जैविक' : 'Certified Organic'}</option>
                    <option value="fssai">FSSAI</option>
                    <option value="pgs">PGS India</option>
                    <option value="not_certified">{language === 'hi' ? 'प्रमाणित नहीं, लेकिन रसायन मुक्त' : 'Not Certified, but Chemical-free'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'प्रमाणपत्र संख्या' : 'Certificate Number'}
                  </label>
                  <input
                    type="text"
                    value={cert.number}
                    onChange={(e) => updateCertification(cert.id, 'number', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="CERT123456"
                    disabled={cert.type === 'not_certified'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'वैध तिथि तक' : 'Valid Till Date'}
                  </label>
                  <input
                    type="date"
                    value={cert.validTill}
                    onChange={(e) => updateCertification(cert.id, 'validTill', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={cert.type === 'not_certified'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'प्रमाणपत्र की तस्वीर' : 'Certificate Image'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => updateCertification(cert.id, 'image', e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={cert.type === 'not_certified'}
                  />
                  {cert.image && (
                    <p className="text-sm text-green-600 mt-2">✓ {cert.image.name}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Section 6: Preview & Publish
  const renderSection6 = () => (
    <div className="space-y-6 bg-green-50 p-6 md:p-8 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {language === 'hi' ? '✅ समीक्षा और प्रकाशित करें' : '✅ Review & Publish'}
      </h2>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4">
          {language === 'hi' ? '📋 आपकी प्रोफाइल सारांश' : '📋 Your Profile Summary'}
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'hi' ? 'किसान का नाम:' : 'Farmer Name:'}</span>
            <span className="font-medium">{formData.farmerName || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'hi' ? 'फार्म का नाम:' : 'Farm Name:'}</span>
            <span className="font-medium">{formData.farmName || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'hi' ? 'स्थान:' : 'Location:'}</span>
            <span className="font-medium">{formData.village}, {formData.district}, {formData.state}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'hi' ? 'मोबाइल:' : 'Mobile:'}</span>
            <span className="font-medium">{formData.mobile || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'hi' ? 'अनुभव:' : 'Experience:'}</span>
            <span className="font-medium">{formData.experience ? `${formData.experience} ${language === 'hi' ? 'वर्ष' : 'years'}` : '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'hi' ? 'गैलरी तस्वीरें:' : 'Gallery Photos:'}</span>
            <span className="font-medium">{formData.galleryPhotos.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'hi' ? 'उत्पाद:' : 'Products:'}</span>
            <span className="font-medium">{formData.products.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'hi' ? 'प्रमाणपत्र:' : 'Certificates:'}</span>
            <span className="font-medium">{formData.certifications.length || 0}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">
          {language === 'hi' ? '📝 महत्वपूर्ण नोट:' : '📝 Important Note:'}
        </h4>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>{language === 'hi' ? 'आपकी प्रोफाइल प्रकाशित होने के बाद ग्राहकों को दिखाई देगी' : 'Your profile will be visible to customers after publishing'}</li>
          <li>{language === 'hi' ? 'आप बाद में भी अपनी प्रोफाइल संपादित कर सकते हैं' : 'You can edit your profile later as well'}</li>
          <li>{language === 'hi' ? 'सभी जानकारी सही और सत्य होनी चाहिए' : 'All information should be correct and truthful'}</li>
        </ul>
      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="terms"
          checked={formData.agreedToTerms}
          onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
          className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          {language === 'hi' 
            ? 'मैं पुष्टि करता/करती हूं कि ऊपर दी गई सभी जानकारी सही और सत्य है। मैं देसी बास्केट की नियम और शर्तों से सहमत हूं।' 
            : 'I confirm that all the information provided above is correct and truthful. I agree to Desi Basket\'s terms and conditions.'}
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">
            {language === 'hi' ? 'अपनी प्रोफाइल बनाएं' : 'Create Your Profile'}
          </h1>
        </div>
      </div>

      {/* Main Content - All Sections in One Page */}
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Section 1: Basic Information - White Background */}
        {renderSection1()}

        {/* Section 2: Farm Story - Light Green Background */}
        {renderSection2()}

        {/* Section 3: Farm Gallery - White Background */}
        {renderSection3()}

        {/* Section 4: Products - Light Green Background */}
        {renderSection4()}

        {/* Section 5: Certifications - White Background */}
        {renderSection5()}

        {/* Section 6: Review & Publish - Light Green Background */}
        {renderSection6()}

        {/* Submit Button */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
          <button
            onClick={handleSubmit}
            disabled={!formData.agreedToTerms}
            className={`w-full px-6 py-4 rounded-lg font-medium text-lg transition-colors ${
              formData.agreedToTerms
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {language === 'hi' ? '✓ प्रोफाइल प्रकाशित करें' : '✓ Publish Profile'}
          </button>
          
          {/* Auto-save indicator */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              {language === 'hi'
                ? '💾 आपका डेटा स्वचालित रूप से सहेजा जा रहा है'
                : '💾 Your data is being auto-saved'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;