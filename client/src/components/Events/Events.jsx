import React from "react"
import EventCard from "./EventCard"

const Events = () => {
  return (
    <div>
      <div className={`w-11/12 mx-auto`}>
        <div
          className={`text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]`}
        >
          <h1>Popular Evaents</h1>
        </div>
        <div className="w-full grid">
          <EventCard />
        </div>
      </div>
    </div>
  )
}

export default Events
