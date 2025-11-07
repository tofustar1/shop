import { Typography } from '@mui/material';
import ProductForm from './components/ProductForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import type { ProductMutation } from '../../types';
import { createProduct } from './productsThunk.ts';
import { selectCreateLoading } from './productsSlice.ts';

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productCreating = useAppSelector(selectCreateLoading);

  const onFormSubmit = async (product: ProductMutation) => {
    await dispatch(createProduct(product)).unwrap();
    navigate('/');
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        New Product
      </Typography>
      <ProductForm onSubmit={onFormSubmit} loading={productCreating} />
    </>
  );
};

export default NewProduct;
