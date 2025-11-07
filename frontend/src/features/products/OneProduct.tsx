import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchOneProduct } from './productsThunk.ts';
import { Link, useParams } from 'react-router-dom';
import { selectOneProduct, selectOneProductFetching } from './productsSlice.ts';
import { Button, Card, CardContent, CardMedia, CircularProgress, Stack, Typography } from '@mui/material';
import imageNotFound from '../../assets/images/no_image.jpg';
import { API_URL } from '../../constants.ts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OneProduct = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProduct);
  const isFetching = useAppSelector(selectOneProductFetching);

  useEffect(() => {
    dispatch(fetchOneProduct(id));
  }, [dispatch, id]);

  let cardImage = '';

  if (product && product.image) {
    cardImage = API_URL + '/' + product.image;
  } else {
    cardImage = imageNotFound;
  }

  return (
    <Stack spacing={2} alignItems="start">
      <Button variant="text" component={Link} to={'/'} startIcon={<ArrowBackIcon />}>
        Back to products
      </Button>
      {isFetching && <CircularProgress />}
      {product && (
        <Card sx={{ maxWidth: 545 }}>
          <CardMedia sx={{ height: 140 }} image={cardImage} title={product.title} />
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Category: {product.category.title}</Typography>
              <Typography variant="h4">{product.title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {product.description}
              </Typography>
              <Typography variant="h6">Price: {product.price}</Typography>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};

export default OneProduct;
