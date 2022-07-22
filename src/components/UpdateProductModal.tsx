import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useState } from 'react';
import { Producto } from '../interfaces/ProductsInterface';

interface Props {
    open: boolean;
    handleClose: () => void;
    product: Producto
}


export const UpdateProductModal:FC<Props> = ({open, handleClose, product}) =>  {


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{product.nombre}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Actualizar información del producto
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Nombre del Producto"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="pricing"
            label="Precio del Producto"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Actualizar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
