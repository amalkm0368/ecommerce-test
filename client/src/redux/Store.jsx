import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducer/authSlice.js"
import categoryReducer from "./reducer/categorySlice.js"
import productReducer from "./reducer/productSlice.js"
import cartReducer from "./reducer/cartSlice.js"
import wishlistReducer from "./reducer/wishListSlice.js"
import orderReducer from "./reducer/orderSlice.js"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
  },
})
