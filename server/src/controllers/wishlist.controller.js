import Wishlist from "../models/wishlist.model.js"

// Add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body
    const userId = req.user.id

    let wishlist = await Wishlist.findOne({ user: userId })

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] })
    }

    if (!wishlist?.products?.includes(productId)) {
      wishlist.products.push(productId)
      await wishlist.save()
    }

    res.status(200).json(wishlist)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
      "products",
      "title image description discount_price price"
    )
    res.status(200).json(wishlist)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params
    const wishlist = await Wishlist.findOne({ user: req.user.id })

    wishlist.products = wishlist.products.filter(
      (item) => item.toString() !== productId
    )

    await wishlist.save()
    const updateWhishlist = await Wishlist.findOne({
      user: req.user.id,
    }).populate("products", "title image description discount_price price")

    res.status(200).json({ msg: "remove wishList", wishlist: updateWhishlist })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
}
