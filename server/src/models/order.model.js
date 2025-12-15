import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],
    shippingAddress: {
      phone: Number,
      name: String,
      street: String,
      state: String,
      city: String,
      zip: String,
      country: String,
    },
    totalAmount: Number,
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    },
    placedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export default mongoose.model("Order", orderSchema)
