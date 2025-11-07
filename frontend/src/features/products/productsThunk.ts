import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import type { Product, ProductMutation } from '../../types';

export const fetchProducts = createAsyncThunk<Product[], string | undefined>(
  'products/fetchAll',
  async (categoryId) => {
    const { data: products } = await axiosApi.get<Product[]>('/products', {
      params: { category: categoryId },
    });
    return products;
  },
);

export const fetchOneProduct = createAsyncThunk<Product, string>(
  'products/fetchOne',
  async (id) => {
    const { data: product } = await axiosApi.get<Product>('/products/' + id);
    return product;
  },
);

export const createProduct = createAsyncThunk<void, ProductMutation>(
  'products/create',
  async (product) => {
    const formData = new FormData();

    const keys = Object.keys(product) as (keyof ProductMutation)[];
    keys.forEach((key) => {
      const value = product[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/products', formData);
  },
);
