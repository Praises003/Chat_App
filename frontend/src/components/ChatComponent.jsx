import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chats } from '../slices/chatSlice'
import axios from 'axios'
import getSender from '../utils/getSender'
import { RealUtil } from '../utils/RealUtil'
import ChatAvatarComponent from './ChatAvatarComponent'
const ChatComponent = ({display, setDisplay, refresh}) => {
    const {chat, isLoading, isError, isSuccess, message}= useSelector(state => state.chat) 
    const { user } = useSelector(state => state.user)
    console.log(user)
    const dispatch = useDispatch()
    console.log(display)

    const getChats = async() => {
        try {
            const { data } = await axios.get('/api/chat')
            console.log(data)
            dispatch(chats(data.getChat))
            console.log(chat)
           console.log(data.getChat)
          chat ? console.log(chat) : console.log('empty')
            
           
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getChats();
    },[refresh, dispatch])
  return (
    <div className={`m-2 ${display ? 'w-full' : 'hidden'}  md:block md:w-4/12 }`}>
        <h1>CHATS</h1>
        <div>
           {isLoading ? <h1>Loading</h1> :
            chat?.map(chat => (chat ? <ChatAvatarComponent key={chat._id} chat={chat} display={display} setDisplay={setDisplay}  /> : null ))
           }
           {/* {chat?.map(chat => <h1 key={chat._id}>{chat.latestMessage ? chat.latestMessage.message : null}</h1>)} */}
            {console.log(chat)}
            {console.log(chat.map(ch => ch.latestMessage && ch.latestMessage))}
        </div>
        

    </div>
  )
}

export default ChatComponent