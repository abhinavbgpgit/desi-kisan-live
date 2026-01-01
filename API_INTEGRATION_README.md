# API Integration Documentation

## Overview
This project now uses **Redux Toolkit Query (RTK Query)** for API integration with the backend server.

## Base Configuration

### Base URL
```
https://desi-basket-server.onrender.com/
```

### Endpoints
- **Registration**: `POST /api/register`
- **Login**: `POST /api/login`

## Implementation Details

### 1. Redux Store Setup
- **Location**: [`src/store/store.js`](src/store/store.js)
- Configured with Redux Toolkit's [`configureStore()`](src/store/store.js:6)
- Includes [`authApi`](src/store/api/authApi.js) reducer and middleware

### 2. Auth API Slice
- **Location**: [`src/store/api/authApi.js`](src/store/api/authApi.js)
- Created using RTK Query's [`createApi()`](src/store/api/authApi.js:6)
- Provides hooks for authentication operations

### 3. Available Hooks

#### Registration
```javascript
import { useRegisterMutation } from '../store/api/authApi';

const [register, { isLoading, error }] = useRegisterMutation();

// Usage
const result = await register({
  mobileNumber: "9876543210",
  password: "StrongPassword@123"
}).unwrap();
```

**Payload Structure:**
```json
{
  "mobileNumber": "9876543210",
  "password": "StrongPassword@123",
  "userType": "FARMER"
}
```
Note: `userType` is automatically set to "FARMER" by default.

#### Login
```javascript
import { useLoginMutation } from '../store/api/authApi';

const [login, { isLoading, error }] = useLoginMutation();

// Usage
const result = await login({
  mobileNumber: "9876543210",
  password: "StrongPassword@123"
}).unwrap();
```

**Payload Structure:**
```json
{
  "mobileNumber": "9876543210",
  "password": "StrongPassword@123"
}
```

### 4. Authentication Flow

#### New Auth Page
- **Location**: [`src/pages/AuthNew.jsx`](src/pages/AuthNew.jsx)
- Features:
  - Toggle between Login and Registration
  - Mobile number validation (10 digits, starts with 6-9)
  - Password validation (minimum 6 characters)
  - Confirm password for registration
  - Loading states
  - Error handling
  - Automatic token storage

#### Updated Auth Context
- **Location**: [`src/context/AuthContext.jsx`](src/context/AuthContext.jsx)
- Integrated with RTK Query mutations
- Provides backward compatibility with existing code
- Functions:
  - [`login(mobileNumber, password)`](src/context/AuthContext.jsx:18)
  - [`register(mobileNumber, password)`](src/context/AuthContext.jsx:43)
  - [`logout()`](src/context/AuthContext.jsx:69)
  - [`checkAuth()`](src/context/AuthContext.jsx:78)

### 5. Token Management
- Tokens are automatically stored in [`localStorage`](src/store/api/authApi.js:18) upon successful authentication
- Token is included in all API requests via [`prepareHeaders`](src/store/api/authApi.js:11)
- Format: `Authorization: Bearer <token>`

### 6. Redux Provider Setup
- **Location**: [`src/main.jsx`](src/main.jsx)
- Redux [`Provider`](src/main.jsx:9) wraps the entire application
- Store is passed to all components

## Usage Example

### In a Component
```javascript
import { useLoginMutation, useRegisterMutation } from '../store/api/authApi';

function MyAuthComponent() {
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const handleLogin = async () => {
    try {
      const result = await login({
        mobileNumber: "9876543210",
        password: "password123"
      }).unwrap();
      
      console.log('Login successful:', result);
      // Navigate or update UI
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const result = await register({
        mobileNumber: "9876543210",
        password: "password123"
      }).unwrap();
      
      console.log('Registration successful:', result);
      // Navigate or update UI
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={isLoginLoading}>
        {isLoginLoading ? 'Logging in...' : 'Login'}
      </button>
      <button onClick={handleRegister} disabled={isRegisterLoading}>
        {isRegisterLoading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
}
```

## Key Features

### 1. Automatic Caching
RTK Query automatically caches API responses and manages cache invalidation.

### 2. Loading States
Each mutation provides [`isLoading`](src/pages/AuthNew.jsx:17) state for UI feedback.

### 3. Error Handling
Errors are automatically captured and available via the [`error`](src/pages/AuthNew.jsx:17) property.

### 4. Type Safety
TypeScript-ready (if you add TypeScript support later).

### 5. DevTools Integration
Redux DevTools can be used to inspect API calls and state changes.

## Testing

### Access the Auth Page
Navigate to: `http://localhost:5173/auth`

### Test Credentials
- Use any valid 10-digit mobile number starting with 6-9
- Password must be at least 6 characters

### Routes
- **New Auth Page**: `/auth`
- **Old Auth Page** (for reference): `/auth-old`

## Migration Notes

### Changes from Previous Implementation
1. **No OTP**: OTP authentication has been removed
2. **Direct Login/Register**: Users can now directly login or register with mobile number and password
3. **FARMER User Type**: All registrations default to FARMER user type
4. **RTK Query**: Replaced axios-based API calls with RTK Query

### Backward Compatibility
The [`AuthContext`](src/context/AuthContext.jsx) maintains the same interface, so existing components using [`useAuth()`](src/context/AuthContext.jsx:135) will continue to work.

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure the backend server allows requests from your frontend origin
   - Check browser console for specific CORS error messages

2. **Token Not Persisting**
   - Check browser's localStorage
   - Verify token is being returned from the API

3. **API Errors**
   - Check network tab in browser DevTools
   - Verify request payload matches expected format
   - Check backend server logs

### Debug Mode
Enable Redux DevTools extension in your browser to inspect:
- API call lifecycle
- Request/response data
- State changes
- Cache status

## Future Enhancements

Potential additions:
1. Add user profile endpoint
2. Implement token refresh mechanism
3. Add password reset functionality
4. Implement social login
5. Add biometric authentication

## Dependencies

```json
{
  "@reduxjs/toolkit": "^2.x.x",
  "react-redux": "^9.x.x"
}
```

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify API endpoint is accessible
3. Check Redux DevTools for state/API issues
4. Review this documentation

---

**Last Updated**: January 1, 2026
**Version**: 1.0.0