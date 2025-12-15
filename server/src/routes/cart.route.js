import express from "express"
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cart.controller.js"
import { isCustomer, protect } from "../middlewares/auth.js"

const router = express.Router()

router.use(protect)
// router.use(isCustomer)
router.post("/", addToCart)
router.get("/", getCart)
router.put("/:productId", updateCartItem)
router.delete("/:productId", removeCartItem)

export default router
