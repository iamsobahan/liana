import { ICartItem } from '@/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

interface CartState {
  cart: ICartItem[];
}

// Helper: read cart from cookies
const loadCartFromCookies = (): ICartItem[] => {
  if (typeof window === 'undefined') return []; // SSR safe
  const cookieCart = getCookie('cartItems');
  return cookieCart ? JSON.parse(cookieCart as string) : [];
};

const initialState: CartState = {
  cart: loadCartFromCookies(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add to cart
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item) => item.productId === newItem.productId
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity ?? 1;
      } else {
        state.cart.push(newItem);
      }

      setCookie('cartItems', JSON.stringify(state.cart), { maxAge: 60 * 60 * 24 * 7 }); // 7 days
    },

    // Increment quantity
    incrementQuantity: (state, action: PayloadAction<ICartItem>) => {
      const itemToIncrement = state.cart.find(
        (item) => item.productId === action.payload.productId
      );

      if (itemToIncrement && itemToIncrement.quantity < 5) {
        itemToIncrement.quantity += 1;
        setCookie('cartItems', JSON.stringify(state.cart), { maxAge: 60 * 60 * 24 * 7 });
      }
    },

    // Decrement quantity
    decrementQuantity: (state, action: PayloadAction<ICartItem>) => {
      const itemToDecrement = state.cart.find(
        (item) => item.productId === action.payload.productId
      );

      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity -= 1;
        setCookie('cartItems', JSON.stringify(state.cart), { maxAge: 60 * 60 * 24 * 7 });
      }
    },

    // Remove item
    removeFromCart: (state, action: PayloadAction<ICartItem>) => {
      state.cart = state.cart.filter(
        (i) => i.productId !== action.payload.productId
      );
      setCookie('cartItems', JSON.stringify(state.cart), { maxAge: 60 * 60 * 24 * 7 });
    },

    // Clear cart
    clearCart: (state) => {
      state.cart = [];
      deleteCookie('cartItems');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
