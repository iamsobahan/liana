import { IWishListItem } from '@/types/wishList';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface WishListState {
  wishList: IWishListItem[];
}

const initialWishList =
  typeof window !== 'undefined' ? localStorage.getItem('wishListItems') : null;
const initialState: WishListState = {
  wishList: initialWishList ? JSON.parse(initialWishList) : [],
};

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    setWishList: (state, action: PayloadAction<IWishListItem[]>) => {
      state.wishList = [...action.payload];
    },

    addToWishList: (state, action: PayloadAction<IWishListItem>) => {
      const newItem = action.payload;
      const existingItem = state.wishList.find(
        (item) => item.product_id === newItem.product_id
      );

      if (existingItem) {
        toast.warning('Item already added in your wish list!');
      } else {
        state.wishList = [...state.wishList, newItem];
        toast.success('Item added to your wish list!');
        localStorage.setItem('wishListItems', JSON.stringify(state.wishList));
      }
    },

    removeFromWishList: (state, action: PayloadAction<IWishListItem>) => {
      state.wishList = state.wishList.filter(
        (item) => item.product_id !== action.payload.product_id
      );
      localStorage.setItem('wishListItems', JSON.stringify(state.wishList));
    },

    clearWishList: (state) => {
      state.wishList = [];
      localStorage.removeItem('wishListItems');
    },
  },
});

export const {
  setWishList,
    addToWishList,
    removeFromWishList,
    clearWishList,
} = wishListSlice.actions;
export default wishListSlice.reducer;
