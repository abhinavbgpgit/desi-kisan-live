import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  useGetFarmerProductsQuery,
  useAddFarmerProductMutation,
  useUpdateFarmerProductMutation,
  useDeleteFarmerProductMutation 
} from '../store/api/farmerApi';
import { useGetProfileInfoQuery } from '../store/api/farmerApi';

const AddProduct = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Fetch added products from API
  const { data: farmerProductsData, isLoading: isLoadingProducts, error: productsError, refetch } = useGetFarmerProductsQuery();
  
  // Fetch available products from profile
  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileInfoQuery();
  
  // Mutations
  const [addProduct] = useAddFarmerProductMutation();
  const [updateProduct] = useUpdateFarmerProductMutation();
  const [deleteProduct] = useDeleteFarmerProductMutation();
  
  // State for modals
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // State for edit form
  const [editForm, setEditForm] = useState({
    productId: '',
    quantity: '',
    isAvailable: true,
    availabilityDate: ''
  });

  // Get added products
  const addedProducts = farmerProductsData?.data || [];
  
  // Get available products from profile
  const availableProducts = profileData?.data?.farmer?.products || [];

  // Handle delete click
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteConfirm(true);
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(selectedProduct.id).unwrap();
      setShowDeleteConfirm(false);
      setSelectedProduct(null);
      refetch();
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  // Handle edit click
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditForm({
      productId: product.productId, // This is the actual product ID from master products table
      quantity: product.quantity || '',
      isAvailable: product.isAvailable,
      availabilityDate: product.availabilityDate || ''
    });
    setShowEditModal(true);
  };

  // Handle edit form change
  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle edit save
  const handleEditSave = async () => {
    // Validate form
    if (!editForm.quantity || editForm.quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
    
    if (!editForm.isAvailable && !editForm.availabilityDate) {
      alert('Please select an availability date');
      return;
    }

    try {
      // Set availability date based on isAvailable status
      const availabilityDate = editForm.isAvailable
        ? new Date().toISOString().split('T')[0] // Today's date if available now
        : editForm.availabilityDate; // Future date if available later

      await updateProduct({
        id: selectedProduct.id, // This is the farmer_product ID for the API endpoint
        quantity: parseInt(editForm.quantity),
        isAvailable: editForm.isAvailable,
        availabilityDate: availabilityDate
      }).unwrap();
      
      setShowEditModal(false);
      setSelectedProduct(null);
      refetch();
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  // Get product details from the farmer product object
  const getProductDetails = (farmerProduct) => {
    // If product details are nested in the response, use them
    if (farmerProduct.product) {
      return farmerProduct.product;
    }
    // Fallback to finding from available products
    return availableProducts.find(p => p.id === farmerProduct.productId) || {};
  };

  if (isLoadingProducts || isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Products</h2>
          <p className="text-gray-600">Failed to load your products</p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

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
            Your Added Products
          </h1>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        {/* Added Products Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📦</span>
            Your Added Items ({addedProducts.length})
          </h2>
          
          {addedProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-lg font-medium mb-2">No products added yet</p>
              <p className="text-sm">Start adding products to showcase your farm produce</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addedProducts.map((product) => {
                const productDetails = getProductDetails(product);
                
                return (
                  <div
                    key={product.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Product Image */}
                      {productDetails.image && (
                        <img 
                          src={productDetails.image} 
                          alt={productDetails.name}
                          className="w-full h-40 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      
                      {/* Product Info */}
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {productDetails.name || 'Product'}
                        </h3>
                        {productDetails.category && (
                          <p className="text-sm text-gray-500 mt-1">
                            {productDetails.category}
                          </p>
                        )}
                        
                        {/* Quantity */}
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">Quantity:</span>
                          <span className="text-sm text-gray-600">{product.quantity}</span>
                        </div>
                        
                        {/* Availability Status */}
                        <div className="mt-2">
                          {product.isAvailable ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              Available Now
                            </span>
                          ) : (
                            <div className="flex flex-col gap-1">
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full w-fit">
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                Available From
                              </span>
                              {product.availabilityDate && (
                                <span className="text-xs text-gray-600">
                                  Date: {new Date(product.availabilityDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Confirm Delete
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              
              {selectedProduct && (
                <div className="bg-gray-50 rounded-lg p-3 mb-6">
                  <p className="font-medium text-gray-800">
                    {getProductDetails(selectedProduct).name}
                  </p>
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Edit Product
              </h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedProduct(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {selectedProduct && (
              <div className="space-y-4">
                {/* Product Name (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
                    {getProductDetails(selectedProduct).name}
                  </div>
                </div>
                
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editForm.quantity}
                    onChange={(e) => handleEditFormChange('quantity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter quantity"
                  />
                </div>
                
                {/* Availability Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability Status <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={editForm.isAvailable}
                        onChange={() => handleEditFormChange('isAvailable', true)}
                        className="w-4 h-4 text-green-600 focus:ring-2 focus:ring-green-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Available Now
                      </span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={!editForm.isAvailable}
                        onChange={() => handleEditFormChange('isAvailable', false)}
                        className="w-4 h-4 text-orange-600 focus:ring-2 focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Available From
                      </span>
                    </label>
                  </div>
                </div>
                
                {/* Availability Date (shown when not available now) */}
                {!editForm.isAvailable && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Availability Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={editForm.availabilityDate}
                      onChange={(e) => handleEditFormChange('availabilityDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditSave}
                    disabled={
                      !editForm.quantity ||
                      editForm.quantity <= 0 ||
                      (!editForm.isAvailable && !editForm.availabilityDate)
                    }
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;