import { ChatIcon, NavIcon, NextArrowIcon} from "../../../assets/svg/Icons"
import profileImage from '../../../assets/images/v1.jpeg'
import v2 from '../../../assets/avatars/avatar2.jpeg'

import coins from '../../../assets/images/coins.png'
import React, { useState } from "react"

const GameHeader = () => {

  const [messagesList, setMessagesList] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [messagePopUp, setMessagePopUp] = useState(true)

  const showModal = () => {
    setMessagesList(!messagesList)
  } 

  const showProfileModal = () => {
    setShowProfile(!showProfile)
  }


  return (
    <>
      <div className="bg-[#1c1c1c] shadow-lg p-2">
        {/* top header */}
        <div className="flex justify-between items-flex">
          {/* left part             */}
          <div className="flex items-center gap-2">

            <NavIcon className='md:bg-red-800 bg-red-900 text-gray-200 rounded-md shadow-md cursor-pointer' />
            <div className='flex items-center justify-center ml-2 border-2 border-gray-400 rounded-full cursor-pointer w-9 h-9'>
              {/* if profile image exits */}
              <img className='rounded-full object-contain' src={profileImage} onClick={showProfileModal} alt='profile' />
              {/* if profile image does not exists */}
              {/* <ProfileIcon width="24" height="24" className="text-gray-400" /> */}
            </div>
            {/*this for Message pop up*/}
            {messagePopUp ? (<div className="tooltip_l text-gray-600">Good Luck!</div>) : ("")}
            <div className="flex flex-col">
              <span className="hidden md:block text-gray-200 font-medium">Youssef Zer</span>
              {/* here put the progress design for pc*/}
            </div>
          </div>
          {/* center part */}
          <div className="bg-[#141414] flex items-center justify-between gap-2 border border-solid border-gray-600 px-4 rounded-md">
            <span className="text-gray-200 font-sm">3</span>
            <div className='bg-[#1f1f1f] rounded-md w-20 mx-2 flex items-center justify-center gap-1 h-full'>
              <span className='text-white md:text-lg text-sm'>250</span>
              <img className='z-99 md:w-4 md:h-4 w-[14px] h-[14px]' src={coins} alt="coins" />
            </div>
            <span className="text-gray-200 font-sm">1</span>
          </div>
          {/* right part */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="hidden md:block text-gray-200 font-medium">Adil Ben</span>
              {/* here put the progress design */}
            </div>
            <div className='flex items-center justify-center mr-2 border-2 border-gray-400 rounded-full cursor-pointer w-9 h-9'>
              {/* if profile image exits */}
              <img className='rounded-full object-contain' src={v2} onClick={showProfileModal} alt='profile' />
              {/* if profile image does not exists */}
              {/* <ProfileIcon width="24" height="24" className="text-gray-400" /> */}
            </div>
            {/*this for Message pop up*/}
            {messagePopUp ? (<div className="tooltip_r text-gray-600">Thanks!</div>) : ("")}
            <ChatIcon onClick={showModal} className='text-gray-200 cursor-pointer' width='28px' height='28px' />
          </div>
        </div>
        {/* bottom header (only appears in phones) */}
        <div className="flex items-center justify-between px-6">
          {/* my progess */}
          <div>
            <span className="w-2.5 h-2.5 bg-green-800 rounded-full inline-block"></span>
            <span className="w-2.5 h-2.5 bg-green-800 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-green-800 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-red-800 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-red-800 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full inline-block ml-0.5"></span>
          </div>
          {/* opponent progress */}
          <div>
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-red-800 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-green-800 rounded-full inline-block ml-0.5"></span>
            <span className="w-2.5 h-2.5 bg-red-800 rounded-full inline-block ml-0.5"></span>
            
          </div>
        </div>
      </div>
      {/* <div className=""></div> */}
      {messagesList ? (<div className="MessagesDiv absolute bg-[#141414] text-[#fff] top-[50px] right-2 h-[300px] overflow-x-hidden overflow-y-scroll rounded-md shadow-lg py-2 px-1 w-[200px] text-center">
        <p onClick={showModal} className="pb-2 pt-2 text-gray-200 hover:text-[#fff] hover:bg-[#212121] rounded-md">Good Luck!</p>
        <p onClick={showModal} className="pb-2 pt-2 text-gray-200 hover:text-[#fff] hover:bg-[#212121] rounded-md">Beat Ya!</p>
        <p onClick={showModal} className="pb-2 pt-2 text-gray-200 hover:text-[#fff] hover:bg-[#212121] rounded-md">You Loose!</p>
        <p onClick={showModal} className="pb-2 pt-2 text-gray-200 hover:text-[#fff] hover:bg-[#212121] rounded-md">Thanks!</p>
        <p onClick={showModal} className="pb-2 pt-2 text-gray-200 hover:text-[#fff] hover:bg-[#212121] rounded-md">See Ya!</p>
        <p onClick={showModal} className="pb-2 pt-2 text-gray-200 hover:text-[#fff] hover:bg-[#212121] rounded-md">Better Luck Next Time!</p>
        <p onClick={showModal} className="pb-2 pt-2 text-gray-200 hover:text-[#fff] hover:bg-[#212121] rounded-md">Good Game!</p>
        <p onClick={showModal} className="pb-2 pt-2 text-gray-200 hover:text-[#fff] hover:bg-[#212121] rounded-md">Come On!</p>
      </div>) : ""}

      {showProfile ? (<div className="profile_Modal absolute bg-[#141414] text-[#fff] top-[12%] left-[20px] w-[200px] h-[250px] shadow-lg m-2">
      <div className="flex flex-col items-center gap-2 bg-[#252525] shadow-lg">
                <div className='flex items-center justify-center border border-gray-400 rounded-full cursor-pointer w-20 h-20 mt-4'>
                        {/* if profile image exits */}
                    <img  className='rounded-full object-contain' src={profileImage} alt='profile' />
                        {/* if profile image does not exists */}
                    {/* <ProfileIcon width="24" height="24" className="text-gray-400" /> */}
                </div>
                <span className="text-gray-300 text-2xl">John Doe</span>
                <span className='text-gray-400 text-md'>ID349853451</span>
                <div className='flex items-center gap-1 mt-2 mb-4'>
                    <p className="border border-solid border-gray-400 text-gray-300 text-sm font-medium rounded-md px-1 flex items-center ml-1">AR</p>
                    <NextArrowIcon className="text-gray-300" width="1em" height="1em" />
                    <p className="border border-solid border-gray-400 text-gray-300 text-sm font-medium rounded-md px-1 flex items-center">EN</p>
                </div>
                <button className='bg-[#007acc] text-gray-200 w-32 py-1 rounded-md shadow-md cursor-pointer mb-4'>
                    Invite
                </button>
            </div>
      </div>) : ""}

    </>

  )
}

export default GameHeader
