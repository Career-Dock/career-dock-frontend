import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TProductState = {
  products: [] ;
};

const initialState: TProductState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const products = action.payload;
      state.products = products;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
export const useProducts = (state: RootState) => state.products;