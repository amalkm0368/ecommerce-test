import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiAxios from "../../utils/axiosConfig"

export const addToWishlist = createAsyncThunk(
  "wishList/add",
  async (productId, { rejecteWithValue }) => {
    try {
      
      const res = await apiAxios.post("/wishlist", { productId })
      console.log(res)
      return res.data
    } catch (error) {
      return rejecteWithValue(error.response.data)
    }
  }
)

export const getAllWishList = createAsyncThunk(
  "wishList/get",
  async (_, { rejecteWithValue }) => {
    try {
        const res = await apiAxios.get("/wishlist")
        console.log(res.data)
      return res.data
    } catch (error) {
      return rejecteWithValue(error.response.data)
    }
  }
)

export const removeFromWishlist = createAsyncThunk(
  "wishList/remove",
  async (productId, { rejecteWithValue }) => {
    try {
      const res = await apiAxios.delete(`/wishlist/${productId}`)
      return res.data.wishlist
    } catch (error) {
      return rejecteWithValue(error.response.data)
    }
  }
)

const initialState = {
  wishproducts: [],
  loading: false,
  error: null,
}

const wishlistSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    clearWhistlist: (state) => {
      state.wishproducts = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false
        state.wishproducts = action.payload.products
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "Add to cart failed"
      })
      .addCase(getAllWishList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllWishList.fulfilled, (state, action) => {
        state.loading = false
        state.wishproducts = action.payload.products
      })
      .addCase(getAllWishList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "Add to cart failed"
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false
        state.wishproducts = action.payload.products
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "Add to cart failed"
      })
  },
})

export const { clearWhistlist } = wishlistSlice.actions

export default wishlistSlice.reducer
