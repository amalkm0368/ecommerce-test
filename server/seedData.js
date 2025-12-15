import mongoose from "mongoose"
import dotenv from "dotenv"
import Category from "./src/models/category.model.js"
import Product from "./src/models/product.model.js"

dotenv.config() // Load .env file

const productData = [
  {
    title: "MacBook pro M2 chipset 256gb ssd 8gb ram",
    description: "High-performance Apple MacBook Pro with M2 chip...",
    category: "Computers and Laptops",
    image_Url: [
      {
        url: "https://m.media-amazon.com/images/I/41At6UlfYJL._SY445_SX342_QL70_FMwebp_.jpg",
      },
    ],
    price: 1099,
    discount_price: 1049,
    total_sell: 35,
    stock: 10,
  },
  {
    title: "Iphone 14 Pro Max 256 GB",
    description: "Latest Apple iPhone 14 Pro Max...",
    category: "Mobile and Tablets",
    image_Url: [
      {
        url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
      },
    ],
    price: 1199,
    discount_price: 1099,
    total_sell: 80,
    stock: 10,
  },
  {
    title: "Gaming Headphone Asus",
    description: "Premium quality gaming headphone with deep bass...",
    category: "Music and Gaming",
    image_Url: [
      {
        url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
      },
    ],
    price: 300,
    discount_price: 239,
    total_sell: 20,
    stock: 10,
  },
  {
    title: "Men’s Watch 2023 Model",
    description: "Elegant and fashionable watch for men...",
    category: "Others",
    image_Url: [
      {
        url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png",
      },
    ],
    price: 100,
    discount_price: 79,
    total_sell: 62,
    stock: 10,
  },
  {
    title: "Gents Shoes",
    description: "Trendy shoes for men in all sizes...",
    category: "Shoes",
    image_Url: [
      {
        url: "https://mirzacdns3.s3.ap-south-1.amazonaws.com/cache/catalog/RLV0015/2-800x800.jpg",
      },
    ],
    price: 120,
    discount_price: 89,
    total_sell: 49,
    stock: 10,
  },
]

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    const categories = await Category.find({})

    const formattedProducts = productData.map((product) => {
      const matchingCategory = categories.find(
        (cat) => cat.title === product.category
      )

      return {
        title: product.title,
        description: product.description,
        category: matchingCategory ? matchingCategory._id.toString() : "",
        image: product.image_Url?.[0]?.url || "",
        price: product.price || product.discount_price,
        discount_price: product.discount_price,
        total_sell: product.total_sell,
        stock: product.stock,
        tags: [product.category || "Uncategorized"],
      }
    })

    // Optional: clear existing products
    // await Product.deleteMany()
    // console.log(formattedProducts)
    const created = await Product.insertMany(formattedProducts)

    console.log("✅ Products seeded:", created.length)
    process.exit()
  } catch (error) {
    console.error("❌ Seeding failed:", error.message)
    process.exit(1)
  }
}

seedProducts()
