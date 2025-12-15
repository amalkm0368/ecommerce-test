import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProducts } from "../../redux/reducer/productSlice"
import { BarChartBox, PieChartBox } from "./ChartComponent"

const Chart = () => {
  const { products, loading } = useSelector((state) => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  const totalStock = useMemo(
    () => products.reduce((total, cur) => total + cur.stock, 0),
    [products]
  )

  const totalSell = useMemo(
    () => products.reduce((total, cur) => total + cur.total_sell, 0),
    [products]
  )

  const totalStockValue = useMemo(
    () =>
      products.reduce(
        (total, cur) => total + (cur.price || 0) * (cur.stock || 0),
        0
      ),
    [products]
  )

  const totalDiscountStockValue = useMemo(
    () =>
      products.reduce(
        (total, cur) => total + (cur.discount_price || 0) * (cur.stock || 0),
        0
      ),
    [products]
  )

  const pieData = [
    { name: "Total Stock", value: totalStock },
    { name: "Total Sold", value: totalSell },
  ]

  const pieStockDataValue = [
    { name: "Current Price Stock Value", value: totalStockValue },
    { name: "Discount Price Stock Value", value: totalDiscountStockValue },
  ]

  const barData = products?.map((p) => ({
    name: p.title,
    stock: p.stock,
    sold: p.total_sell,
  }))

  return (
    <div className="w-11/12 mx-auto py-6 space-y-8">
      {/* Summary Stats */}
      <h2 className="text-2xl font-bold text-center mb-8">
         Analytics Data
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Stock</h3>
          <p className="text-2xl font-bold text-blue-600">{totalStock}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Sold</h3>
          <p className="text-2xl font-bold text-green-600">{totalSell}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-sm font-medium text-gray-500">Stock Value</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${totalStockValue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Stock vs Sales (Quantity)
          </h2>
          <PieChartBox data={pieData} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Stock Value (Current vs Discount)
          </h2>
          <PieChartBox data={pieStockDataValue} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Stock & Sales by Product</h2>
        <BarChartBox data={barData} />
      </div>
    </div>
  )
}

export default Chart
