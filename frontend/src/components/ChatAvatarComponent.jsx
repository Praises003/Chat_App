import React from 'react'
import getSender from '../utils/getSender'
import { useSelector, useDispatch } from 'react-redux'
import { singleChats } from '../slices/singleChatSlice'
import formatMessageTimestamp from '../utils/timeUtil'

const ChatAvatarComponent = ({chat, display, setDisplay}) => {
const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.user)
const {singleChat} = useSelector(state => state.singleChat)
console.log(singleChat)

const dispatch = useDispatch()

console.log(chat)

// console.log(display)
// console.log(setDisplay)
  return (
    <div className="w-full">
      
    <div className={`flex  mb-3 p-1.5 ${singleChat._id === chat._id ? "border rounded" : ""}`} style={{backgroundColor: `${singleChat._id === chat._id ? "#EBEBEB" : "#fff"}`}}  onClick={() => {dispatch(singleChats(chat)); setDisplay(!display); }}>
       <img src=
        {!chat.groupChat ? chat?.users[1]?.picture : chat?.groupAdmin?.picture} className='rounded-full w-16 h-16 object-cover mr-4 mb-3'  />
        <div className='flex basis-full justify-between'>
        
          <div className='flex   flex-col justify-around -mt-3'>
          
            <h1>{!chat.groupChat ? getSender(user, chat?.users) : chat?.chatName}</h1>
           {!chat.latestMessage ? <h1></h1> : <p className='-mt-4'> <b>{(chat.latestMessage ? chat.latestMessage : null) ? (chat.latestMessage ? chat.latestMessage.sender.name : null) : null}:</b>
            {(chat.latestMessage ? chat.latestMessage?.message.length : null) > 40 ? (chat.latestMessage ? chat?.latestMessage?.message : null).substring(0, 15) + "..." : (chat.latestMessage ?  chat?.latestMessage?.message : null) } </p>}
            {chat.latestMessage && console.log(chat?.latestMessage.message.length)}
          </div>
          {/* <h1 className=''>{new Date(chat.createdAt).toLocaleString('en-Us', { hour: 'numeric', minute: 'numeric' })}</h1> */}
          <p className="text-sm">{formatMessageTimestamp(chat?.createdAt)}</p>
  </div> 
  
      
       
       
     
    </div> 
    </div>
  )
}

export default ChatAvatarComponent