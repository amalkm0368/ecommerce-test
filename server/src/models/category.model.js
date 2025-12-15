import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: String,
    image_Url: String,
  },
  { timestamps: true }
)

const Category = mongoose.model("Category", categorySchema)
export default Category
