import React, { FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { SaveProduct } from '../redux/products/ProductsThunks';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import { useMemo } from 'react';


interface Props {
  openCreateModal: boolean;
  handleCloseCreateModal: () => void;
}


export const CreateProductModal: FC<Props> = ({ openCreateModal, handleCloseCreateModal }) => {

  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.categories);
  const { isSaving } = useSelector((state: RootState) => state.products);

  const isSavingProduct = useMemo(() => isSaving === true, [isSaving]);

  const loginForm = useFormik({
    initialValues: {
      nombre: '',
      precio: 0,
      categoria: ''
    },
    onSubmit: values => {
      dispatch(SaveProduct(nombre, categoria, precio) as any);
      loginForm.resetForm();
      handleCloseCreateModal();
    }
  });

  const { categoria, nombre, precio } = loginForm.values;




  return (
    <div>
      <Dialog open={openCreateModal} onClose={handleCloseCreateModal}>
        <DialogTitle>Nuevo Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Información del producto
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Nombre del Producto"
            type="text"
            fullWidth
            variant="standard"
            value={loginForm.values.nombre}
            name="nombre"
            onChange={loginForm.handleChange}
          />
          <TextField
            margin="dense"
            id="pricing"
            label="Precio del Producto"
            type="number"
            fullWidth
            variant="standard"
            value={loginForm.values.precio}
            name="precio"
            onChange={loginForm.handleChange}
          />
          <InputLabel id="demo-simple-select-label">Categorías</InputLabel>
          <Select
            name="categoria"
            value={loginForm.values.categoria}
            onChange={loginForm.handleChange}
            fullWidth
            variant="standard"
            label="Categoria"
          >
            {
              categories.map(category => (
                <MenuItem key={category._id} value={category._id}>{category.nombre}</MenuItem>
              ))
            }

          </Select>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={() => loginForm.handleSubmit()}
            loading={isSavingProduct}
          >
            Crear</LoadingButton>
          <Button onClick={handleCloseCreateModal}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
