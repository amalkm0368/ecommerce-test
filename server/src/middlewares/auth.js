import jwt from "jsonwebtoken"

export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ msg: "No token, access denied" })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ msg: "Token is not valid" })
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied: Admins only" })
  }
  next()
}
export const isCustomer = (req, res, next) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ msg: "Access denied: Customer only" })
  }
  next()
}
