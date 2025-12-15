import React, { useState, useEffect } from "react"
import { RxCross1 } from "react-icons/rx"
import { IoBagHandleOutline } from "react-icons/io5"
import { HiOutlineMinus, HiPlus } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart, updateCartItem } from "../../redux/reducer/cartSlice"
import toast from "react-hot-toast"
import CartModal from "./CartModal"
import OrderDetails from "../order/OrderDetails"

const Cart = ({ setOpenCart }) => {
  const { items } = useSelector((state) => state.cart)
  const { currentOrder } = useSelector((state) => state.orders)
  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState(false)
  const [orderOpenModal, setOrderOpenModal] = useState(false)
  const [selectedCart, setSelectedCart] = useState([])

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  const totalItems = items.reduce((sum, item) => sum + item?.quantity, 0)

  const handlePlaceOrder = () => {
    console.log("object")
  }

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-screen bg-[#00000088] z-50 flex justify-end">
        <div className="w-full sm:w-[400px] bg-white h-full shadow-2xl flex flex-col relative">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div className="flex items-center space-x-2 text-[#8d8f07]">
              <IoBagHandleOutline size={26} />
              <h2 className="text-lg font-semibold">
                Cart ({totalItems} Items)
              </h2>
            </div>
            <RxCross1
              size={24}
              className="text-[#6d6e05] cursor-pointer hover:text-red-500"
              onClick={() => setOpenCart(false)}
            />
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items?.map((item, index) => (
              <CartSingle
                key={index}
                data={item}
                setOpenModal={setOpenModal}
                setSelectedCart={setSelectedCart}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="p-5 border-t">
            <button
              className="w-full py-3 bg-[#c8cc00] text-black font-semibold rounded-md hover:opacity-90 transition"
              onClick={() => {
                setSelectedCart(items)
                setOpenModal(true)
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <CartModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        items={selectedCart}
        onOrderOpen={() => setOrderOpenModal(true)}
        currentOrder={currentOrder}
      />

      <OrderDetails
        open={orderOpenModal}
        onClose={() => setOrderOpenModal(false)}
        currentOrder={currentOrder}
      />
    </div>
  )
}

const CartSingle = ({ data, setOpenModal, setSelectedCart }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(data.quantity)

  const handleIncrease = async () => {
    try {
      const newQty = quantity + 1

      await dispatch(
        updateCartItem({ productId: data.product._id, quantity: newQty })
      ).unwrap()

      toast.success("Increase Quentity")
      setQuantity(newQty)
    } catch (error) {
      toast.error("error to Add quentity")
    }
  }

  const handleDecrease = async () => {
    if (quantity <= 1) return
    const newQty = quantity - 1

    try {
      await dispatch(
        updateCartItem({ productId: data.product._id, quantity: newQty })
      )
      toast.success("Decrease Quentity")
      setQuantity(newQty)
    } catch (error) {
      toast.error("error to Decrease quentity")
    }
  }

  return (
    <div
      className=" flex items-center justify-between px-5 py-4 border-b "
      title="place order"
      onClick={() => {
        setOpenModal(true)
        setSelectedCart([data])
      }}
    >
      {/* Image */}

      <img
        src={data.product.image}
        alt={data.product.title}
        className="w-[60px] h-[60px] object-cover rounded-md"
      />

      {/* Details */}
      <div className="flex-1 px-4">
        <h3 className="font-medium text-sm text-black">{data.product.title}</h3>
        <p className="text-xs text-gray-500">{data.product.description}</p>
        <p className="text-[#515204] font-semibold text-[16px] mt-1">
          ₹{data.totalAmount.toLocaleString()}
        </p>
      </div>

      {/* Quantity Control */}
      <div className="flex flex-col items-center gap-2">
        <button
          className="w-6 h-6 rounded-full bg-[#afb204] flex items-center justify-center"
          title="Add quantity"
          onClick={handleIncrease}
        >
          <HiPlus size={16} />
        </button>
        <span className="text-sm text-black font-medium">{quantity}</span>
        <button
          className="w-6 h-6 rounded-full bg-[#ddd] flex items-center justify-center"
          title="Decrease quantity"
          onClick={handleDecrease}
        >
          <HiOutlineMinus size={16} />
        </button>
      </div>
    </div>
  )
}

export default Cart
