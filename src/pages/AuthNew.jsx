import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLoginMutation, useRegisterMutation } from '../store/api/authApi';
import desiLogoInverted from '../assets/desi_logo_inverted.png';
import foodsImage from '../assets/foods.png';

const AuthNew = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  // RTK Query hooks
  const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();

  // Handle errors from RTK Query
  useEffect(() => {
    if (loginError) {
      setError(loginError?.data?.message || 'Login failed. Please try again.');
    }
    if (registerError) {
      setError(registerError?.data?.message || 'Registration failed. Please try again.');
    }
  }, [loginError, registerError]);

  const validateMobileNumber = (number) => {
    return /^[6-9]\d{9}$/.test(number);
  };

  const validatePassword = (pass) => {
    return pass.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validateMobileNumber(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number starting with 6-9');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (isLogin) {
        // Login
        const result = await login({
          mobileNumber,
          password,
        }).unwrap();

        console.log('Login successful:', result);
        
        // Store user data
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        
        // Navigate to app
        navigate('/app');
      } else {
        // Register
        const result = await register({
          mobileNumber,
          password,
        }).unwrap();

        console.log('Registration successful:', result);
        
        // Store user data
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        
        // Navigate to app or show success message
        navigate('/app');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err?.data?.message || `${isLogin ? 'Login' : 'Registration'} failed. Please try again.`);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  const isLoading = isLoginLoading || isRegisterLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Visual content */}
          <div className="lg:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 p-8 lg:p-12 flex flex-col justify-center items-center text-white">
            <img src={desiLogoInverted} alt="Desi Basket Logo" className="w-72 h-20 mb-4" />
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center">Welcome to Desi Basket</h1>
            <p className="text-center text-green-100 mb-8 max-w-sm">
              Experience the freshest produce directly from local farmers to your doorstep.
            </p>

            {/* Foods Image */}
            <div className="relative w-72 h-64 rounded-2xl overflow-hidden">
              <img
                src={foodsImage}
                alt="Sab Hatke Foods"
                className="w-72 h-full"
              />
            </div>
          </div>

          {/* Right side - Form content */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {isLogin ? 'Login to Your Account' : 'Create New Account'}
              </h2>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Mobile Number */}
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <span className="inline-flex items-center px-3 bg-gray-50 text-gray-500 text-sm h-12 border-r border-gray-300">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="mobile"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter mobile number"
                      className="flex-1 h-12 border-none focus:ring-green-500 focus:border-green-500 focus:outline-none px-3"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Confirm Password (only for registration) */}
                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                    isLoading
                      ? 'bg-green-300 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" />
                      </svg>
                      {isLogin ? 'Logging in...' : 'Registering...'}
                    </span>
                  ) : (
                    isLogin ? 'Login' : 'Register'
                  )}
                </motion.button>
              </form>

              {/* Toggle between Login and Register */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={toggleMode}
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    {isLogin ? 'Register here' : 'Login here'}
                  </button>
                </p>
              </div>

              {/* Info Note */}
              {!isLogin && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <span className="font-semibold">Note:</span> You will be registered as a FARMER by default.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthNew;