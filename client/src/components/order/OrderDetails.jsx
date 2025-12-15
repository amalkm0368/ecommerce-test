import React from "react"
import { RxCross1 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { updateOrderStatus } from "../../redux/reducer/orderSlice"
import Swal from "sweetalert2"

const OrderDetails = ({ onClose, open, currentOrder }) => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handelOrderCancle = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this order. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(
            updateOrderStatus({ orderId: id, status: "cancelled" })
          ).unwrap()

          Swal.fire({
            title: "Cancelled!",
            text: "Your order has been cancelled successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          })
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error?.message || "Failed to cancel order",
            icon: "error",
          })
        }
      }
    })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Order Details
            </h1>
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                currentOrder?.status
              )}`}
            >
              {currentOrder?.status?.toUpperCase()}
            </span>
          </div>
          <RxCross1
            size={28}
            className="cursor-pointer hover:text-red-400 transition"
            onClick={onClose}
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Products List */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Products
            </h2>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {currentOrder?.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-5 p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={item.product?.image}
                    alt={item.product?.title}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-lg">
                      {item.product?.title}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {item.product?.description}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900 text-lg">
                    ₹{(item.product?.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 p-5 rounded-xl border">
            <h2 className="font-semibold text-gray-800 mb-3 text-lg">
              Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {currentOrder?.shippingAddress?.name}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {currentOrder?.phone}
              </p>
              <p className="sm:col-span-2">
                <span className="font-medium">Address:</span>{" "}
                {currentOrder?.shippingAddress?.street},{" "}
                {currentOrder?.shippingAddress?.city},{" "}
                {currentOrder?.shippingAddress?.state} -{" "}
                {currentOrder?.shippingAddress?.zip}
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center text-xl font-semibold border-t pt-4">
            <span>Total Amount:</span>
            <span className="text-green-600">
              ₹{currentOrder?.totalAmount?.toLocaleString()}
            </span>
          </div>

          {/* Cancel Button */}
          {user.role === "customer" && currentOrder?.status !== "cancelled" && (
            <div className="flex justify-center">
              <button
                onClick={() => handelOrderCancle(currentOrder._id)}
                className="w-[250px] h-[40px] border border-red-500 text-red-500 rounded-md mt-8 cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
              >
                Cancel Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
