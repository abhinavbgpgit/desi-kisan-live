import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = "https://node-backend-pz3j.onrender.com/api/";
const BASE_URL = 'http://localhost:5000/api/';

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
  tagTypes: ['Farmer'],
  endpoints: (builder) => ({
    updateMyFarmerProfile: builder.mutation({
      query: (data) => ({
        url: '/farmers',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Farmer'],
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
  endpoints: (builder) => ({
    getProfileInfo: builder.query({
      query: () => 'profile/info',
    }),
  }),
});

export const { useUpdateMyFarmerProfileMutation } = farmersApi;
export const { useGetProfileInfoQuery } = profileApi;
