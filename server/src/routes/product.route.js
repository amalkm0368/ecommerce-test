import express from "express"
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js"
import { isAdmin, protect } from "../middlewares/auth.js"
import upload from "../middlewares/uploads.js"

const router = express.Router()

router.get("/", getAllProducts)
router.get("/:id", getProductById)
 
// Admin routes
router.post("/", protect, isAdmin, upload.single("image"), createProduct)
router.put("/:id", protect, isAdmin, upload.single("image"), updateProduct)
router.delete("/:id", protect, isAdmin, deleteProduct)

export default router
