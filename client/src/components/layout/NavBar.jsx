import React from "react"
import { navItems } from "../../static/data"
import { Link } from "react-router-dom"
import { useState } from "react"
import { TiArrowSortedUp } from "react-icons/ti"
import { useSelector } from "react-redux"

const NavBar = ({ active }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { user } = useSelector((state) => state.auth)
  
  return (
    <nav className="relative space-x-6 font-medium text-white text-sm md:text-base flex items-center">
      {navItems.map((nav, i) => {
        if (nav.title === "Products" && user?.role === "admin") {
          return (
            <div
              key={i}
              className="relative inline-block"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Link
                to={nav.url}
                className={`${
                  active === i + 1 ? "text-pink-700" : "text-white"
                }`}
              >
                {nav.title}
              </Link>
              {showDropdown && (
                <div className="flex flex-col absolute top-full min-w-[150px]">
                  <TiArrowSortedUp className="text-white text-xl  -mb-1 " />
                  <div className="bg-white text-black rounded shadow-lg z-50">
                    <Link
                      to="/create-product"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Create Product
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )
        }

        return (
          <Link
            key={i}
            to={nav.url}
            className={`${active === i + 1 ? "text-pink-700" : "text-white"}`}
          >
            {nav.title}
          </Link>
        )
      })}
    </nav>
  )
}

export default NavBar
