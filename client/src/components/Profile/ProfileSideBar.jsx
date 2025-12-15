import React from "react"
//react icon
import { RxPerson } from "react-icons/rx"
import { RiRefund2Fill } from "react-icons/ri"
import {
  MdOutlineTrackChanges,
  MdForklift,
  MdOutlineForwardToInbox,
  MdPayment,
} from "react-icons/md"
import { TbAddressBook } from "react-icons/tb"
import { AiOutlineLogout } from "react-icons/ai"

import { useNavigate } from "react-router-dom"
import { HiOutlineShoppingBag } from "react-icons/hi"
import axios from "axios"
import { backend_url } from "../../utils/axiosConfig.js"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/reducer/authSlice.js"

const ProfileSideBar = ({ active, setActive }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutHandler = async () => {
    await dispatch(logout())
    toast.success(" user logout")
  }

  return (
    <div className="w-full bg-[#f9f9f9] shadow-sm  rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span className={`pl-3 ${active === 1 ? "text-[red]" : " "}`}>
          Profile
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span className={`pl-3 ${active === 2 ? "text-[red]" : " "}`}>
          Orders
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <RiRefund2Fill size={20} color={active === 3 ? "red" : ""} />
        <span className={`pl-3 ${active === 3 ? "text-[red]" : " "}`}>
          Refunds
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <MdOutlineForwardToInbox size={20} color={active === 4 ? "red" : ""} />
        <span className={`pl-3 ${active === 4 ? "text-[red]" : " "}`}>
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span className={`pl-3 ${active === 5 ? "text-[red]" : " "}`}>
          Track Orders
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <MdPayment size={20} color={active === 6 ? "red" : ""} />
        <span className={`pl-3 ${active === 6 ? "text-[red]" : " "}`}>
          Payment Methods
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span className={`pl-3 ${active === 7 ? "text-[red]" : " "}`}>
          Address
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(8) || logoutHandler()}
      >
        <AiOutlineLogout size={20} color={active === 8 ? "red" : ""} />
        <span className={`pl-3 ${active === 8 ? "text-[red]" : " "}`}>
          Logout
        </span>
      </div>
    </div>
  )
}

export default ProfileSideBar
