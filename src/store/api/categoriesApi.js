import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base URL for API
const BASE_URL = "https://node-backend-pz3j.onrender.com/api/";
// const BASE_URL = "http://localhost:5000/api/";



// Create API slice for categories
export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from localStorage or Redux state if needed
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    // GET endpoint to retrieve all categories
    getCategories: builder.query({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      transformResponse: (response) => {
        // Validate response structure
        if (!Array.isArray(response) && !response.categories) {
          throw new Error("Invalid response format: expected array or object with categories property");
        }

        // Return either the array directly or the categories property
        return Array.isArray(response) ? response : response.categories;
      },
      transformErrorResponse: (response) => {
        // Log error for debugging
        console.error("Error fetching categories:", response);

        // Provide user-friendly error message based on status code
        let errorMessage = response.data?.message || response.error || "Failed to fetch categories";

        return {
          status: response.status,
          message: errorMessage,
        };
      },
      providesTags: ["Categories"],
    }),
  }),
});

// Export hooks for usage in components
export const { useGetCategoriesQuery } = categoriesApi;
