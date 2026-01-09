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
  const login = async (mobile, password) => {
    try {
      const result = await loginMutation({
        mobile,
        password,
      }).unwrap();

      console.log('Login API Response:', result);

      // Handle the actual API response structure
      const token = result.token;
      const role = result.role || 'farmer';

      // Store token
      if (token) {
        localStorage.setItem('token', token);
        setToken(token);
        console.log('Token stored:', token);
      } else {
        console.error('No token in response');
        return {
          success: false,
          error: 'No token received from server'
        };
      }
      
      // Create user object from response data
      const userToStore = {
        mobile: mobile,
        role: role,
        isAuthenticated: true
      };
      
      localStorage.setItem('user', JSON.stringify(userToStore));
      setUser(userToStore);
      console.log('User stored:', userToStore);

      // Navigate to dashboard after successful login
      navigate('/dashboard', { replace: true });

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
  const register = async (mobile, password, firstName, lastName) => {
    try {
      const result = await registerMutation({
        mobile,
        password,
        first_name: firstName,
        last_name: lastName,
        role: 'farmer',
      }).unwrap();

      console.log('Register API Response:', result);

      // If registration is successful, immediately log in the user
      if (result && result.success !== false) {
        // Auto-login with the same credentials
        return await login(mobile, password);
      } else {
        return {
          success: false,
          error: result?.message || 'Registration failed. Please try again.'
        };
      }
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