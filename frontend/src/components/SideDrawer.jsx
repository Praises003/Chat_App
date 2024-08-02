import React, { useState } from 'react'
import {FaTimes} from "react-icons/fa"
import axios from "axios"
import Avatar from './AvatarComponent'
import {useSelector, useDispatch} from "react-redux"
import { chats } from '../slices/chatSlice'
import { singleChats } from '../slices/singleChatSlice'


const SideDrawer = ({show, setShow}) => {
  const [loading, setLoading] = useState(false)
  const [resLoad, setResLoad] = useState(false)
  const [input, setInput] = useState("")
  const [inputRes, setInputRes ] = useState([])
    const [drawer, setDrawer] = useState(true)
    const [testChat, setTestChat] = useState([])
  const dispatch = useDispatch()
    const {chat, isLoading, isError, isSuccess, message} = useSelector(state => state.chat)
     const {singleChat, onLoading, onError, onSuccess, onMessage} = useSelector(state => state.singleChat)

  
    //console.log(drawer)

// const onInput = (e) => {
//   setInput(e.target.value)
// }
  const handleInput = async(e) => {
    
    
    try {
      //if(!input) setInput(e.target.value)
      setLoading(true);
      const { data } = await axios.get(`https://chat-app-backned.onrender.com/api/user/?search=${input}`)
      setLoading(false);
      console.log(input)
      //setInputRes(data)
      console.log(data)
      setInputRes(data.users)
      //console.log(input)
      //console.log(inputRes)
      
    } catch(err) {
        console.log(err.message)
    }
  }

  const accessChat = async(userId) => {
    console.log(userId)

    try {
      const {data} = await axios.post(`https://chat-app-backned.onrender.com/api/chat`, { userId })
      console.log(data)
      setTestChat(data)
      if (!chat.find((ch) => ch._id === data._id)) {dispatch(chats([data, ...chat]))}
    
       //if(!chat) dispatch(message)
       dispatch(singleChats(data))
       //if(!singleChat) dispatch(message)

      // console.log(chat)
      // console.log(singleChat)
      if(data) setShow(!show)
    } catch (error) {
      console.log((error))
    }
  }
  //dispatch(chats(testChat.data))
    //dispatch(singleChats(testChat))
  //console.log(input)
  
    //const showp = show
  return (
    <>
    { show  || drawer ? (<div className={`my-1  h-screen w-full absolute top-0 bg-white shadow transition-transform ${show ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="w-72  absolute top-0 left-0 flex justify-center items-center">
            <input className={` w-full border ml-2 border-gray-300 text-gray-900 text-md p-2 mb-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  bg-white  `} type="text" placeholder='search for users'value= {input} onChange={e => {setInput(e.target.value); }} />
            <FaTimes color='#05E28D' size={25} onClick={() => setShow(!show)} className='ml-1' />
            {/* {console.log(show)}
            {console.log(drawer)} */}
            <button style={{backgroundColor: "#05E28D"}} onClick={handleInput} className='bg-blue-700 text-white px-3 py-1 align-middle text-center ml-2'
            >Go</button>
        </div>
        <div className='mt-12'>
      {loading ? <h1>Loading</h1> : inputRes?.map(res => <Avatar key={res._id} res={res} onFunction={() => accessChat(res._id)} />)}
      {/*{console.log(chat[0])}*/}
      {console.log(testChat)}
    </div>
    {console.log(inputRes)}

    </div> ) : ""}
   
    </>
  )
  
}

export default SideDrawer