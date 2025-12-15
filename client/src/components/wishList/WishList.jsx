import React, { useEffect, useState } from "react"
import { RxCross1 } from "react-icons/rx"
import { IoBagHandleOutline } from "react-icons/io5"
import { BsCartPlus } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllWishList,
  removeFromWishlist,
} from "../../redux/reducer/wishListSlice"
import { addToCart } from "../../redux/reducer/cartSlice"
import toast from "react-hot-toast"

const WishList = ({ setOpenWishlist }) => {
  const { wishproducts } = useSelector((state) => state.wishlist)

  const dispatch = useDispatch()
  console.log(wishproducts)
  useEffect(() => {
    dispatch(getAllWishList())
  }, [dispatch])
  const cartData = [
    {
      name: "Mac Air 256gb SSD and 8Gb RAM",
      description: "A sleek and lightweight laptop for professionals.",
      price: 70000,
    },
    {
      name: "iPad Pro 128GB",
      description: "Portable power for creatives and students.",
      price: 24000,
    },
    {
      name: "AirPods Pro",
      description: "Noise-canceling earbuds with superior sound.",
      price: 11000,
    },
  ]

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/40 z-50 flex justify-end">
      <div className="w-[90%] sm:w-[400px] h-full bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-lime-600 flex items-center gap-2">
            <IoBagHandleOutline size={22} />
            Wishlist ({wishproducts.length})
          </h2>
          <RxCross1
            size={25}
            className="cursor-pointer text-lime-500 hover:text-red-500"
            onClick={() => setOpenWishlist(false)}
          />
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto divide-y">
          {wishproducts.map((item, index) => (
            <WishSingle key={index} data={item} />
          ))}
        </div>

        {/* Footer (optional total or action) */}
        <div className="p-4 border-t text-center text-sm text-gray-500">
          You can move these items to your cart anytime.
        </div>
      </div>
    </div>
  )
}

const WishSingle = ({ data }) => {
  const [value, setValue] = useState(1)
  const totalPrice = data.discount_price * value

  const dispatch = useDispatch()

  const handleCart = async () => {
    try {
      await dispatch(
        addToCart({ productId: data?._id, quantity: value })
      ).unwrap()
      toast.success("add cart successful")
    } catch (error) {
      toast.error("error to add cart")
    }
  }
  const handleRemoveWishlist = async () => {
    await dispatch(removeFromWishlist(data._id)).unwrap()
    toast.success("Removed from wishlist")
  }
  return (
    <div className="flex items-center gap-4 p-4">
      <RxCross1
        className="cursor-pointer text-lime-400 hover:text-red-500"
        onClick={handleRemoveWishlist}
      />
      <img
        src={data.image}
        alt={data.title}
        className="w-14 h-14 object-cover rounded"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-black font-medium text-sm">{data.title}</h3>
        <p className="text-xs text-gray-500">{data.description}</p>
        <div className="flex space-x-3">
          <span className="text-gray-500 font-semibold text-sm mt-1 line-through">
            ₹{data.price}
          </span>
          <span className="text-red-600 font-semibold text-sm mt-1">
            ₹{totalPrice}
          </span>
        </div>
      </div>
      <BsCartPlus
        size={22}
        className="cursor-pointer text-gray-600 hover:text-green-600"
        title="Add to Cart"
        onClick={handleCart}
      />
    </div>
  )
}

export default WishList
