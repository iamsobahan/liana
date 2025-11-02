import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '@/redux/features/cart/cartSlice';
import { globalStateSlice } from './features/global/state';

export const store = configureStore({
  reducer: {
    cart: cardReducer,
    global: globalStateSlice.reducer,
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
