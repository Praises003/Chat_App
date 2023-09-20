import React from 'react'
import chatLogoo from '../assets/chat_logo4.png'
import chat_img3
from "../assets/chat_img5.jpg"
import { Link } from 'react-router-dom'
const StartChat = () => {
  return (
    <div className=''>
      <div className="bg-gray-100 w-96  mx-auto mt-6 p-5">
        <img className=' w-40 mx-auto' src={chatLogoo} alt="" />
        <h1 style={{color: "#05E28D"}} className=' font-bold text-4xl text-center mb-40'>WhatsUp</h1>
        <p className='text-center font-normal text-lg md:text-xl mb-20'>The best chat app of this century</p>
        <Link to="/chat"  style={{backgroundColor: "#10C17D"}} className='w-full block text-center py-2 text-white rounded-2xl text-lg'>Start Chatting Now</Link>
      </div>


    </div>
  )
}

export default StartChat