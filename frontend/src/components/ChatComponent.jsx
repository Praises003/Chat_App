import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chats } from '../slices/chatSlice'
import axios from 'axios'
import getSender from '../utils/getSender'
import { RealUtil } from '../utils/RealUtil'
import ChatAvatarComponent from './ChatAvatarComponent'
import SpinnerComponent from '../components/SpinnerComponent'


const ChatComponent = ({display, setDisplay, refresh}) => {
    const {chat, isLoading, isError, isSuccess, message}= useSelector(state => state.chat) 
    const [load, setLoad] = useState(false)
    const { user } = useSelector(state => state.user)
    console.log(user)
    const dispatch = useDispatch()
    console.log(display)

    const getChats = async() => {
        try {
            setLoad(true)
            const { data } = await axios.get('https://chat-app-api-vzj2.onrender.com',{
              withCredentials: true // important to include cookies
            } )
            console.log(data)
            dispatch(chats(data.getChat))
            setLoad(false)
            // console.log(chat)
           console.log(data.getChat)
          chat ? console.log(chat) : console.log('empty')

            
           
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getChats();
    },[ dispatch, chat.latestMessage])
    console.log(chat)
  return (
    <div className={`m-2 h-full ${display ? 'w-full' : 'hidden'}  md:block md:w-4/12  }`}>
        <h1>CHATS</h1>
        <div key={1} className='max-h-[calc(93vh-100px)] overflow-y-auto'>
           {load ? <SpinnerComponent /> :
            chat?.map(ch => (ch ? <ChatAvatarComponent key={chat._id} chat={ch} display={display} setDisplay={setDisplay}  /> : null ))
           }
           {/* {chat?.map(chat => <h1 key={chat._id}>{chat.latestMessage ? chat.latestMessage.message : null}</h1>)} */}
            {console.log(chat)}
            {console.log(chat.map(ch => ch.latestMessage && ch.latestMessage))}
        </div>
        

    </div>
  )
}

export default ChatComponent