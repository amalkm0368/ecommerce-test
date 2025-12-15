import React from "react"
import { brandingData, categoriesData } from "../../static/data"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../../redux/reducer/categorySlice"
import { useEffect } from "react"

const Categories = () => {
  const { categories, loading } = useSelector((state) => state.category)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])
  const navigate = useNavigate()
  return (
    <>
      <div className={` items-center hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start " key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px]  lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
        {categories &&
          categories.map((i) => {
            const handlSubmit = (i) => {
              navigate(`/products?category=${i.title}`)
            }
            return (
              <div
                className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                key={i._id}
                onClick={() => handlSubmit(i)}
              >
                <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                <img
                  src={i.image_Url}
                  alt=""
                  className="w-[120px] object-cover"
                />
              </div>
            )
          })}
      </div>
    </>
  )
}

export default Categories
