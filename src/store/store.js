import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './api/authApi';
import { productsApi } from './api/productsApi';
import { categoriesApi } from './api/categoriesApi';
import { mediaApi } from './api/mediaApi';
import { farmersApi, profileApi } from './api/farmerApi';

// Configure Redux store
export const store = configureStore({
  reducer: {
    // Add the authApi, productsApi, categoriesApi, and mediaApi reducers
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
    [farmersApi.reducerPath]: farmersApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware,
      mediaApi.middleware,
      farmersApi.middleware,
      profileApi.middleware
    ),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
