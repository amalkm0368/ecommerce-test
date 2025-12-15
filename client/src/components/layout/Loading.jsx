import React from "react"

const Loading = () => {
  return (
    <div className="  flex flex-col space-y-5 justify-center items-center h-[200px]">
      <div className=" relative w-12 h-12 ">
        <div className="absolute inset-0 border-4 rounded-full border-t-gray-100 border-[#c8cc00]  animate-spin"></div>
      </div>
      <div className="flex items-center space-x-1">
        <p className="text-[#c8cc00] ">Loading </p>
        <div className="flex items-center justify-center space-x-2">
          <div className=" w-2 h-2 rounded-full animate-bounce bg-[#c8cc00] "></div>
          <div className=" w-2 h-2 rounded-full bg-[#c8cc00]  animate-bounce  [animation-delay:-0.3s] "></div>
          <div className=" w-2 h-2 rounded-full animate-bounce bg-[#c8cc00]  [animation-delay:-0.15s]"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
