import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// import AdminDashboard from "./pages/admin/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoutes"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import Home from "./pages/Home"
import { getUser, logout } from "./redux/reducer/authSlice"
import toast, { ToastBar, Toaster } from "react-hot-toast"
import ProfilePage from "./pages/ProfilePage"
import BestsellerPage from "./pages/BestsellerPage"
import ProductsPage from "./pages/ProductPage"
import ProductForm from "./components/Route/products/ProductForm"

const App = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser())
    }
  }, [dispatch, isAuthenticated])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />

        <Route path="/best-selling" element={<BestsellerPage />} />
        <Route path="/products" element={<ProductsPage />} />
        {/* Protected Route Example */}
        {/* <Route
        path="/admin"
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            role={user?.role}
            allowedRoles={["admin"]}
          >
            <AdminDashboard />
          </ProtectedRoute>
        }
      /> */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              role={user?.role}
              allowedRoles={["admin", "customer"]}
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-product"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              role={user?.role}
              allowedRoles={["customer"]}
            >
              <ProductForm />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
