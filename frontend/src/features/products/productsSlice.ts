import type { Product } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createProduct, fetchOneProduct, fetchProducts } from './productsThunk.ts';

interface State {
  items: Product[];
  product: Product | null;
  itemsFetching: boolean;
  productFetching: boolean;
  createLoading: boolean;
}

const initialState: State = {
  items: [],
  product: null,
  itemsFetching: false,
  productFetching: false,
  createLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload: products }) => {
        state.itemsFetching = false;
        state.items = products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(fetchOneProduct.pending, (state) => {
        state.productFetching = true;
      })
      .addCase(fetchOneProduct.fulfilled, (state, { payload: product }) => {
        state.productFetching = false;
        state.product = product;
      })
      .addCase(fetchOneProduct.rejected, (state) => {
        state.productFetching = false;
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.createLoading = false;
      });
  },
  selectors: {
    selectProducts: (state) => state.items,
    selectProductsFetching: (state) => state.itemsFetching,
    selectOneProduct: (state) => state.product,
    selectOneProductFetching: (state) => state.productFetching,
    selectCreateLoading: (state) => state.createLoading,
  },
});

export const productsReducer = productsSlice.reducer;
export const {
  selectProducts,
  selectOneProductFetching,
  selectProductsFetching,
  selectOneProduct,
  selectCreateLoading,
} = productsSlice.selectors;
