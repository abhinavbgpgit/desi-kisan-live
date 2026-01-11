import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base URL for API
const BASE_URL = "https://node-backend-pz3j.onrender.com/api/";
// const BASE_URL = "http://localhost:5000/api/";

// Create API slice for media uploads
export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from localStorage or Redux state if needed
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // Note: Don't set Content-Type header for multipart form data as it will be set automatically
      return headers;
    },
  }),
  tagTypes: ["Media"],
  endpoints: (builder) => ({
    // POST endpoint to upload media to Cloudinary
    uploadMedia: builder.mutation({
      query: ({ file, entityType, entityId }) => {
        // Create form data for multipart upload
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "media/upload",
          method: "POST",
          body: formData,
          // Important: Don't set Content-Type header for multipart form data
          headers: {
            // Authorization header will be added by baseQuery prepareHeaders
          },
        };
      },
      transformResponse: (response) => {
        // Return the uploaded media details
        return response;
      },
      transformErrorResponse: (response) => {
        // Log error for debugging
        console.error("Error uploading media:", response);

        // Provide user-friendly error message based on status code
        let errorMessage = "Failed to upload media";
        switch (response.status) {
          case 400:
            errorMessage = "Invalid file or request data";
            break;
          case 401:
            errorMessage = "Unauthorized access. Please log in.";
            break;
          case 403:
            errorMessage = "Access forbidden. You do not have permission to upload media.";
            break;
          case 413:
            errorMessage = "File too large. Please choose a smaller file.";
            break;
          case 500:
            errorMessage = "Server error occurred. Please try again later.";
            break;
          default:
            errorMessage = response.data?.message || response.error || errorMessage;
        }

        return {
          status: response.status,
          message: errorMessage,
        };
      },
      invalidatesTags: ["Media"],
    }),
  }),
});

// Export hooks for usage in components
export const { useUploadMediaMutation } = mediaApi;
