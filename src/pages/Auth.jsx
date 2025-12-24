import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import desiLogoInverted from '../assets/desi_logo_inverted.png';
import foodsImage from '../assets/foods.png';
import { auth } from '../config/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const Auth = () => {
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
    deliveryInstructions: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const { sendOTP, login, completeProfile, setUser } = useAuth();
  const navigate = useNavigate();

  // Initialize reCAPTCHA verifier
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved
          console.log('reCAPTCHA verified');
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log('reCAPTCHA expired');
        }
      });
    }
  }, []);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!phone.match(/^[6-9]\d{9}$/)) {
      setError('Please enter a valid 10-digit mobile number');
      setLoading(false);
      return;
    }

    try {
      const phoneNumber = `+91${phone}`;
      const appVerifier = window.recaptchaVerifier;
      
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setStep('otp');
      console.log('OTP sent successfully to:', phoneNumber);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError(error.message || 'Failed to send OTP. Please try again.');
      
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!confirmationResult) {
      setError('Please request OTP first');
      setLoading(false);
      return;
    }

    try {
      // Verify OTP with Firebase
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      
      console.log('OTP verified successfully. User:', user.uid);

      // Get Firebase ID token
      const idToken = await user.getIdToken();

      // Create user data
      const userData = {
        phone: phone,
        uid: user.uid,
        profileCompleted: true,
        name: '',
        email: '',
        hasAddress: false
      };

      // Store token and user data
      localStorage.setItem('token', idToken);
      localStorage.setItem('user', JSON.stringify(userData));

      // Update AuthContext state
      if (setUser) {
        setUser(userData);
      }

      // Navigate to app
      navigate('/app');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Reset reCAPTCHA
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      
      // Reinitialize reCAPTCHA
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA verified');
        }
      });

      const phoneNumber = `+91${phone}`;
      const appVerifier = window.recaptchaVerifier;
      
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      console.log('OTP resent successfully');
    } catch (error) {
      console.error('Error resending OTP:', error);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
      {/* reCAPTCHA container */}
      <div id="recaptcha-container"></div>
      
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Visual content */}
          <div className="lg:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 p-8 lg:p-12 flex flex-col justify-center items-center text-white">
           
              <img src={desiLogoInverted} alt="Desi Basket Logo" className="w-72  h-20" />
           
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center">Welcome to Desi Basket</h1>
            <p className="text-center text-green-100 mb-8 max-w-sm">
              Experience the freshest produce directly from local farmers to your doorstep.
            </p>

            {/* Sab Hatke Foods Image */}
            <div className="relative w-72  h-64 rounded-2xl overflow-hidden">
              <img
                src={foodsImage}
                alt="Sab Hatke Foods"
                className="w-72 h-full "
              />
            </div>
          </div>

          {/* Right side - Form content */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center items-center">
            {/* Test Credentials Info */}
            <div className="w-full mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">🔐 Test Credentials (Development Only)</h3>
              <div className="text-xs text-blue-700 space-y-1">
                <p><span className="font-medium">Phone:</span> 9570452922</p>
                <p><span className="font-medium">OTP:</span> 123456</p>
                <p className="text-blue-600 mt-2 italic">Note: These will be removed after billing setup</p>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm"
              >
                {error}
              </motion.div>
            )}

            {step === 'phone' && (
              <PhoneStep
                phone={phone}
                setPhone={setPhone}
                onSubmit={handlePhoneSubmit}
                loading={loading}
              />
            )}

            {step === 'otp' && (
              <OtpStep
                otp={otp}
                setOtp={setOtp}
                onSubmit={handleOtpSubmit}
                onResend={handleResendOTP}
                loading={loading}
                phone={phone}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PhoneStep = ({ phone, setPhone, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6 ">
       
        <div className="flex justify-center items-center">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full max-w-md">
            <span className="inline-flex items-center px-3 bg-gray-50 text-gray-500 text-sm h-12 border-r border-gray-300">
              +91
            </span>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your mobile number"
              className="flex-1 h-12 border-none focus:ring-green-500 focus:border-green-500 focus:outline-none px-3"
              maxLength={10}
              required
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          We'll send you a one-time password (OTP) to verify your number
        </p>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
          loading || !phone
            ? 'bg-green-300 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" />
            </svg>
            Sending OTP...
          </span>
        ) : (
          'Continue with OTP'
        )}
      </motion.button>
    </form>
  );
};

const OtpStep = ({ otp, setOtp, onSubmit, onResend, loading, phone }) => {
  const [resendTimer, setResendTimer] = React.useState(30);
  const [canResend, setCanResend] = React.useState(false);

  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleResend = async () => {
    setCanResend(false);
    setResendTimer(30);
    await onResend();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
          Enter OTP
        </label>
        <p className="text-sm text-gray-600 mb-4">
          We've sent a 6-digit code to +91 {phone}
        </p>

        <div className="flex justify-center space-x-2 mb-4">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={otp[index] || ''}
              onChange={(e) => {
                const newOtp = otp.split('');
                newOtp[index] = e.target.value;
                setOtp(newOtp.join(''));
                if (e.target.value && index < 5) {
                  document.getElementById(`otp-${index + 1}`).focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !otp[index] && index > 0) {
                  document.getElementById(`otp-${index - 1}`).focus();
                }
              }}
              id={`otp-${index}`}
              className="w-10 h-12 text-center border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-lg"
              required
            />
          ))}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend || loading}
            className="text-sm text-green-600 hover:text-green-700 disabled:text-gray-400"
          >
            {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
          </button>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading || otp.length !== 6}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
          loading || otp.length !== 6
            ? 'bg-green-300 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" />
            </svg>
            Verifying...
          </span>
        ) : (
          'Verify OTP'
        )}
      </motion.button>
    </form>
  );
};

export default Auth;