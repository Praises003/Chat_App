import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaEllipsisV } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import getSender from '../utils/getSender';
import GroupProfile from './GroupProfile';

const ChatBoxComponent = ({display, setDisplay}) => {
  const { user } = useSelector(state => state.user)
  const {singleChat, isLoading, isError, isSuccess, message}= useSelector(state => state.singleChat) 
  console.log(display)
  console.log(singleChat)
  return (
    <div className={`m-2 ${!display ? 'w-full' : 'hidden'} md:block md:w-7/12`}>ChatBoxComponent
      <div className="w-full h-10 bg-blue-950"></div>
      <div className="flex justify-between">
      <IoMdArrowRoundBack className='block md:hidden' onClick={() => setDisplay(!display)} color='#05E28D' size={24} />
      
      <img src={singleChat ? singleChat.users[1].picture : null} className='rounded-full w-12 h-12 object-cover mr-4 mb-3' alt="singleUser" />
      <h1>{singleChat.users[1].name}</h1>
      <FaEllipsisV />  
      </div>
      {
        singleChat ? (<div>
          <h1>{!singleChat.groupChat ? (getSender(user, singleChat.users)) : (<div>
            {singleChat.chatName.toUpperCase()}
          </div>)}</h1>
        </div>) : (
          <h1>Click on a user to start chatting</h1>
        ) 
      }
     
    </div>
  )
}

export default ChatBoxComponent