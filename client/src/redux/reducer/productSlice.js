// src/redux/slices/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import apiAxios from "../../utils/axiosConfig"

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      console.log(formData)
      const res = await apiAxios.post("/products", formData)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (queryString = "", thunkAPI) => {
    try {
      // debugger
      const res = await apiAxios.get(`/products?${queryString}`)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await apiAxios.get(`/products/${id}`)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await apiAxios.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      await apiAxios.delete(`/products/${id}`)
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const addToCart = createAsyncThunk(
  "products/addToCart",
  async (productId, thunkAPI) => {
    try {
      const res = await apiAxios.post("/products/add-to-cart", { productId })
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

const initialState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
  selectedProduct: null,
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products.unshift(action.payload)
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.msg || action.error.message
      })

      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.total = action.payload.total
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.msg || action.error.message
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.msg || action.error.message
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        )
        if (index !== -1) {
          state.products[index] = action.payload
        }
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload)
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        const updated = action.payload.product
        const index = state.products.findIndex((p) => p._id === updated._id)
        if (index !== -1) {
          state.products[index] = updated
        }
      })
  },
})

export const { clearSelectedProduct } = productSlice.actions
export default productSlice.reducer
