import type { ProductMutation } from '../../../types';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { Stack, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectCategories, selectFetchingCategories } from '../../categories/categoriesSlice.ts';
import { fetchCategories } from '../../categories/categoriesThunk.ts';

interface Props {
  onSubmit: (product: ProductMutation) => void;
  loading: boolean;
}

const ProductForm = ({ onSubmit, loading }: Props) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectFetchingCategories);

  const [state, setState] = useState<ProductMutation>({
    category: '',
    title: '',
    description: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({ ...prevState, [name]: files[0] }));
    }
  };

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(state);
  };

  return (
    <Stack spacing={2} component="form" onSubmit={submitFormHandler}>
      <TextField
        select
        id="category"
        label="Category"
        name="category"
        value={state.category}
        onChange={inputChangeHandler}
        required
      >
        <MenuItem value="" disabled>
          Please select a category
        </MenuItem>
        {categoriesLoading && (
          <div style={{ marginLeft: '15px' }}>
            <CircularProgress />
          </div>
        )}
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.title}
          </MenuItem>
        ))}
      </TextField>
      <TextField id="title" label="Title" name="title" value={state.title} onChange={inputChangeHandler} required />
      <TextField
        required={true}
        multiline
        minRows={3}
        id="description"
        label="Description"
        name="description"
        value={state.description}
        onChange={inputChangeHandler}
      />
      <TextField
        type="number"
        id="price"
        label="Price"
        name="price"
        value={state.price}
        onChange={inputChangeHandler}
        required
      />
      <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
      <Button type="submit" color="primary" variant="contained" loading={loading}>
        Create
      </Button>
    </Stack>
  );
};

export default ProductForm;
