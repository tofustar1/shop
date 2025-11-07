import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import type { Category } from '../../types';

export const fetchCategories = createAsyncThunk<Category[]>('categories/fetchAll', async () => {
  const { data: categories } = await axiosApi<Category[]>('/categories');
  return categories;
});
