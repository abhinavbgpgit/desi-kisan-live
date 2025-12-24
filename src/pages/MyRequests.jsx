import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService as api } from '../services/api';
import requestsData from '../data/requests.json';

const MyRequests = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [requests, setRequests] = useState({
    active: null,
    past: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        // Load data from requests.json
        // In a real app, you would call: api.getRequestHistory()
        setRequests(requestsData);
      } catch (error) {
        console.error('Failed to load requests:', error);
        setError('Failed to load requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const RequestCard = ({ request }) => {
    const getStatusColor = () => {
      switch (request.status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'approved': return 'bg-blue-100 text-blue-800';
        case 'delivered': return 'bg-green-100 text-green-800';
        case 'cancelled': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-800">Request #{request.id}</h3>
            <p className="text-sm text-gray-600">Created: {new Date(request.createdAt).toLocaleDateString()}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        </div>

        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-1">Delivery: {request.deliveryDate} ({request.deliveryDay})</p>
          <p className="text-sm font-semibold text-gray-800">₹{request.totalAmount.toFixed(2)}</p>
        </div>

        <div className="flex space-x-2 mb-3">
          {request.items.slice(0, 3).map((item) => (
            <img
              key={item.id}
              src={item.image || '/placeholder-product.jpg'}
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover"
              onError={(e) => {
                e.target.src = '/placeholder-product.jpg';
              }}
            />
          ))}
          {request.items.length > 3 && (
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs">
              +{request.items.length - 3}
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Link
            to={`/dashboard/requests/${request.id}`}
            className="text-green-600 text-sm hover:text-green-700"
          >
            View Details
          </Link>
          {request.status === 'pending' && (
            <button className="text-red-500 text-sm hover:text-red-600">
              Cancel Request
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4">
          <div className="flex space-x-4 border-b border-gray-200 mb-6">
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>

          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="flex space-x-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))}
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
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Requests</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-6">My Requests</h1>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-2 px-1 ${activeTab === 'active' ? 'border-b-2 border-green-600 text-green-600 font-semibold' : 'text-gray-500'}`}
          >
            Active Request
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-2 px-1 ${activeTab === 'past' ? 'border-b-2 border-green-600 text-green-600 font-semibold' : 'text-gray-500'}`}
          >
            Past Requests
          </button>
        </div>

        {/* Active Request */}
        {activeTab === 'active' && (
          <div>
            {requests.active ? (
              <RequestCard request={requests.active} />
            ) : (
              <div className="text-center py-8">
                <img src="/empty-requests.png" alt="No active requests" className="w-32 h-32 mx-auto mb-4" />
                <p className="text-gray-600">No active requests</p>
                <Link to="/dashboard" className="text-green-600 mt-2 inline-block hover:text-green-700">
                  Create a new request
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Past Requests */}
        {activeTab === 'past' && (
          <div>
            {requests.past.length > 0 ? (
              <div className="space-y-4">
                {requests.past.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <img src="/empty-requests.png" alt="No past requests" className="w-32 h-32 mx-auto mb-4" />
                <p className="text-gray-600">No past requests found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;