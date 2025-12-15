import { Navigate } from "react-router-dom"

const ProtectedRoute = ({
  isAuthenticated,
  role,
  allowedRoles = [],
  children,
}) => {
  if (!isAuthenticated) return <Navigate to="/login" />

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute
