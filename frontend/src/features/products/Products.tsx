import { Alert, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectProducts, selectProductsFetching } from './productsSlice.ts';
import { type ReactNode, useEffect } from 'react';
import { fetchProducts } from './productsThunk.ts';
import ProductItem from './components/ProductItem.tsx';
import CategoriesMenu from '../categories/components/CategoriesMenu.tsx';
import { fetchCategories } from '../categories/categoriesThunk.ts';
import { selectCategories } from '../categories/categoriesSlice.ts';
import { selectUser } from '../users/usersSlice.ts';

const Products = () => {
  const { categoryId } = useParams();

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const user = useAppSelector(selectUser);
  const productsFetching = useAppSelector(selectProductsFetching);

  useEffect(() => {
    dispatch(fetchProducts(categoryId));
    dispatch(fetchCategories());
  }, [dispatch, categoryId]);

  let content: ReactNode = (
    <Alert severity="info" sx={{ width: '100%' }}>
      There are no products here!
    </Alert>
  );

  if (productsFetching) {
    content = <CircularProgress />;
  } else if (products.length > 0) {
    content = products.map((product) => (
      <ProductItem
        id={product._id}
        key={product._id}
        title={product.title}
        price={product.price}
        image={product.image}
        categoryTitle={product.category.title}
      />
    ));
  }

  return (
    <Grid container spacing={2}>
      <Grid sx={{ width: 200 }}>
        <CategoriesMenu categories={categories} categoryId={categoryId} />
      </Grid>
      <Grid container direction="column" spacing={2} sx={{ flexGrow: 1 }}>
        <Grid container justifyContent="space-between">
          <Grid>
            <Typography variant="h4">Products</Typography>
          </Grid>
          {user && user.role === 'admin' && (
            <Grid>
              <Button color="primary" component={Link} to="/products/new">
                Add product
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid container direction="row" spacing={1}>
          {content}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Products;
