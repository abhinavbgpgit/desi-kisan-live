import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const RequestConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { requestId, items, deliveryDay, totalAmount } = location.state || {};

  if (!requestId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <img src="/error.png" alt="Error" className="w-32 h-32 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Invalid Request</h2>
          <p className="text-gray-600 mb-4">No request information found.</p>
          <Link
            to="/dashboard"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 m-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-green-800 mb-2">Request Submitted!</h1>
          <p className="text-gray-600 mb-6">Your weekly request has been received</p>

          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-green-800 mb-1">Request ID</p>
            <p className="font-bold text-green-700 text-lg">{requestId}</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Day</span>
              <span className="font-medium">{deliveryDay}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Items</span>
              <span className="font-medium">{items.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 mb-6">
            <p className="text-sm text-blue-800 font-medium">Next Steps</p>
            <p className="text-sm text-gray-600 mt-1">
              Our team will review your request and confirm availability. You'll receive a notification once your request is approved.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard/requests')}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              View Your Request
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-white text-green-600 py-3 rounded-lg font-semibold border border-green-200 hover:bg-green-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestConfirmation;