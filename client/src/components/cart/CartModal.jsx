import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import Swal from "sweetalert2"
import { placeOrder } from "../../redux/reducer/orderSlice"

const CartModal = ({ open, onClose, items, onOrderOpen }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { loadings } = useSelector((state) => state.orders)
  console.log(items)
  const [step, setStep] = useState(1)
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  })

  useEffect(() => {
    if (step === 2 && user) {
      setShippingAddress((pre) => ({
        ...pre,

        name: pre.name || user?.name || "",
        phone: pre.phone || user?.phone || "",
        street: pre.street || user?.address?.street || "",
        city: pre.city || "",
        state: pre.state || user?.address?.state || "",
        zip: pre.zip || user?.address?.zip || "",
      }))
    }
  }, [step, user])

  const totalAmount = items.reduce((sum, item) => sum + item.totalAmount, 0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress,
        totalAmount,
      }
      console.log(orderData)
      await dispatch(placeOrder(orderData)).unwrap()

      Swal.fire({
        title: "Order payment and order Place successfully!",
        text: `Total Amount: $${totalAmount}`,
        icon: "success",
        draggable: true,
        confirmButtonText: "OK",
        timer: 3000,
      })
      setShippingAddress({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
      })
      setStep(1)
      onClose()
      onOrderOpen()
    } catch (error) {
      Swal.fire({
        title: "Failed to place order",
        text: error?.message || "Something went wrong",
        icon: "error",
        confirmButtonText: "Try Again",
      })
      setShippingAddress({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
      })
      setStep(1)
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative text-gray-800">
        {/* Step Indicators */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-3">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div
                  onClick={() => setStep(num)}
                  className={`w-9 h-9 flex items-center justify-center rounded-full border-2 cursor-pointer transition-all
                    ${
                      step === num
                        ? "bg-[#c8cc00] border-[#c8cc00] text-black font-bold"
                        : step > num
                        ? "bg-[#c8cc00] border-[#c8cc00] text-black"
                        : "bg-gray-200 border-gray-300 text-gray-500"
                    }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`flex-1 h-[2px] ${
                      step > num ? "bg-[#c8cc00]" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <h2 className="text-xl font-bold text-center mt-3">
            {step === 1 && "🛒 Review Cart"}
            {step === 2 && "📍 Shipping Address"}
            {step === 3 && "✅ Confirm Order"}
          </h2>
        </div>

        {/* Step 1: Review Cart */}
        {step === 1 && (
          <div className="space-y-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg shadow-sm"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">
                  ₹{item.totalAmount.toLocaleString()}
                </p>
              </div>
            ))}
            <div className="border-t pt-3 font-semibold flex justify-between text-lg">
              <span>Total:</span>
              <span className="text-[#c8cc00]">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Step 2: Shipping Address */}
        {step === 2 && (
          <div className="space-y-4">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={shippingAddress.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:border-[#c8cc00] focus:ring-2 focus:ring-[#c8cc00] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:border-[#c8cc00] focus:ring-2 focus:ring-[#c8cc00] outline-none"
                />
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={shippingAddress.street}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:border-[#c8cc00] focus:ring-2 focus:ring-[#c8cc00] outline-none"
              />
            </div>

            {/* City, State, Zip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:border-[#c8cc00] focus:ring-2 focus:ring-[#c8cc00] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:border-[#c8cc00] focus:ring-2 focus:ring-[#c8cc00] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  value={shippingAddress.zip}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:border-[#c8cc00] focus:ring-2 focus:ring-[#c8cc00] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm Order */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-xl shadow-md bg-white">
              {/* Cart Items */}
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Product Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {item.product.description}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Info */}
              <div className="mt-4 space-y-2 text-gray-700">
                <p>
                  <span className="font-medium text-gray-900">Name:</span>{" "}
                  {shippingAddress.name}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Phone:</span>{" "}
                  {shippingAddress.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Address:</span>{" "}
                  {shippingAddress.street}, {shippingAddress.city},{" "}
                  {shippingAddress.state} - {shippingAddress.zip}
                </p>
              </div>

              {/* Total */}
              <div className="mt-4 border-t pt-3 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total:
                </span>
                <span className="text-xl font-bold text-[#c8cc00]">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-400 transition-all"
          >
            {step > 1 ? "Back" : "Cancel"}
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 bg-[#c8cc00] rounded-lg hover:brightness-110 transition-all font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              className="px-5 py-2 bg-[#c8cc00] text-black rounded-lg hover:brightness-110 transition-all font-semibold"
              disabled={loadings}
            >
              {loadings ? "Placing..." : "Place Order"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartModal
