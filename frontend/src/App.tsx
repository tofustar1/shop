import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import Products from './features/products/Products.tsx';
import NewProduct from './features/products/NewProduct.tsx';
import Register from './features/users/Register.tsx';
import OneProduct from './features/products/OneProduct.tsx';
import Login from './features/users/Login.tsx';
import { selectUser } from './features/users/usersSlice.ts';
import { useAppSelector } from './app/hooks.ts';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute.tsx';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/categories/:categoryId" element={<Products />} />
          <Route path="/products/:id" element={<OneProduct />} />
          <Route
            path="/products/new"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Typography>Nor found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
