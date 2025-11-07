import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import imageNotFound from '../../../assets/images/no_image.jpg';
import { API_URL } from '../../../constants.ts';

interface Props {
  id: string;
  categoryTitle: string;
  title: string;
  price: number;
  image: string | null;
}

const ProductItem: FC<Props> = ({ id, title, price, image, categoryTitle }) => {
  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%', // 16:9
  });

  let cardImage = imageNotFound;

  if (image) {
    cardImage = API_URL + '/' + image;
  }

  return (
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
      <Card>
        <CardHeader title={title} />
        <ImageCardMedia image={cardImage} />
        <CardContent>
          <p>
            <strong>Category:</strong> {categoryTitle}
          </p>
          <strong>Price: {price} KGS</strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={'/products/' + id}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
