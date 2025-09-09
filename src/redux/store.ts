import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '@/redux/features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cardReducer,
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
