import express from "express"
import upload from "../middlewares/uploads.js"
import {
  getUser,
  login,
  register,
  updateProfileImage,
  updateUser,
  
} from "../controllers/auth.controller.js"
import { protect } from "../middlewares/auth.js"

const router = express.Router()

router.post("/register", upload.single("profileImage"), register)
router.post("/login", login)
router.get("/user", protect, getUser)
router.put("/user/address", protect, updateUser)
router.patch(
  "/user/profile-image",
  protect,
  upload.single("profileImage"),
  updateProfileImage
)

export default router
