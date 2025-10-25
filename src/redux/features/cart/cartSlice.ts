import { ICartItem } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

interface CartState {
  cart: ICartItem[];
}

const loadCartFromCookies = (): ICartItem[] => {
  if (typeof window === "undefined") return [];
  const cookieCart = getCookie("cartItems");
  return cookieCart ? JSON.parse(cookieCart as string) : [];
};

const initialState: CartState = {
  cart: loadCartFromCookies(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const newItem = action.payload;

      const existingItem = state.cart.find(
        (item) =>
          item.productId === newItem.productId &&
          item.size === newItem.size &&
          item.box === newItem.box
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity ?? 1;
      } else {
        state.cart.push(newItem);
      }

      setCookie("cartItems", JSON.stringify(state.cart), {
        maxAge: 60 * 60 * 24 * 7,
      });
    },

    incrementQuantity: (state, action: PayloadAction<ICartItem>) => {
      const itemToIncrement = state.cart.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.box === action.payload.box
      );

      if (itemToIncrement && itemToIncrement.quantity < 5) {
        itemToIncrement.quantity += 1;
        setCookie("cartItems", JSON.stringify(state.cart), {
          maxAge: 60 * 60 * 24 * 7,
        });
      }
    },

    decrementQuantity: (state, action: PayloadAction<ICartItem>) => {
      const itemToDecrement = state.cart.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.box === action.payload.box
      );

      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity -= 1;
        setCookie("cartItems", JSON.stringify(state.cart), {
          maxAge: 60 * 60 * 24 * 7,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<ICartItem>) => {
      state.cart = state.cart.filter(
        (item) =>
          !(
            item.productId === action.payload.productId &&
            item.size === action.payload.size &&
            item.box === action.payload.box
          )
      );

      setCookie("cartItems", JSON.stringify(state.cart), {
        maxAge: 60 * 60 * 24 * 7,
      });
    },

    clearCart: (state) => {
      state.cart = [];
      deleteCookie("cartItems");
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
