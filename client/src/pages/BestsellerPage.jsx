import React, { useEffect, useState } from "react"
import { productData } from "../static/data"
import Header from "../components/layout/Header"
import ProductCard from "../components/Route/products/ProductCard"
import Footer from "../components/layout/Footer"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProducts } from "../redux/reducer/productSlice"
import Loading from "../components/layout/Loading"

const BestsellerPage = () => {
  const [data, setData] = useState([])
  const { products, loading } = useSelector((state) => state.products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])
  useEffect(() => {
    const d =
      products && [...products].sort((a, b) => b.total_sell - a.total_sell)
    console.log(d)
    setData(d)
  }, [products])
  return (
    <div>
      <Header active={2} />
      <br />
      <br />
      {loading ? (
        <Loading />
      ) : (
        <div className={`w-11/12 mx-auto`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
          {data && data.length === 0 ? (
            <h1 className="text-center w-full pb-[110px] text-[20px]">
              NO products Found!
            </h1>
          ) : null}
        </div>
      )}
      <Footer />
    </div>
  )
}

export default BestsellerPage
