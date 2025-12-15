import React from "react"
import { Link } from "react-router-dom"
import hero from "../../assets/hero.webp"

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh]  800px:min-h-[80vh] w-full bg-no-repeat  flex items-center bg-black`}
    >
      <img src={hero} className="absolute opacity-30 w-full h-full object-cover " />
      <div className={` mx-auto w-[90%] lg:w-[60%] z-10`}>
        <h1
          className={`text-[25px] leading-[1.2] lg:text-[60px] text-[#bab6b6] font-[600] capitalize`}
        >
          We have the best for <br />
          Everything
        </h1>
        <p className="pt-5 text-[16px] font-[400] font-Poppins text-[#000000ba]  "></p>
        <Link to="/products" className="inline-block">
          <div
            className={`w-[150px]  h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer mt-5 bg-[#371515] hover:bg-[#b8c439]`}
          >
            <span className="text-white  font-Poppins text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Hero
