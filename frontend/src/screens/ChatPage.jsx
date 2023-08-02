import React, {useState} from 'react'
import {FiSearch} from "react-icons/fi"
import SideDrawer from '../components/SideDrawer'
import { Link } from 'react-router-dom'




const ChatPage = () => {
  const [show, setShow] = useState(false)
  console.log(show)
  const updateShow = () => {
    setShow(!show)
  }
  return (
    <>
       <div className="my-1 mx-4 flex relative justify-between items-center">
          <button style={{background: "#E4F5F2"}} className=' border border-gray-300 text-gray-900 text-md p-2.5 mb-3 rounded-lg flex items-center justify-between md:w-48' onClick={updateShow}>
            <FiSearch color='#05E28D' size={20}/>
            <p className='hidden md:block '>search User</p>
          </button>
          

         <h1>WhatsUp</h1>
      </div>
      <div className="">
        
      </div>
      <div>        
          

          {
            show && <SideDrawer show={show} setShow={updateShow} /> 
          }

        
      </div>
    </>
  )
}

export default ChatPage