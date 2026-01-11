import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "https://node-backend-pz3j.onrender.com/api/";
// const BASE_URL = 'http://localhost:5000/api/';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers; // ❌ no Content-Type for GET
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
      keepUnusedDataFor: 60,
    }),
    // Endpoint to add a product to farmer's inventory
    addFarmerProduct: builder.mutation({
      query: (body) => ({
        url: 'products/farmer',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery, useAddFarmerProductMutation } = productsApi;
