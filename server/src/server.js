import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDb } from "./config/db.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

//routes

import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import orderRoutes from "./routes/order.route.js"
import categoryRoutes from "./routes/category.route.js"
import cartRoutes from "./routes/cart.route.js"
import wishlistRoutes from "./routes/wishlist.route.js"

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/orders", orderRoutes)
console.log(process.env.PORT)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDb()
})
