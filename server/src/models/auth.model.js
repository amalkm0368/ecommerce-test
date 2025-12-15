import mongoose from "mongoose"

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip: { type: String, required: false },
  },
  { _id: false }
)

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    profileImage: { type: String, default: "" },
    address: addressSchema,
  },

  { timestamps: true }
)

const User = mongoose.model("User", userSchema)
export default User
