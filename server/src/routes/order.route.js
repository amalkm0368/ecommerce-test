import express from "express"
import {
  getAllOrders,
  getUserOrders,
  placeOrder,
  singleOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js"
import { protect } from "../middlewares/auth.js"

const router = express.Router()

router.use(protect)

router.post("/", placeOrder)
router.get("/my-orders", getUserOrders)
router.get("/all-orders", getAllOrders)
router.get("/:orderId", singleOrder)
router.patch("/:orderId/status", updateOrderStatus)

export default router
