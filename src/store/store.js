import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth.js'
import productSlice from './slices/product.js'
import cartSlice from './slices/cart.js'

const store =  configureStore({
   reducer: {
     [authSlice.name]: authSlice.reducer,
     [productSlice.name]: productSlice.reducer,
     [cartSlice.name]: cartSlice.reducer

   },
})

export {store};