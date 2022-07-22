import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ProductsLayout } from '../layouts/ProductsLayout';
import { LoadProducts } from '../redux/products/ProductsThunks';
import { ProductCard } from '../components/ProductCard';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import { Tooltip, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import { CreateProductModal } from '../components/CreateProductModal';
import { loadCategories } from '../redux/categories/categoriestThunks';

export const Products = () => {


  const { user } = useSelector((state: RootState) => state.auth);
  const { products, isLoading } = useSelector((state: RootState) => state.products);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(LoadProducts() as any);
    dispatch(loadCategories() as any);
  }, [])

  const refreshProducts = () => {
    dispatch(LoadProducts() as any);
  }

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleClickOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };



  return (
    <ProductsLayout title='Produtos app' user={user}>
      <>
        <Grid container sx={{

        }}>
          <Grid item xs={12} sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',

          }}>
            <h1>Bienvend@ - {user.nombre}</h1>
          </Grid>
          <Grid item xs={12} sx={{
            display: 'flex',
            justifyContent: 'flex-end',

          }}>
            <IconButton onClick={handleClickOpenCreateModal}>
              <Tooltip title='Añadir producto'>
                <AddIcon sx={{ fontSize: 35 }} />
              </Tooltip>
            </IconButton>
            <IconButton onClick={refreshProducts}>
              <Tooltip title='Recargar productos'>
                <ReplayIcon sx={{ fontSize: 35 }} />
              </Tooltip>
            </IconButton>

          </Grid>
        </Grid>
        <CreateProductModal openCreateModal={openCreateModal} handleCloseCreateModal={handleCloseCreateModal} />

      </>

      {
        isLoading ?
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

          }}>
            <CircularProgress />
          </Box>

          :
          (
            <Grid container spacing={2}>
              {products.map(product => (
                <ProductCard product={product} key={product._id} />
              ))}

            </Grid>
          )
      }
    </ProductsLayout>

  )
}
