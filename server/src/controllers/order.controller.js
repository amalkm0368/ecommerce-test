import User from "../models/auth.model.js"
import Order from "../models/order.model.js"
import Product from "../models/product.model.js"
import mongoose from "mongoose"

export const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      !shippingAddress ||
      !totalAmount
    ) {
      return res.status(400).json({ message: "Invalid order details" })
    }

    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    for (const item of items) {
      const product = await Product.findById(item.product)
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.product}` })
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `${product.title} is out of stock` })
      }
    }

    const newOrder = await Order.create({
      user: req.user.id,
      items: items,
      shippingAddress,
      totalAmount,
      status: "pending",
    })

    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: { stock: -item.quantity, total_sell: item.quantity },
        },
        { new: true }
      )
    }

    res.status(201).json(newOrder)
  } catch (err) {
    res.status(500).json({ msg: "Failed to place order", error: err.message })
  }
}

export const getUserOrders = async (req, res) => {
  try {
    const user = req.user.id
    const orders = await Order.find({ user }).populate(
      "items.product",
      "title description image "
    )
    res.json(orders)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "items.product",
        select: "title description image",
      })
      .populate({
        path: "user",
        select: "name email",
      })

    res.json(orders)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}

export const singleOrder = async (req, res) => {
  try {
    const { orderId } = req.params
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" })
    }
    const order = await Order.findById(orderId).populate(
      "items.product",
      "title description image "
    )
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order details",
      error: error.message,
    })
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    console.log(req.params)
    const { orderId } = req.params
    const { status } = req.body
    const user = req.user

    // Validate order ID
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" })
    }

    const allowedStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ]
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed statuses: ${allowedStatuses.join(
          ", "
        )}`,
      })
    }

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    if (user.role === "customer") {
      if (status !== "cancelled") {
        return res
          .status(403)
          .json({ message: "Customers can only cancel orders" })
      }
      if (["shipped", "delivered"].includes(order.status)) {
        return res
          .status(400)
          .json({ message: "Cannot cancel shipped or delivered orders" })
      }
    }

    order.status = status
    await order.save()

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    })
  }
}
