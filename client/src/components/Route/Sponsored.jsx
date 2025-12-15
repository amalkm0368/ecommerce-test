import React from "react"
import sony from "../../assets/sony.jpg"
import dell from "../../assets/dell.jpg"
import lg from "../../assets/lg.jpg"
import microsoft from "../../assets/microsoft.jpg"

const Sponsored = () => {
  return (
    <div
      className={`w-11/12 mx-auto hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex ">
          <img src={sony} alt="" height="130px" width="130px" />
        </div>
        <div className="flex ">
          <img src={dell} alt="" height="130px" width="130px" />
        </div>
        <div className="flex ">
          <img src={lg} alt="" height="130px" width="130px" />
        </div>
        <div className="flex ">
          <img src={microsoft} alt="" height="130px" width="130px" />
        </div>
      </div>
    </div>
  )
}

export default Sponsored
