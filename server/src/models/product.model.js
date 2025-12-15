import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    shop_name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    image: String,
    discount_price: Number,
    total_sell: { type: Number, default: 0 },
    tags: [String],
    
  },
  { timestamps: true }
)



const Product = mongoose.model("Product", productSchema)
export default Product
