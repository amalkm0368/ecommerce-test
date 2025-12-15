import React, { useEffect, useState } from "react"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import ProductCard from "../components/Route/products/ProductCard"
import { useLocation, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProducts } from "../redux/reducer/productSlice"
import Loading from "../components/layout/Loading"
import { TbFilterSearch } from "react-icons/tb"

const ProductsPage = () => {
  const { products, loading, total } = useSelector((state) => state.products)

  const [searchParams] = useSearchParams()
  const categoryData = searchParams.get("category")
  const [search, setSearch] = useState("")
  const [minAmount, setMinAmount] = useState(null)
  const [maxAmount, setMaxAmount] = useState(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const location = useLocation()
  const categoryDataId = location.state?.id

  const [data, setData] = useState([])

  const dispatch = useDispatch()
  const queryString = new URLSearchParams({
    search: search || "",
    category: categoryDataId || "",
    min: minAmount || "",
    max: maxAmount || "",
    page: page,
    limit: limit,
  }).toString()
  useEffect(() => {
    dispatch(fetchAllProducts(queryString))
  }, [search, categoryDataId, minAmount, maxAmount, page, limit, dispatch])

  useEffect(() => {
    if (categoryData === null && products) {
      const d = [...products]?.sort((a, b) => a.total_sell - b.total_sell)
      setData(d)
    } else {
      const d = products?.filter((i) => i.category?.title === categoryData)
      setData(d)
    }
  }, [categoryData, products])

  return (
    <>
      <Header active={3} />
      <br />
      <br />

      <div>
        <div className="w-11/12 mx-auto">
          <div className=" flex mb-4 space-x-2">
            <div className="relative group w-10 hover:w-64 focus-within:w-64 transition-all duration-300">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-[#9cd018] opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300"
              />
              <TbFilterSearch
                size={20}
                className="absolute top-2 left-3 text-blue-500 pointer-events-none"
              />
            </div>

            {/* Min Amount */}
            <div>
              <input
                type="number"
                placeholder="Min amount"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9cd018] "
              />
            </div>

            {/* Max Amount */}
            <div>
              <input
                type="number"
                placeholder="Max amount"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9cd018] "
              />
            </div>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {data &&
                  data.map((i, index) => (
                    <ProductCard data={i} key={index} totalProduct={total} />
                  ))}
              </div>
              {data && data.length === 0 && (
                <h1 className="text-center w-full pb-[110px] text-[20px]">
                  No Products Found!
                </h1>
              )}

              {/* Pagination Controls */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="px-3 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                  Prev
                </button>{" "}
                <span className="text-sm">
                  Page {page} of {Math.ceil(total / limit) || 1}
                </span>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-3 py-2 bg-gray-200 rounded-lg"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ProductsPage
