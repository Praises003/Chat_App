import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaTelegram } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import { FaEllipsisV } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
import getSender from '../utils/getSender';
import Profile from './Profile';
import axios from 'axios';
import MessageComponent from './MessageComponent';
import SpinnerComponent from '../components/SpinnerComponent'


let ENDPOINT = "https://chat-app-api-vzj2.onrender.com"
let socket, singleChatCompare;

const ChatBoxComponent = ({display, setDisplay}) => {
  const [showProfile, setShowProfile] = useState(false)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [socketConn, setSocketConn] = useState(false)
  const [bool, setBool] = useState(false)
  const { user } = useSelector(state => state.user)
  const {singleChat, isLoading, isError, isSuccess, message}= useSelector(state => state.singleChat)
  
  // console.log(display)
   //console.log(singleChat)
  const navigate = useNavigate()
  const sendMessage = async () => {
    if(newMessage) {
      try {
        setNewMessage("")
        const {data} = await axios.post(`https://chat-app-api-vzj2.onrender.com/api/message`, {
          message: newMessage,
          chatId: singleChat._id
        }, {
          withCredentials: true // important to include cookies
        })
        console.log(data)
        socket.emit("new_message", data)
        setMessages([...messages, data])
        //setBool(!bool)
      
        
      } catch (error) {
        console.log(error)
      }
    }
  }
  const typingHandler = (e) => {
    setNewMessage(e.target.value)
  }

  const getMessages = async () => {
    if(!singleChat) return console.log("no chat selected")

    try {
      setLoading(true);
      const { data } = await axios.get(`https://chat-app-api-vzj2.onrender.com/api/message/${singleChat?._id}`, {
        withCredentials: true // important to include cookies
      })
      data ? console.log(data) : console.log("no chat")
      setMessages(data)
      setLoading(false)
      await console.log(messages)
      socket.emit("join_chat", singleChat._id)
    } catch (error) {
      console.log(error) 
    }
  }
  useEffect(() => {
    socket = io.connect(ENDPOINT,  {
      withCredentials: true
    })
    socket.emit("initt", user)
    socket.on("connection", () => setSocketConn(true))
  },[])
  
  useEffect(() => {
    getMessages()
    singleChatCompare = singleChat
  }, [singleChat])

  useEffect(() => {
    socket.on("message_received", (newMessage) => {
      console.log(newMessage)

      if(!singleChat || singleChat._id !== newMessage.chat._id) {
        // notifications
      } else {
        setMessages([...messages, newMessage])
        console.log(newMessage)

      }
    })
  })
  console.log(singleChat)
  console.log(messages)
  return (
    <div  className={`relative m ${!display ? 'w-full ' : 'hidden'} md:block md:w-7/12 h-[82.5vh] bg-gray-200 p-2`}>
      <div className="flex justify-between">
      <IoMdArrowRoundBack className='block md:hidden' onClick={() => setDisplay(!display)} color='#05E28D' size={24} />
      
      {singleChat ? (
        <div className="">
           <img src={singleChat ? singleChat.users[1].picture : null} className='rounded-full w-12 h-12 object-cover mr-4 mb-3' alt="singleUser" />
          <h1>{singleChat?.users[1].name}</h1>

        </div>
     ) : (
            <div className="">
              
            </div>
     )}
      <FaEllipsisV onClick={() => setShowProfile(!showProfile)} />
      </div>
      {showProfile && <div onClick={()=>{}} className="absolute top-20 right-0">
        <button onClick={() => navigate("/profile")} style={{backgroundColor: '#E4F5F2' }} className={`block py-2 px-3   border rounded-lg`}>View Profile</button>
      </div>}
      {
        singleChat ? (<div>
          <h1>{!singleChat.groupChat ? (getSender(user, singleChat?.users)) : (<div>
            {singleChat.chatName.toUpperCase()}
          </div>)}</h1>
        </div>) : (
          <h1 className='text-2xl text-center font-bold uppercase mt-32  '>Click on a user to start chatting</h1>
        ) 
      }

      <div className=" absolute bottom-0 w-full flex items-center mb-3">
      <input value={newMessage} onChange={typingHandler} placeholder='Type message' className='border rounded-lg p-3 block w-9/12 md:w-10/12 ml-3 bg-gray-50 shadow' />
      <BiSend size={46} color='#fff' style={{backgroundColor: "#33b27f"}} className='p-3 border rounded-2xl ml-2' onClick={sendMessage} />

      </div>

      { console.log(messages)}
      {/* {loading ? "Loading" : messages.map(msg => msg && <h1>{msg.message}</h1>)} */}
      <div  className="flex flex-col mb-16 max-h-[calc(68.5vh-100px)] overflow-y-auto">
      {loading ? <SpinnerComponent /> : messages.map(msg => <MessageComponent key={msg._id} msg={msg} />)}
      </div>
      
    </div>
  )
}

export default ChatBoxComponent