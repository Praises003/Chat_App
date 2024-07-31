import React, {useState, useEffect} from 'react'
import {FiSearch} from "react-icons/fi"
import {FaTimes} from "react-icons/fa"
import { FaEllipsisV } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import SideDrawer from '../components/SideDrawer'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../slices/userSlice'
import ChatComponent from '../components/ChatComponent'
import ChatBoxComponent from '../components/ChatBoxComponent'
import axios from 'axios'




const ChatPage = () => {
  const [show, setShow] = useState(false)
  const [display, setDisplay] = useState(true)
  const [open, setOpen] = useState(false)
   const [refresh, setRefresh] = useState(false)
   const [mouseEff, setMouseEff] = useState(false)
   const [anoMouseEff, setAnoMouseEff] = useState(false)
   const [finalMouseEff, setFinalMouseEff] = useState(false)
  console.log(show)
  const updateShow = () => {
    setShow(!show)
  }
  const onOpen = () => setOpen(!open)
  const handleLeave = () => setMouseEff(false)
  const handleEnter = () => setMouseEff(true)
  const anoHandlerLeave = () => setAnoMouseEff(false)
  const anoHandlerEnter = () => setAnoMouseEff(true)
  const finalHandlerLeave = () => setFinalMouseEff(false)
  const finalHandlerEnter = () => setFinalMouseEff(true)
  const {user, isLoading, isError, isSuccess, isMessage} = useSelector(state => state.user)

  const dispatch = useDispatch()
  
  const navigate = useNavigate()
  // const aLogOut = async() => {
  //   const { data } = await axios.post("/api/user/logout")
   let anoUser = user === null
  // }
  // useEffect(() => {
    
  //   if(user === null) {
  //     navigate("/login")
  //     console.log(user)
  //   }
  // }, [user])
  useEffect(() => {
    if(!user || user === null)
    navigate("/register")
  },[user])
  
  const onLogOut = async() => {
    try {
      const { data } = await axios.post("hhttps://chat-app-backend-dusky.vercel.app/api/user/logout")

     dispatch(logout())     
    } catch (error) {
      console.log(error)
    }
    
  }
  
  const handleCreateGroup = () => {
    navigate("/group")

}
console.log(user)
  return (
    <div>
       <div className="my-1 mx-4 flex relative justify-between items-center">
        <div className="">
          <div className='flex align-middle'>
          <button style={{background: "#E4F5F2"}} className=' border border-gray-300 text-gray-900 text-md p-2.5 mb-3 rounded-lg flex items-center justify-between md:w-48' onClick={updateShow}>
            <FiSearch style={{backgroundColor: '#E4F5F2' }} color='#05E28D' size={20}/>
            <p className='hidden md:block '>search User</p>
          </button>
          <FaEllipsisV style={{backgroundColor: '#05E28D' }} size={34} color='#E4F5F2' className='mt-1 md:mt-2 ml-2.5 px-0.5 py-2 border rounded'  onClick={onOpen} />
          </div>
          <div style={{backgroundColor: "#E4F5F2"}} className={`rounded border px-4 py-1 ${open ? "block" : "hidden"}  `}>
          <FaTimes color='#' className='mb-3' size={20} onClick={onOpen} />
            <button onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={{backgroundColor: `${mouseEff ? "#05E28D" : "#E4F5F2" }`}} className={`block py-2 px-3 w-full mx-auto mb-2 border rounded-lg`} onClick={handleCreateGroup} >Create A Group</button>
            <button onClick={onLogOut} onMouseEnter={anoHandlerEnter} onMouseLeave={anoHandlerLeave} style={{backgroundColor: `${anoMouseEff ?"#05E28D" : "#E4F5F2"  }`}} className={`block py-2 px-3 w-full mx-auto mb-2 border rounded-lg shadow `}>Logout</button>
            <button onMouseEnter={finalHandlerEnter} onMouseLeave={finalHandlerLeave} style={{backgroundColor: `${finalMouseEff ? "#05E28D" : "#E4F5F2" }`}} className={`block py-2 px-3 w-full mx-auto border rounded-lg`}>Profile</button>
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
          
         
      </div>
      <div className={`flex`} >
            <ChatComponent display={display} setDisplay={setDisplay} />
            <ChatBoxComponent display={display} setDisplay={setDisplay}  />
            
          </div>
    </div>
  )
}

export default ChatPage