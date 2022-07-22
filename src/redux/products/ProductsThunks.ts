import { AppDispatch } from '../store';
import { authApi } from '../../api/authApi';
import { ProductsInterface, Producto, CategoryResponse } from '../../interfaces/ProductsInterface';
import { setNewProduct, setProducts, startDeleteing, startLoadingData, startSaving, stopDeleteing, stopLoadingData, stopSaving } from './ProductsSlice';



export const LoadProducts = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(startLoadingData());
        try {
            const resp = await authApi.get<ProductsInterface>('/productos?limite=100');
            dispatch(setProducts(resp.data.productos));
            dispatch(stopLoadingData());
        } catch (error) {
            console.log(error);
            dispatch(stopLoadingData());
        }
    }
}


export const SaveProduct = (nombre: string, categoria: string, precio: number) => {

    return async (dispatch: AppDispatch) => {
        dispatch(startSaving());
        try {
            const resp = await authApi.post<Producto>('/productos', { nombre, categoria, precio }, {
                headers: {
                    'x-token': localStorage.getItem('token')!
                }
            });
            dispatch(setNewProduct(resp.data));
            dispatch(stopSaving());
        } catch (error) {
            console.log(error);
            dispatch(stopSaving());
        }
    }


}


export const deleteProduct = (id: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startDeleteing());
        try {
            await authApi.delete(`/productos/${id}`, {
                headers: {
                    'x-token': localStorage.getItem('token')!
                }
            });
            dispatch(stopDeleteing());
        } catch (error) {
            console.log(error);
            dispatch(stopDeleteing());
        }
    }
}
