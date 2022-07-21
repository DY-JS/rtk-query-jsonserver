import { configureStore } from '@reduxjs/toolkit';
import { goodsApi } from './goodsApi';

export const store = configureStore({
  reducer: {
    [goodsApi.reducerPath]: goodsApi.reducer, //goodsApi.reducer добавл. автом. при созд. goodsApi
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(goodsApi.middleware),
});
