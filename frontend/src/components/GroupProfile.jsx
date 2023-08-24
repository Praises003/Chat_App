import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
const GroupProfile = (props) => {
    const {singleChat, isLoading, isError, isSuccess, message}= useSelector(state => state.singleChat)
    
    console.log(singleChat)
    useEffect(() => {
      // const {singleChat, isLoading, isError, isSuccess, message}= useSelector(state => state.singleChat)
    },[singleChat])

  return (
    <div>
      {/*icon and profile */}
        <div className="">
         {/* {!singleChat.groupChat ? <h1>it is false</h1> : <h1>it is true</h1>}
        </div> */}
        {!singleChat.groupChat ? (
          <div>
            <img className="rounded-full w-40 h-40 mx-auto object-cover " src={singleChat.users[1].picture} alt="" />
            <h1>Name: {singleChat.users[1].name}</h1>
            <h1>Email: {singleChat.users[1].email}</h1>
          </div>
        ) : (
          <div>dd</div>
        )}
      </div>
    </div>
  )
}

export default GroupProfile