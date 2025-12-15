import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiAxios from "../../utils/axiosConfig"

// 1️⃣ Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await apiAxios.post("/cart", { productId, quantity })
      return res.data.cart
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

// 2️⃣ Get Cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const res = await apiAxios.get("/cart")
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

// 3️⃣ Update Cart Item Quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await apiAxios.put(`/cart/${productId}`, { quantity })
      console.log(res.data)
      return res.data.cart
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

// 4️⃣ Remove Item from Cart
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, thunkAPI) => {
    try {
      const res = await apiAxios.delete(`/cart/${productId}`)
      return res.data.cart
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },    
  reducers: {
    clearCart: (state) => {
      state.items = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "Add to cart failed"
      })

      .addCase(fetchCart.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "Fetching cart failed"
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to update item"
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to remove item"
      })
  },
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer
