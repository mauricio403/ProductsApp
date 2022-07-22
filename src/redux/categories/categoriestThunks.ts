import { AppDispatch } from '../store';
import { authApi } from '../../api/authApi';
import { CategoryResponse } from '../../interfaces/ProductsInterface';
import { setCategories, startLoadingCategories, stopLoadingCategories } from './categoriesSlices';


export const loadCategories = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(startLoadingCategories());
        try {
            const resp = await authApi.get<CategoryResponse>('/categorias');
            dispatch(setCategories(resp.data.categorias));
            dispatch(stopLoadingCategories());
        } catch (error) {
            console.log(error);
            dispatch(stopLoadingCategories());
        }
    }
}