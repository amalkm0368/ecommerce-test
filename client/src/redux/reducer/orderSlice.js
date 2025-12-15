import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiAxios from "../../utils/axiosConfig"

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      const res = await apiAxios.post("/orders", orderData)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to place order" }
      )
    }
  }
)

export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (_, thunkAPI) => {
    try {
      const res = await apiAxios.get("/orders/my-orders")
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to fetch orders" }
      )
    }
  }
)
export const getAllOrders = createAsyncThunk(
  "orders/getAllorder",
  async (_, thunkAPI) => {
    try {
      const res = await apiAxios.get("/orders/all-orders")
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to fetch orders" }
      )
    }
  }
)

export const getSingleOrder = createAsyncThunk(
  "orders/getSingleOrder",
  async (orderId, thunkAPI) => {
    try {
      const res = await apiAxios.get(`/orders/${orderId}`)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to fetch order" }
      )
    }
  }
)

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const res = await apiAxios.patch(`/orders/${orderId}/status`, { status })
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to update order" }
      )
    }
  }
)

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: null,
    loadings: false,
    error: null,
    success: false,
  },
  reducers: {
    resetOrderState: (state) => {
      state.loadings = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.loadings = true
        state.error = null
        state.success = false
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loadings = false
        state.currentOrder = action.payload
        state.success = true
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loadings = false
        state.error = action.payload?.message || "Order failed"
      })

      // Get User Orders
      .addCase(getUserOrders.pending, (state) => {
        state.loadings = true
        state.error = null
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loadings = false
        state.orders = action.payload
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loadings = false
        state.error = action.payload?.message || "Failed to fetch orders"
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loadings = true
        state.error = null
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loadings = false
        state.orders = action.payload
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loadings = false
        state.error = action.payload?.message || "Failed to fetch orders"
      })

      // Get Single Order
      .addCase(getSingleOrder.pending, (state) => {
        state.loadings = true
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loadings = false
        state.currentOrder = action.payload
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.loadings = false
        state.error = action.payload?.message || "Failed to fetch order"
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loadings = true
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loadings = false
        state.success = true
        // Update order in list if needed
        const updatedOrder = action.payload.order
        state.orders = state.orders.map((o) =>
          o._id === updatedOrder._id ? updatedOrder : o
        )
        state.currentOrder = updatedOrder
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loadings = false
        state.error = action.payload?.message || "Failed to update order"
      })
  },
})

export const { resetOrderState } = orderSlice.actions
export default orderSlice.reducer
