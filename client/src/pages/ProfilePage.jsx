import React, { useState } from "react"
import Header from "../components/layout/Header"
import ProfileSideBar from "../components/Profile/ProfileSideBar"
import ProfileContent from "../components/Profile/ProfileContent"
import Footer from "../components/layout/Footer"

const ProfilePage = () => {
  const [active, setActive] = useState(1)
  return (
    <div>
      <Header />
      <div className={` w-11/12 mx-auto flex bg-[#fefcfc] py-10`}>
        <div className="w-[200px] lg:w-[335px] ">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-[calc(100%-200px)] lg:w-[calc(100%-335px)] ">
          <ProfileContent active={active} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage
