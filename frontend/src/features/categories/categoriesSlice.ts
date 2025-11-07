import type { Category } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './categoriesThunk.ts';

interface CategoriesState {
  items: Category[];
  fetching: boolean;
}

const initialState: CategoriesState = {
  items: [],
  fetching: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: categories }) => {
        state.fetching = false;
        state.items = categories;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.fetching = false;
      });
  },
  selectors: {
    selectCategories: (state) => state.items,
    selectFetchingCategories: (state) => state.fetching,
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const { selectCategories, selectFetchingCategories } = categoriesSlice.selectors;
