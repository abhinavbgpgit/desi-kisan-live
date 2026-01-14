import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "https://node-backend-pz3j.onrender.com/api/";
// const BASE_URL = 'http://localhost:5000/api/';

export const farmersApi = createApi({
  reducerPath: 'farmersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Farmer', 'FarmerProducts'],
  endpoints: (builder) => ({
    updateMyFarmerProfile: builder.mutation({
      query: (data) => ({
        url: '/farmers',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Farmer'],
    }),
    // Get farmer's added products
    getFarmerProducts: builder.query({
      query: (productIds) => ({
        url: '/products/farmer',
        params: productIds ? { productIds } : {},
      }),
      providesTags: ['FarmerProducts'],
    }),
    // Add/Edit farmer product
    addFarmerProduct: builder.mutation({
      query: (data) => ({
        url: '/products/farmer',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FarmerProducts'],
    }),
    // Update farmer product
    updateFarmerProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/farmer/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['FarmerProducts'],
    }),
    // Delete farmer product
    deleteFarmerProduct: builder.mutation({
      query: (id) => ({
        url: `/products/farmer/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FarmerProducts'],
    }),
  }),
});

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['ProfileProducts'],
  endpoints: (builder) => ({
    getProfileInfo: builder.query({
      query: () => 'profile/info',
    }),
    getProfileProducts: builder.query({
      query: () => 'profile/products',
      providesTags: ['ProfileProducts'],
    }),
  }),
});

export const {
  useUpdateMyFarmerProfileMutation,
  useGetFarmerProductsQuery,
  useAddFarmerProductMutation,
  useUpdateFarmerProductMutation,
  useDeleteFarmerProductMutation,
} = farmersApi;
export const { useGetProfileInfoQuery, useGetProfileProductsQuery } = profileApi;
