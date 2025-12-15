import React, { useState } from "react"

import { RxCross1 } from "react-icons/rx"
import { Link } from "react-router-dom"
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai"
import { addToCart } from "../../../redux/reducer/cartSlice"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
const ProductDetailsCard = ({ data, setOpen }) => {
  const [count, setCount] = useState(1)
  const [click, setClick] = useState(false)
  const dispatch = useDispatch()
  const handleMessageSubmit = () => {}

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }
  const incrementCount = () => {
    setCount(count + 1)
  }
  console.log(data)
  const handleCart = async () => {
    await dispatch(
      addToCart({ productId: data?._id, quantity: count })
    ).unwrap()
    toast.success("add cart successful")
  }
  return (
    <div className="bg-white ">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] md:w-[60%] h-[90vh] bg-white overflow-y-scroll 800px:h-[75vh] rounded-md shadow-sm relative p-4 ">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50 "
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full md:w-[50%]">
                <img
                  src={`${data?.image}`}
                  alt=""
                  height="400px"
                  width="400px"
                />
                <div className="flex">
                  <Link
                    to={`/shop/preview/${data?.shop_name}`}
                    className="flex"
                  >
                    {/* <img
                      src={`${data.shop.shop_avatar.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    /> */}
                    <div>
                      <h3 className={`pt-3 text-[15px] text-blue-400 pb-3`}>
                        {data?.shop_name}
                      </h3>
                      {/* <h5 className="pb-3 text-[15px]">
                        {data.shop.ratings} Ratings
                      </h5> */}
                    </div>
                  </Link>
                </div>

                <div
                  className={`w-[150px] h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer bg-[#000] mt-4  `}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    send Message
                    <AiOutlineMessage className="ml-1" />
                  </span>
                </div>

                <h5 className="text-[16px] text-[red] mt-5">
                  {data?.total_sell} Sold Out
                </h5>
              </div>
              <div className="w-full md:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1
                  className={`text-[25px] font-[600] font-Roboto text-[#333] `}
                >
                  {" "}
                  {data?.title}
                </h1>

                <p>{data?.description}</p>
                <div className="flex pt-3">
                  <h4
                    className={`font-bold text-[18px] text-[#333] font-Roboto`}
                  >
                    {data?.discount_price} $
                  </h4>
                  <h3
                    className={`font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through`}
                  >
                    {data?.price ? data?.price + "$" : "no price"}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>

                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>

                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        color={click ? "red" : "#333"}
                        title="Remove From wishlist"
                        onClick={() => setClick(!click)}
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        title="Add to wishlist"
                        onClick={() => setClick(!click)}
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer mt-6 rountded-[4px]  `}
                  onClick={handleCart}
                >
                  <span className="text-white flex items-center">
                    {" "}
                    Add to Cart
                    <AiOutlineShoppingCart
                      className="ml-1
                  "
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ProductDetailsCard
