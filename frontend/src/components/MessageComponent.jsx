import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import formatMessageTimestamp from '../utils/timeUtil';

const MessageComponent = ({ msg }) => {
  const { user } = useSelector(state => state.user)
  return (
    <div className={`flex ${user._id === msg?.sender._id ? "justify-end" : "justify-start"} `}>
        <div className={` ${user._id === msg?.sender._id ? "bg-green-300" : "bg-gray-400"}  mb-3 w-auto max-w-lg border rounded p-3 1`}>
          <div className="flex  justify-between items-end">
            <div className="break-all">
            <h1 className={`${!msg.message ? "" : ""}`}>{msg.message}</h1>
            </div>
            
            <p className="text-xs ml-7 ">{formatMessageTimestamp(msg.createdAt)}</p>

          </div>
            </div>
    </div>
    
  )
}

export default MessageComponent