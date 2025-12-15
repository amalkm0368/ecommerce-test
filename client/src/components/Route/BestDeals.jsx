import React, { useEffect, useState } from "react"

import { productData } from "../../static/data"
import ProductCard from "./products/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProducts } from "../../redux/reducer/productSlice"

const BestDeals = () => {
  const [data, setData] = useState([])
  const { products } = useSelector((state) => state.products)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])
  
  useEffect(() => {
    const d =
      products && [...products]?.sort((a, b) => b.total_sell - a.total_sell)
    const firstFive = d.slice(0, 5)
    setData(firstFive)
  }, [products])
  return (
    <div className={`w-11/12 mx-auto`}>
      <div
        className={`$text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]`}
      >
        <h1>Best Deals</h1>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px]  lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
      </div>
    </div>
  )
}

export default BestDeals
