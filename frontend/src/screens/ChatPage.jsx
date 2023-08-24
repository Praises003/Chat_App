import React, {useState} from 'react'
import {FiSearch} from "react-icons/fi"
import { FaEllipsisV } from 'react-icons/fa'
import SideDrawer from '../components/SideDrawer'
import { Link } from 'react-router-dom'
import ChatComponent from '../components/ChatComponent'
import ChatBoxComponent from '../components/ChatBoxComponent'




const ChatPage = () => {
  const [show, setShow] = useState(false)
  const [display, setDisplay] = useState(true)
  const [open, setOpen] = useState(false)
   const [refresh, setRefresh] = useState(false)
  console.log(show)
  const updateShow = () => {
    setShow(!show)
  }
  const onOpen = () => setOpen(!open)
  return (
    <div>
       <div className="my-1 mx-4 flex relative justify-between items-center">
        <div className="">
          <div className='flex align-middle'>
          <button style={{background: "#E4F5F2"}} className=' border border-gray-300 text-gray-900 text-md p-2.5 mb-3 rounded-lg flex items-center justify-between md:w-48' onClick={updateShow}>
            <FiSearch color='#05E28D' size={20}/>
            <p className='hidden md:block '>search User</p>
          </button>
          <FaEllipsisV size={34} color='#05E28D' className='mt-1 md:mt-2 ml-2.5 px-0.5 py-2 border rounded' style={{backgroundColor: "#E4F5F2"}} onClick={onOpen} />
          </div>
          <div style={{backgroundColor: "#E4F5F2"}} className={`rounded border px-2 py-2 ${open ? "block" : "hidden"}  `}>
            <button style={{backgroundColor: '#05E28D' }} className={`block py-2 px-3 w-full mx-auto mb-2 border rounded-lg`}>Create A Group</button>
            <button style={{backgroundColor: '#05E28D' }} className={`block py-2 px-3 w-full mx-auto mb-2 border rounded-lg `}>Logout</button>
            <button style={{backgroundColor: '#05E28D' }} className={`block py-2 px-3 w-full mx-auto border rounded-lg`}>Profile</button>
          </div>
          </div>
          

         <h1>WhatsUp</h1>
      </div>
      {/* <div className="">
        
      </div> */}
      <div>        
          

          {
            show && <SideDrawer show={show} setShow={updateShow} /> 
          }
          
          <div className="w-full h-10 bg-blue-950"></div>
      </div>
      <div className={`flex justify-between`} >
            <ChatComponent display={display} setDisplay={setDisplay} refresh={refresh} setRefresh={setRefresh}/>
            <ChatBoxComponent display={display} setDisplay={setDisplay} refresh={refresh} setRefresh={setRefresh} />
            <br></br>
            
          </div>
    </div>
  )
}

export default ChatPage