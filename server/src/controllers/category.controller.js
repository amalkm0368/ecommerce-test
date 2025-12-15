import Category from "../models/category.model.js"

export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find({}).sort({ createdAt: -1 })
    res.status(201).json(category)
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error retrieving category", error: err.message })
  }
}
export const createCategory = async (req, res) => {
  try {
    const { title, subTitle } = req.body
    const file = req.file
    if (!title || !subTitle) {
      return res
        .status(400)
        .json({ msg: "Title, subTitle and image are required" })
    }
    const newCategory = new Category({
      title,
      subTitle,
      image_Url: file.path,
    })
    await newCategory.save()
    res.status(201).json(newCategory)
  } catch (err) {
    res.status(500).json({ msg: "Error creating category", error: err.message })
  }
}
export const updateCategory = async (req, res) => {
  try {
    const file = req.file
    const category = await Category.findById(req.params.id)
    if (!category) return res.status(404).json({ msg: "Category not found" })
    let image_Url = category.image_Url
    if (file) {
      image_Url = file.path
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image_Url,
      },
      { new: true }
    )
    res.status(200).json(updatedCategory)
  } catch (err) {
    res.status(500).json({ msg: "Error updating category", error: err.message })
  }
}
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) return res.status(404).json({ msg: "Category not found" })
    res.json({ msg: "Category deleted successfully" })
  } catch (err) {
    res.status(500).json({ msg: "Error deleting category", error: err.message })
  }
}
