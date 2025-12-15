import React, { useEffect } from "react"
import { productData } from "../../static/data"
import ProductCard from "./products/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProducts } from "../../redux/reducer/productSlice"

const FeaturedProducts = () => {
  const { products } = useSelector((state) => state.products)
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])
  return (
    <div className={`w-11/12 mx-auto`}>
      <div
        className={`text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]`}
      >
        <h1>Featured Products</h1>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {products &&
          products.map((i, index) => <ProductCard data={i} key={index} />)}
      </div>
    </div>
  )
}

export default FeaturedProducts
