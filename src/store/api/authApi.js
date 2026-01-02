import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base URL for API
const BASE_URL = 'https://node-backend-pz3j.onrender.com/';

// Create API slice for authentication
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from localStorage or Redux state
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Register endpoint
    register: builder.mutation({
      query: (credentials) => ({
        url: 'api/register',
        method: 'POST',
        body: {
          mobile: credentials.mobile,
          password: credentials.password,
          role: 'farmer', // Default user type as FARMER
        },
      }),
      transformResponse: (response) => {
        // Store token if provided in response
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      },
      invalidatesTags: ['User'],
    }),

    // Login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: 'api/login',
        method: 'POST',
        body: {
          mobile: credentials.mobile,
          password: credentials.password,
        },
      }),
      transformResponse: (response) => {
        // Store token if provided in response
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      },
      invalidatesTags: ['User'],
    }),

    // Get user profile (optional, if backend supports it)
    getUserProfile: builder.query({
      query: () => 'api/profile',
      providesTags: ['User'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserProfileQuery,
} = authApi;