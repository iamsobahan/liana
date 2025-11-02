import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GlobalState = {
    isOpenSearchModal: boolean;
    isOpenCategory: boolean;
};

const initialState: GlobalState = {
    isOpenSearchModal: false,
    isOpenCategory: false,
};

export const globalStateSlice = createSlice({
    name: "globalState",
    initialState,
    reducers: {
        setIsOpenSearchModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenSearchModal = action.payload;
        },
        setIsOpenCategory: (state, action: PayloadAction<boolean>) => {
            state.isOpenCategory = action.payload;
        },
    },
});

export const { setIsOpenSearchModal, setIsOpenCategory } = globalStateSlice.actions;

export default globalStateSlice.reducer;
