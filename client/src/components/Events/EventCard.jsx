import React from "react"
import CountDown from "./CountDown"

const EventCard = () => {
  return (
    <div className={`w-full bg-white rounded-lg lg:flex p-2`}>
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src="https://m.media-amazon.com/images/I/71657TiFeHL.SX522.jpg"
          alt=""
        />
      </div>
      <div className="w-full lg:w-[50%] m-auto flex flex-col justify-center">
        <h2 className={`text-[25px] font-[600] font-Roboto text-[#333]`}>
          IPhone 14 Pro
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor
          sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h4 className="font-bold text-[20px] pr-3 coloe-[#333] font-Roboto">
              {" "}
              $5800
            </h4>
            <h5 className="font-[500] text-[18px] text-[#d55b45] line-through">
              $6000
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[green]">
            120 Sold
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  )
}

export default EventCard
