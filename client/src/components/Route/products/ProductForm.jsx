import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import Header from "../../layout/Header"
import Footer from "../../layout/Footer"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../../../redux/reducer/categorySlice"
import {
  createProduct,
  updateProduct,
} from "../../../redux/reducer/productSlice"

const ProductForm = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedData = location.state?.product
  const [imagePreview, setImagePreview] = useState(null)
  const isEditMode = Boolean(selectedData)
  console.log(selectedData)
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    shop_name: "",
    price: "",
    stock: 0,
    image: null,
    discount_price: "",
    tags: "",
  })

  const { categories } = useSelector((state) => state.category)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedData) {
      setForm({
        title: selectedData.title || "",
        description: selectedData.description || "",
        category: selectedData.category?._id || "",
        shop_name: selectedData.shop_name || "",
        price: selectedData.price || "",
        stock: selectedData.stock || 0,
        image: selectedData.image || "",
        discount_price: selectedData.discount_price || "",
        tags: selectedData.tags?.join(", ") || "", // convert array to comma string
      })
      setImagePreview(selectedData.image)
    }
  }, [selectedData])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === "file") {
      const file = files[0]
      if (file) {
        setImagePreview(URL.createObjectURL(file))
        setForm((prev) => ({
          ...prev,
          [name]: file,
        }))
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const validateForm = () => {
    const { title, category, price, stock, shop_name } = form

    if (!title || !category || !price || !shop_name) {
      toast.error("Please fill in all required fields.")
      return false
    }

    if (!isEditMode && !form.image) {
      toast.error("Please upload a product image.")
      return false
    }

    if (price <= 0 || stock < 0) {
      toast.error("Price and stock must be valid positive numbers.")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)

    try {
      const payload = new FormData()
      for (const key in form) {
        if (key === "tags") {
          form.tags
            .split(",")
            .map((tag) => tag.trim())
            .forEach((tag) => payload.append("tags", tag))
        } else if (key === "image") {
          if (form.image instanceof File) {
            payload.append("image", form.image)
          }
        } else {
          payload.append(key, form[key])
        }
      }

      if (isEditMode) {
        debugger
        await dispatch(
          updateProduct({ id: selectedData?._id, formData: payload })
        ).unwrap()

        toast.success("Product updated successfully")
      } else {
        await dispatch(createProduct(payload)).unwrap()
        toast.success("Product created successfully")
      }

      navigate("/products")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#9f9708]">
          {isEditMode ? "Edit Product" : "Create Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title + Category */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="w-full p-2 border border-[#9f9708] rounded focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 font-medium">Category</label>
              <select
                name="category"
                className="w-full p-2 border border-[#9f9708] rounded focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-2 border border-[#9f9708] rounded min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Shop Name + Stock */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block mb-1 font-medium">Shop Name</label>
              <input
                type="text"
                name="shop_name"
                placeholder="Shop Name"
                className="w-full p-2 border border-[#9f9708] rounded focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                value={form.shop_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                className="w-full p-2 border border-[#9f9708] rounded focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                value={form.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Price + Discount Price */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="w-full p-2 border border-[#9f9708] rounded focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 font-medium">Discount Price</label>
              <input
                type="number"
                name="discount_price"
                placeholder="Discount Price"
                className="w-full p-2 border border-[#9f9708] rounded focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                value={form.discount_price}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Image + Tags */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block mb-1 font-medium">Product Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full p-2 border border-[#9f9708] rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#9f9708] file:text-white hover:file:bg-[#8c8c06]"
                onChange={handleChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-32 w-32 object-cover rounded border"
                />
              )}
            </div>
            <div className="w-full">
              <label className="block mb-1 font-medium">Tags</label>
              <input
                type="text"
                name="tags"
                placeholder="e.g. electronics, sale, trending"
                className="w-full p-2 border border-[#9f9708] rounded focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                value={form.tags}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full  border border-[#8c8c06] py-2 px-4 rounded hover:bg-[#8c8c06] disabled:opacity-70"
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update Product"
              : "Create Product"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default ProductForm
