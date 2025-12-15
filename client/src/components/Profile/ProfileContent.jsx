import React, { useRef, useState } from "react"
import { backend_url } from "../../utils/axiosConfig.js"
import { useDispatch, useSelector } from "react-redux"
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai"
import { Link } from "react-router-dom"
import { DataGrid } from "@mui/x-data-grid"
import AllOrders from "../order/Order.jsx"
import {
  updateProfileImage,
  updateShippingAddress,
} from "../../redux/reducer/authSlice.js"
import toast from "react-hot-toast"

const ProfileContent = ({ active }) => {
  const { user, loading, error } = useSelector((state) => state.auth)
  const { orders, loadings } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email)
  const [zipCode, setZipCode] = useState(user.address?.zip || "")
  const [phoneNumber, setPhoneNumber] = useState(user.phone || "")
  const [address1, setAddress1] = useState(user.address?.street || "")
  const [state, setState] = useState(user.address?.state || "")

  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(user?.profileImage || "")

  const handleProfileClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append("profileImage", file)

      try {
        await dispatch(updateProfileImage(formData)).unwrap()
        toast.success("Profile updated")
        setPreview(URL.createObjectURL(file))
      } catch (error) {
        toast.error("Error updating profile")
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      name,
      email,
      zip: zipCode,
      phone: phoneNumber,
      street: address1,
      state,
    }

    const res = await dispatch(updateShippingAddress(formData))

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Address updated successfully")
      // navigate("/login") // Remove if this isn't for registration
    } else {
      toast.error(res.payload || "Failed to update address")
    }
  }

  return (
    <div className="w-full">
      {/* profile page */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full ">
            <div className="relative">
              <img
                src={`${preview}`}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ae13a]"
              />
              <div
                className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]"
                onClick={handleProfileClick}
              >
                <input
                  type="file"
                  id="profile"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <AiOutlineCamera title="you can change photo" />
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
              {/* Full Name & Email */}
              <div className="w-full flex pb-3 space-x-2">
                <div className="w-1/2">
                  <label className="block mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded-md border-[#9f9708] focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-1 font-medium">Email Id</label>
                  <input
                    type="email"
                    className="w-full border p-2 rounded-md border-[#9f9708] focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Phone Number & Zip Code */}
              <div className="w-full flex pb-3 space-x-2">
                <div className="w-1/2">
                  <label className="block mb-1 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="w-full border p-2 rounded-md border-[#9f9708] focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-1/3">
                  <label className="block mb-1 font-medium">Zip Code</label>
                  <input
                    type="number"
                    className="w-full border p-2 rounded-md border-[#9f9708] focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-1 font-medium">State</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded-md border-[#9f9708] focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>

              {/* Address  */}
              <div className="w-full flex pb-3 space-x-2">
                <div className="w-full">
                  <label className="block mb-1 font-medium">Address</label>
                  <textarea
                    rows="3"
                    className="w-full border p-2 rounded-md border-[#9f9708] resize-none focus:outline-none focus:ring-2 focus:ring-[#9f9708]"
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <input
                  type="submit"
                  className="w-[250px] h-[40px] border border-[#9f9708] text-center text-[#9f9708] rounded-md mt-8 cursor-pointer hover:bg-[#9f9708] hover:text-white transition-colors"
                  value="Update"
                />
              </div>
              {error && (
                <p className="text-red-600 text-center text-sm">{error}</p>
              )}
            </form>
          </div>
        </>
      )}

      {/* order page */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* refunds */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* trackorders */}
      {active === 5 && (
        <div>
          <TrackOrders />
        </div>
      )}

      {/* payment Method */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/* Address */}
      {active === 7 && (
        <div>
          <Addresses />
        </div>
      )}
    </div>
  )
}

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ]

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "itemsQty",
      headerName: "itemsQty",
      width: 150,
      editable: true,
    },
    {
      field: "total",
      headerName: "total",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "status",
      type: "number",
      width: 110,
      editable: true,
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
            <Link to={`/order/${params.id}`}>
              <button className="cursor-pointer mr-10" title="view Details">
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
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
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
          
    </>
  )
}

const TrackOrders = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ]

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "itemsQty",
      headerName: "itemsQty",
      width: 150,
      editable: true,
    },
    {
      field: "total",
      headerName: "total",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "status",
      type: "number",
      width: 110,
      editable: true,
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
            <Link to={`/order/${params.id}`}>
              <button className="cursor-pointer mr-10" title="view Details">
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
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
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
          
    </>
  )
}

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000] pb-2">
          Payment Methods
        </h1>
        <div
          className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer `}
        >
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />

      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="pl-5 font-[600] ">Shamon Esmail</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234*** **** *****</h6>
          <h5 className="pl-6"> 08/2024</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

const Addresses = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000] pb-2">
          My Addresses
        </h1>
        <div
          className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center  cursor-pointer !rounded-md`}
        >
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />

      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600] ">Default</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>494 Erdan Passage,new Jersey,Paramount</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>(+91) 7556954585</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default ProfileContent
