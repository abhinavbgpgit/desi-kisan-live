import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AddProduct = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    image: '',
    description: '',
    price: '',
    quantity_units: 'kg',
    farmer_sold: true,
    local_only: false,
    organic: false,
    cold_press: false,
    deshi_seeds: false,
    off_reference: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  // Categories based on products.json
  const categories = [
    { value: 'vegetable', label: 'Vegetable (सब्जी)', subcategories: ['general', 'tuber', 'bulb', 'leafy', 'pod', 'nightshade', 'gourd', 'root', 'bell_pepper'] },
    { value: 'fruit', label: 'Fruit (फल)', subcategories: ['pome', 'tropical', 'citrus'] },
    { value: 'pulses_grains', label: 'Pulses & Grains (दाल और अनाज)', subcategories: ['dal', 'grain', 'flour', 'rice', 'chura', 'arhar', 'moong', 'urad', 'chana', 'masoor', 'toor'] },
    { value: 'locery', label: 'Local Grocery (स्थानीय किराना)', subcategories: ['flour', 'condiment', 'sweetener', 'snack', 'dry_fruit'] },
    { value: 'nonveg_local', label: 'Non-Veg Local (मांसाहार)', subcategories: ['eggs', 'poultry', 'fish'] },
    { value: 'herb', label: 'Herbs & Spices (जड़ी-बूटी)', subcategories: ['leafy_herb', 'rhizome', 'bulb', 'moringa'] },
    { value: 'dairy', label: 'Dairy Products (डेयरी)', subcategories: ['liquid', 'fermented', 'fat', 'cheese'] }
  ];

  const quantityUnits = [
    { value: 'kg', label: 'Kilogram (किलो)' },
    { value: 'litre', label: 'Litre (लीटर)' },
    { value: 'dozen', label: 'Dozen (दर्जन)' },
    { value: 'bundle', label: 'Bundle (गड्डी)' },
    { value: 'jar', label: 'Jar (जार)' },
    { value: 'piece', label: 'Piece (पीस)' }
  ];

  // Get subcategories based on selected category
  const getSubcategories = () => {
    const category = categories.find(cat => cat.value === formData.category);
    return category ? category.subcategories : [];
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Update image preview
    if (name === 'image' && value) {
      setImagePreview(value);
    }

    // Reset subcategory when category changes
    if (name === 'category') {
      setFormData(prev => ({ ...prev, subcategory: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.subcategory) {
      newErrors.subcategory = 'Subcategory is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Product image URL is required';
    } else if (!formData.image.match(/^https?:\/\/.+/)) {
      newErrors.image = 'Please enter a valid image URL';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate unique ID
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 1000);
      const productId = `${formData.category}_${timestamp}_${randomNum}`;

      const newProduct = {
        id: productId,
        ...formData,
        price: parseFloat(formData.price)
      };

      // Here you would typically save to backend/database
      console.log('New Product:', newProduct);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      alert('Product added successfully! ✅');
      
      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-xl font-bold text-gray-800">{t('add_product') || 'Add Product'}</h1>
        </div>
      </div>

      {/* Form */}
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Image Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">📸</span>
              Product Image
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                )}
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => setImagePreview('')}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Basic Information
            </h2>
            
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Fresh Tomatoes"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Subcategory */}
              {formData.category && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.subcategory ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Subcategory</option>
                    {getSubcategories().map(sub => (
                      <option key={sub} value={sub}>
                        {sub.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                  {errors.subcategory && (
                    <p className="mt-1 text-sm text-red-500">{errors.subcategory}</p>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product..."
                  rows="4"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Quantity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">💰</span>
              Pricing & Quantity
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              {/* Quantity Units */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity Unit <span className="text-red-500">*</span>
                </label>
                <select
                  name="quantity_units"
                  value={formData.quantity_units}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {quantityUnits.map(unit => (
                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Product Features */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              Product Features
            </h2>
            
            <div className="space-y-3">
              {/* Farmer Sold */}
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  name="farmer_sold"
                  checked={formData.farmer_sold}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Farmer Sold (किसान द्वारा बेचा गया)</span>
              </label>

              {/* Local Only */}
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  name="local_only"
                  checked={formData.local_only}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Local Only (केवल स्थानीय)</span>
              </label>

              {/* Organic */}
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  name="organic"
                  checked={formData.organic}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Organic (जैविक)</span>
              </label>

              {/* Cold Press */}
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  name="cold_press"
                  checked={formData.cold_press}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Cold Press (कोल्ड प्रेस)</span>
              </label>

              {/* Deshi Seeds */}
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  name="deshi_seeds"
                  checked={formData.deshi_seeds}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Deshi Seeds (देसी बीज)</span>
              </label>
            </div>
          </div>

          {/* Optional Reference */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔗</span>
              Additional Information (Optional)
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reference URL
              </label>
              <input
                type="url"
                name="off_reference"
                value={formData.off_reference}
                onChange={handleChange}
                placeholder="https://example.com/reference"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 sticky bottom-0 bg-gray-50 py-4 -mx-4 px-4 md:-mx-6 md:px-6">
            <Link
              to="/dashboard"
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-center font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;