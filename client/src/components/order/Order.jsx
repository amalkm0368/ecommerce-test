import { DataGrid } from "@mui/x-data-grid"
import React from "react"
import { useEffect } from "react"
import { AiOutlineArrowRight } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  updateOrderStatus,
} from "../../redux/reducer/orderSlice"

import { useState } from "react"
import OrderDetails from "./OrderDetails"
import { MdOutlineEdit } from "react-icons/md"
import toast from "react-hot-toast"
import StatusModal from "./StatusCell"

const AllOrders = () => {
  const { orders, currentOrder } = useSelector((state) => state.orders)
  const { user } = useSelector((state) => state.auth)
  const [open, setOpen] = useState(false)
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user.role !== "admin") {
      dispatch(getUserOrders())
    } else {
      dispatch(getAllOrders())
    }
  }, [dispatch, user])

  const handleGetSingleOder = async (id) => {
    await dispatch(getSingleOrder(id))
    setOpen(true)
  }
  const handleUpdateStatus = async (id, status) => {
    try {
      await dispatch(
        updateOrderStatus({ orderId: id, status: status })
      ).unwrap()
      toast.success("status update")
    } catch (error) {
      toast.error("error to updating status ")
    }
  }
  const handleStatusModal = (orderRow) => {
    setSelectedOrder(orderRow)
    setStatusModalOpen(true)
  }

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "address", headerName: "address", width: 200, editable: true },
    {
      field: "itemsQty",
      headerName: "itemsQty",
      width: 130,
      editable: true,
    },
    {
      field: "total",
      headerName: "total",
      width: 130,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      editable: false,
      renderCell: (params) => {
        return (
          <div className="flex mt-4  items-center justify-center  gap-2 group">
            {/* Status text */}
            <span
              className={`px-2 py-1 rounded text-white text-sm ${
                params.value === "cancelled"
                  ? "bg-red-500"
                  : params.value === "delivered"
                  ? "bg-green-500"
                  : params.value === "pending"
                  ? "bg-[#9fc31d]"
                  : "bg-gray-400"
              }`}
            >
              {params.value}
            </span>

            {/* View details button */}

            {user.role === "admin" && (
              <button
                className="cursor-pointer  text-gray-500 hover:text-gray-700 hidden group-hover:block transition-all"
                title="update status"
                onClick={() => handleStatusModal(params.row)}
              >
                <MdOutlineEdit size={20} />
              </button>
            )}
          </div>
        )
      },
    },
    {
      field: " ",
      flex: 1,
      headerName: "",
      type: "number",
      minWidth: 150,
      editable: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={``}>
              <button
                className="cursor-pointer mr-10"
                title="view Details"
                onClick={() => handleGetSingleOder(params.row.id)}
              >
                <AiOutlineArrowRight size={20} />
              </button>
            </Link>
          </>
        )
      },
    },
  ]

  const row = []

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        address: [
          item.shippingAddress.street,
          item.shippingAddress.city,
          item.shippingAddress.state,
          item.shippingAddress.zip,
        ]
          .filter(Boolean)
          .join(", "),
        itemsQty: item.items.length,
        total: "₹" + item.totalAmount,
        status: item.status,
      })
    })
  return (
    <>
      <div className="pl-8 pt-1">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableRowSelectionOnClick
          autoHeight
        />
      </div>
      <OrderDetails
        open={open}
        onClose={() => setOpen(false)}
        currentOrder={currentOrder}
      />
      <StatusModal
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        order={selectedOrder}
        onSave={handleUpdateStatus}
      />
    </>
  )
}
export default AllOrders
