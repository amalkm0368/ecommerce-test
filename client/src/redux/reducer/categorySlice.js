import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiAxios from "../../utils/axiosConfig"

// Get all categories
export const fetchCategories = createAsyncThunk(
  "category/fetchAll",
  async (_, thunkAPI) => {
    try {
        const res = await apiAxios.get("/category")
        
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.msg || "Failed to fetch categories"
      )
    }
  }
)

// Create category
export const createCategory = createAsyncThunk(
  "category/create",
  async (formData, thunkAPI) => {
    try {
      const res = await apiAxios.post("/category", formData)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.msg || "Failed to create category"
      )
    }
  }
)

// Update category
export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await apiAxios.put(`/category/${id}`, formData)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.msg || "Failed to update category"
      )
    }
  }
)

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, thunkAPI) => {
    try {
      await apiAxios.delete(`/category/${id}`)
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.msg || "Failed to delete category"
      )
    }
  }
)

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.unshift(action.payload)
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c._id === action.payload._id
        )
        if (index !== -1) state.categories[index] = action.payload
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c._id !== action.payload
        )
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export default categorySlice.reducer
