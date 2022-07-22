import { configureStore } from '@reduxjs/toolkit'
import { authSilce } from './auth/authSlice'
import { categoriesSlice } from './categories/categoriesSlices';
import { productSlice } from './products/ProductsSlice';

export const store = configureStore({
    reducer: {
        auth: authSilce.reducer,
        products: productSlice.reducer,
        categories: categoriesSlice.reducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch