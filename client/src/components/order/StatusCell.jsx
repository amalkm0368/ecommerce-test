import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { IoChevronDownCircleOutline } from "react-icons/io5"

const StatusModal = ({ open, onClose, order, onSave }) => {
  console.log(order)
  const dropdownRef = useRef()
  const [newStatus, setNewStatus] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const handleSave = () => {
    if (newStatus) {
      onSave(order.id, newStatus)
      onClose()
    }
  }
  useEffect(() => {
    setNewStatus(order?.status)
  }, [order])
  const statuses = [
    { label: " Pending", value: "pending", color: "text-yellow-500" },
    { label: "Processing", value: "processing", color: "text-blue-500" },
    { label: " Delivered", value: "delivered", color: "text-green-500" },
    { label: " Cancelled", value: "cancelled", color: "text-red-500" },
  ]

  const selected = statuses.find((s) => s.value === newStatus)
  console.log(newStatus, selected)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4 text-[#93c514]">
          Update Order Status
        </h2>

        {/* Better styled select */}
        <div className="relative" ref={dropdownRef}>
          {/* Selected Box */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-left flex justify-between items-center hover:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <span className={selected?.color}>
              {selected?.label || "Select Status"}
            </span>
            <IoChevronDownCircleOutline
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fadeIn">
              {statuses.map((status) => (
                <div
                  key={status.value}
                  onClick={() => {
                    setNewStatus(status.value)
                    setIsOpen(false)
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${status.color}`}
                >
                  {status.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#93c514] hover:bg-[#87b80c] text-white px-4 py-2 rounded-lg transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default StatusModal
