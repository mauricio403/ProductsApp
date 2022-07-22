import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { NewProductBody, Producto, Categoria } from '../../interfaces/ProductsInterface';

export interface productState {
    isSaving: boolean
    messageSaved: string
    categories: Categoria[]
    isLoading: boolean

}

const initialState: productState = {
    isSaving: false,
    messageSaved: "",
    categories: [],
    isLoading: false
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        startLoadingCategories: (state) => {
            state.isLoading = true
        },
        stopLoadingCategories: (state) => {
            state.isLoading = false
        },
        setCategories: (state, action: PayloadAction<Categoria[]>) => {
            state.categories = action.payload
        },
      
    },
})

// Action creators are generated for each case reducer function
export const { setCategories, startLoadingCategories, stopLoadingCategories } = categoriesSlice.actions
