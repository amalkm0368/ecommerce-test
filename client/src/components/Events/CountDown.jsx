import React, { useEffect, useState } from "react"

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearTimeout(timer)
  })

  function calculateTimeLeft() {
    const difference = +new Date("2025-08-18") - +new Date()
    let timeLeft = {}
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  }
  
  const timerComponent = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null
    }
    return (
      <span className="text-[#ad2ec4] text-[20px]">
        {" "}
        {timeLeft[interval]}
        {interval}
      </span>
    )
  })
  return (
    <div>
      {timerComponent.length ? (
        <span className="felx gap-5">{timerComponent}</span>
      ) : (
        <span className="text-[red] text-[25px]"> Time's Up</span>
      )}
    </div>
  )
}

export default CountDown
