import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chats } from '../slices/chatSlice'
import axios from 'axios'
const ChatComponent = () => {
    const {chat, isLoading, isError, isSuccess, message}= useSelector(state => state.chat) 
    const dispatch = useDispatch()

    const getChats = async() => {
        try {
            const {data} = await axios.get('/api/chat')
           if(data) dispatch(chats(data.getChat))
           console.log(data.getChat)
            return console.log(chat)
            
           
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getChats();
        return ()=>{}
    },[ dispatch])
  return (
    <div>
        <h1>CHATS</h1>
        <div>
            {chat?.map(ch => <div>
                <h1>{ch.chatName}</h1>
                <h1><b>{ch.latestMessage.sender.name}:</b>{ch.latestMessage.content}</h1>
            </div>)}
        </div>
        {console.log(chat)}

    </div>
  )
}

export default ChatComponent