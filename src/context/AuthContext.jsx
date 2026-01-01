import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../store/api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // RTK Query hooks
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();

  // Login function using RTK Query
  const login = async (mobileNumber, password) => {
    try {
      const result = await loginMutation({
        mobileNumber,
        password,
      }).unwrap();

      // Store token and user data
      if (result.token) {
        localStorage.setItem('token', result.token);
        setToken(result.token);
      }
      
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
        setUser(result.user);
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  // Register function using RTK Query
  const register = async (mobileNumber, password) => {
    try {
      const result = await registerMutation({
        mobileNumber,
        password,
      }).unwrap();

      // Store token and user data
      if (result.token) {
        localStorage.setItem('token', result.token);
        setToken(result.token);
      }
      
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
        setUser(result.user);
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/landingPage', { replace: true });
  };

  // Check authentication on mount
  const checkAuth = async () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      }
    }
    setLoading(false);
  };

  // Legacy functions for backward compatibility (if needed)
  const sendOTP = async (phone) => {
    console.warn('sendOTP is deprecated. Use register or login instead.');
    return { success: false, error: 'OTP authentication is no longer supported' };
  };

  const completeProfile = async (profileData) => {
    try {
      // Update user data in localStorage
      const updatedUser = { ...user, ...profileData, profileCompleted: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Complete profile error:', error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      token,
      login,
      register,
      logout,
      sendOTP,
      completeProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);