import React from "react"
import Header from "../components/layout/Header"
import Hero from "../components/Route/Hero"
import Categories from "../components/Route/Categories"
import BestDeals from "../components/Route/BestDeals"
import Footer from "../components/layout/Footer"
import Events from "../components/Events/Events"
import FeaturedProducts from "../components/Route/FeaturedProducts"
import Sponsored from "../components/Route/Sponsored"
import Chart from "../components/chart/Chart"
import { useSelector } from "react-redux"

function Home() {
  const { user } = useSelector((state) => state.auth)
  return (
    <div>
      <Header active={1} />
      <Hero />
      {user?.role === "admin" && <Chart />}

      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <Footer />
    </div>
  )
}

export default Home
