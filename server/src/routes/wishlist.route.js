import express from "express"
import { protect } from "../middlewares/auth.js"
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js"

const router = express.Router()

router.use(protect)
router.post("/", addToWishlist)
router.get("/", getWishlist)
router.delete("/:productId", removeFromWishlist)
export default router
