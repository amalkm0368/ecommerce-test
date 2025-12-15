import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId, quantity } = req.body

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required." })
    }

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not available." })
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available." })
    }

    let cart = await Cart.findOne({ user: userId })
    const itemPrice = product.discount_price || product.price
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [
          {
            product: productId,
            quantity,
            totalAmount: itemPrice * quantity,
          },
        ],
      })
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      )

      if (existingItem) {
        existingItem.quantity += quantity
        existingItem.totalAmount = itemPrice * existingItem.quantity
      } else {
        cart.items.push({
          product: productId,
          quantity,
          totalAmount: itemPrice * quantity,
        })
      }
    }

    await cart.save()
    res.status(200).json({ message: "Product added to cart", cart })
  } catch (error) {
    console.error("Add to cart error:", error)
    res.status(500).json({ message: "Something went wrong." })
  }
}

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "title image description",
    })

    if (!cart) {
      return res
        .status(404)
        .json({ message: "This user has no items in the cart." })
    }

    return res.json(cart)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." })
  }
}

export const updateCartItem = async (req, res) => {
  try {
    const productId = req.params.productId
    const { quantity } = req.body
    console.log(productId, quantity)
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity is required." })
    }
    const cart = await Cart.findOne({ user: req.user.id })
    console.log(cart)
    if (!cart) return res.status(404).json({ message: "Cart not found" })
    const item = cart.items.find(
      (item) => item.product.toString() === productId
    )
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" })

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    const itemPrice = product.discount_price || product.price

    item.quantity = quantity
    item.totalAmount = quantity * itemPrice
    await cart.save()
    const updatedCart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
      "title description image "
    )
    res.status(200).json({ cart: updatedCart })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
export const removeCartItem = async (req, res) => {
  try {
    const productId = req.params.productId

    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }
    const updatedItems = cart.items.filter(
      (item) => item.product.toString() !== productId
    )
    if (updatedItems.length === cart.items.length) {
      return res.status(404).json({ message: "Product not found in cart" })
    }
    cart.items = updatedItems
    await cart.save()

    res.status(200).json({ message: "Item removed from cart", cart })
  } catch (err) {
    console.error("Error removing cart item:", err)
    res.status(500).json({ message: "Server error" })
  }
}
