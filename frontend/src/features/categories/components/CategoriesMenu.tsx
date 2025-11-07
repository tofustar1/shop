import { List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import type { Category } from '../../../types';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  categories: Category[];
  categoryId?: string;
}

const CategoriesMenu: FC<Props> = ({ categories, categoryId }) => {
  return (
    <Stack>
      <Typography variant={'h6'}>Categories</Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={`/`} selected={!categoryId}>
            <ListItemText primary={'All products'} />
          </ListItemButton>
        </ListItem>
        {categories.map((category) => (
          <ListItem disablePadding key={category._id}>
            <ListItemButton
              component={Link}
              to={`/categories/${category._id}`}
              selected={categoryId === category._id}
            >
              <ListItemText primary={category.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default CategoriesMenu;
