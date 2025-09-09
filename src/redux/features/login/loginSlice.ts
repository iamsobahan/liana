import { ILogin } from '@/types/login';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  login: ILogin | null;
}

const initialLogin =
  typeof window !== 'undefined' ? localStorage.getItem('login') : null;
const initialState: LoginState = {
  login: initialLogin ? JSON.parse(initialLogin) : {},
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    saveLoginInfo: (state, action: PayloadAction<ILogin>) => {
      state.login = action.payload;
      localStorage.setItem('login', JSON.stringify(action.payload));
    },
    clearLoginInfo: (state)=>{
      state.login = null;
      localStorage.removeItem('login');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('wishListItems');
    }
  },
});

export const {
  saveLoginInfo,
  clearLoginInfo
} = loginSlice.actions;
export default loginSlice.reducer;
