import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiAxios from "../../utils/axiosConfig"
import toast from "react-hot-toast"

const token = localStorage.getItem("token")

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const res = await apiAxios.post("/auth/login", data)
      // Save token immediately for authenticated requests
      localStorage.setItem("token", res.data.token)
      return res.data.token
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.msg || "Login failed")
    }
  }
)

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkAPI) => {
    try {
      const res = await apiAxios.post("/auth/register", data)
      return res.data.msg || "Registration successful"
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.msg || "Registration failed"
      )
    }
  }
)

// Get Logged-in User
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = await apiAxios.get("/auth/user")
    return res.data
  } catch (err) {
    await thunkAPI.dispatch(logout())
    toast.success("logout")

    return thunkAPI.rejectWithValue(
      err.response?.data?.msg || "Session expired"
    )
  }
})

export const updateShippingAddress = createAsyncThunk(
  "auth/updateShipping",
  async (formData, { rejectWithValue }) => {
    try {
      debugger
      const res = await apiAxios.put(`/auth/user/address`, formData)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Update failed")
    }
  }
)

// 📌 Update Profile Image
export const updateProfileImage = createAsyncThunk(
  "auth/updateProfileImage",
  async (fileData, { rejectWithValue }) => {
    try {
      debugger
      const res = await apiAxios.patch(`/auth/user/profile-image`, fileData)
      return res.data.user
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Image update failed")
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: token || null,
    loading: false,
    error: null,
    isAuthenticated: !!token,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.token = payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
        state.isAuthenticated = true
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
        state.user = null
        state.token = null
        state.isAuthenticated = false
        localStorage.removeItem("token")
      })
      // edit address
      .addCase(updateShippingAddress.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateShippingAddress.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
      })
      .addCase(updateShippingAddress.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      // update profile
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProfileImage.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
      })
      .addCase(updateProfileImage.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
