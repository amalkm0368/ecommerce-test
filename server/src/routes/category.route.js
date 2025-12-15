import express from "express"
import { isAdmin, protect } from "../middlewares/auth.js"
import upload from "../middlewares/uploads.js"
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/category.controller.js"

const router = express.Router()

router.get("/", getAllCategory)

// Admin routes
router.post("/", protect, isAdmin, upload.single("image"), createCategory)
router.put("/:id", protect, isAdmin, upload.single("image"), updateCategory)
router.delete("/:id", protect, isAdmin, deleteCategory)

export default router
