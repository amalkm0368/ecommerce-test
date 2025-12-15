import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { IoIosArrowDown } from "react-icons/io"
import DropDown from "./DropDown"
import { useEffect, useState } from "react"
import { navItems } from "../../static/data"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../../redux/reducer/categorySlice"
import NavBar from "./NavBar"
import Cart from "../cart/Cart"
import WishList from "../wishList/WishList"
import { fetchCart } from "../../redux/reducer/cartSlice"
import { getAllWishList } from "../../redux/reducer/wishListSlice"

const Header = ({ active }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  // console.log(user)
  const { categories } = useSelector((state) => state.category)
  const { items } = useSelector((state) => state.cart)
  const { wishproducts } = useSelector((state) => state.wishlist)
  console.log(items)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllWishList())
  }, [dispatch])

  const [dropDown, setDropDown] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [openWishlist, setOpenWishlist] = useState(false)
  const navigate = useNavigate()
  return (
    <header
      className="bg-[#c8cc00] 
     shadow-md x"
    >
      <div className=" mx-2  py-3 hidden md:flex justify-between items-center ">
        {/* Left - Categories Dropdown */}
        <div
          onClick={() => setDropDown(!dropDown)}
          className={`relative flex items-center justify-between w-[200px] px-4 py-2 bg-white rounded-md shadow-md cursor-pointer
        transition duration-200 hover:shadow-lg group ${
          dropDown ? "rounded-b-none" : ""
        }`}
        >
          <div className="flex items-center space-x-2">
            <FaBars className="text-gray-700 group-hover:text-black transition" />
            <span className="font-medium text-sm text-gray-800 group-hover:text-black">
              All Categories
            </span>
          </div>

          <IoIosArrowDown
            className={`text-gray-700 transition-transform duration-200 ${
              dropDown ? "rotate-180" : ""
            }`}
          />

          {/* Dropdown content */}
          {dropDown && (
            <div
              className="absolute top-full left-0 w-full z-30 h-[500px] hover:overflow-y-auto
            hover:w-[206px] overflow-hidden  scrollbar-hide "
            >
              <DropDown setDropDown={setDropDown} categories={categories} />
            </div>
          )}
        </div>

        {/* Center - Nav Links */}
        <NavBar active={active} />

        {/* Right - Icons */}
        <div className="flex space-x-5 items-center text-white text-xl relative">
          {isAuthenticated && user?.role === "customer" && (
            <>
              {/* Wishlist */}
              <div className="relative" onClick={() => setOpenWishlist(true)}>
                <FaHeart />
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishproducts?.length > 0 ? wishproducts?.length : 0}
                </span>
              </div>

              {/* Cart */}
              <div className="relative" onClick={() => setOpenCart(true)}>
                <FaShoppingCart />
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {items?.length > 0 ? items.length : 0}
                </span>
              </div>
            </>
          )}

          {/* Profile */}
          {isAuthenticated ? (
            <Link to="/profile">
              <img
                src={`${user?.profileImage}`}
                alt="Profile"
                className="w-[38px] h-[40px] rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link to="/login">
              <CgProfile size={25} color="rgb(255 255 255 / 82%)" />
            </Link>
          )}

          {
            // cart popup
            openCart ? <Cart setOpenCart={setOpenCart} /> : null
          }

          {
            //wishlist popup
            openWishlist ? <WishList setOpenWishlist={setOpenWishlist} /> : null
          }
        </div>
      </div>
    </header>
  )
}

export default Header
