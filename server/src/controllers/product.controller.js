import Product from "../models/product.model.js"

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      stock,
      tags,
      discount_price,
      shop_name,
      total_sell,
    } = req.body
    const file = req.file
    if (!file) return res.status(400).json({ msg: "Image file is required" })

    const product = await Product.create({
      title,
      description,
      category,
      price,
      stock,
      tags,
      discount_price,
      shop_name,
      total_sell,
      image: file?.path,
    })
    res.status(201).json(product)
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to create product", error: err.message })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const { search, category, min, max, page = 1, limit = 10 } = req.query
    console.log(req.query)
    const filter = {}

    if (search) filter.title = { $regex: search, $options: "i" }
    if (category && mongoose.Types.ObjectId.isValid(category)) {
      filter.category = category
    }
    if (min || max) {
      filter.price = {}
      if (min) filter.price.$gte = Number(min)
      if (max) filter.price.$lte = Number(max)
    }

    const total = await Product.countDocuments(filter)
    const products = await Product.find(filter)
      .populate("category", "title ")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    res.json({ total, products })
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error retrieving products", error: err.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ msg: "Product not found" })
    res.json(product)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ msg: "enter credential" })
    }
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ msg: "Product not found" })
    let imageUrl = product.image
    if (req.file) {
      imageUrl = req.file.path
    }
    console.log(req.body, imageUrl)
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: imageUrl,
      },
      { new: true }
    )
    res.json(updatedProduct)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ msg: "Product not found" })
    res.json({ msg: "Product deleted" })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body

    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: "Product not found" })

    if (product.stock <= 0) {
      return res.status(400).json({ message: "Out of stock" })
    }

    product.stock -= 1
    product.total_sell += 1

    await product.save()

    res.status(200).json({ message: "Product added to cart", product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
