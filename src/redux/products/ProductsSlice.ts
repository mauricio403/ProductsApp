import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { NewProductBody, Producto } from '../../interfaces/ProductsInterface';

export interface productState {
    isSaving: boolean
    messageSaved: string
    products: Producto[]
    active: Producto
    isLoading: boolean
    isDeleting: boolean

}

const initialState: productState = {
    isSaving: false,
    messageSaved: "",
    products: [],
    active: {} as Producto,
    isLoading: false,
    isDeleting: false,
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        startLoadingData: (state) => {
            state.isLoading = true
        },
        stopLoadingData: (state) => {
            state.isLoading = false
        },
        setProducts: (state, action: PayloadAction<Producto[]>) => {
            state.products = action.payload
        },
        startSaving: (state) => {
            state.isSaving = true
        },
        stopSaving: (state) => {
            state.isSaving = false
        },
        setNewProduct: (state, action: PayloadAction<Producto>) => {
            state.products.push(action.payload)
        },
        startDeleteing: (state) => {
            state.isDeleting = true
        },
        stopDeleteing: (state) => {
            state.isDeleting = false
        }

    },
})

// Action creators are generated for each case reducer function
export const { setProducts, startLoadingData, stopLoadingData, startSaving, stopSaving, setNewProduct, startDeleteing, stopDeleteing } = productSlice.actions
