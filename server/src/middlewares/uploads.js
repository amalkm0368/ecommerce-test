import multer from "multer"
import { CloudinaryStorage } from "@fluidjs/multer-cloudinary"
import cloudinary from "../config/cloudinary.js"

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
})

const upload = multer({ storage })
export default upload
