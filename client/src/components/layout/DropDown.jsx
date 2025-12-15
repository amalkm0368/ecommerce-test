import React from "react"
import { useNavigate } from "react-router-dom"
import { categoriesData } from "../../static/data"

const DropDown = ({ setDropDown, categories }) => {
  const navigate = useNavigate()
  const handleCategoryClick = (i) => {
    navigate(`/products?category=${i.title}`, {
      state: { id: i._id },
    })
    setDropDown(false)
    // window.location.reload()
  }
  return (
    <div className="absolute z-30 w-[200px] bg-white rounded-b-md shadow-md pb-4">
      {categories?.map((category, index) => (
        <div
          key={index}
          className="flex items-center cursor-pointer hover:bg-gray-100 transition"
          onClick={() => handleCategoryClick(category)}
        >
          <img
            src={category.image_Url}
            alt={category.title}
            className="w-[25px] h-[25px] object-contain ml-3 select-none"
          />
          <h3 className="m-3 select-none">{category.title}</h3>
        </div>
      ))}
    </div>
  )
}

export default DropDown
