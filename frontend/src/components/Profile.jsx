import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaEllipsisV } from 'react-icons/fa'
import { BiDoorOpen } from 'react-icons/bi';
import {FaTimes} from "react-icons/fa"
import axios from 'axios';
import { singleChats } from '../slices/singleChatSlice'
import AvatarComponent from './AvatarComponent';
import ProfileAvatarComponent from './ProfileAvatarComponent';


const GroupProfile = (props) => {
  const [show, setShow]= useState(false)
  const [profileInput, setProfileInput] = useState("")
  const [groupName, setGroupName] = useState("")
    const [selectedMembers, setSelectedMembers] = useState([])
    const [search, setSearch] = useState("")
    const [editGroup, setEditGroup] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const {singleChat, isLoading, isError, isSuccess, message}= useSelector(state => state.singleChat)
    const {chat, }= useSelector(state => state.chat) 
    const {user }= useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    console.log(singleChat)
    console.log(chat)
    console.log(groupName)
    console.log(user)
    console.log(singleChat)
    const handleEditName = async () => {
        if(!groupName) return console.log("empty")
      // const { d } = await axios.get(`api/user?search=${search === "" ? null : search}`)
      try {
        const { data } = await axios.put(`https://chat-backend-pi-one.vercel.app/api/chat/rename`, {
          chatId: singleChat._id,
          chatName: groupName
        })
       console.log(data)
       dispatch(singleChats(data))
      
      setGroupName("")
        
      } catch (error) {
       console.log(error) 
      }

     
      
      
    }

    // useEffect(() => {

    //   handleEditName()
    // },[groupName, dispatch, singleChat])
    
    useEffect(() => {
      // const {singleChat, isLoading, isError, isSuccess, message}= useSelector(state => state.singleChat)
     const searchUser = async () =>{
     
      console.log(search)

      // setSearch(prevSearch => {} )
      
      console.log(search)
      // if(!inp) return console.log('not input')
      // console.log(inp)
      const { data } = await axios.get(`https://chat-backend-pi-one.vercel.app/api/user?search=${search === "" ? null : search}`)
      console.log(data)
      setSearchResult(data.users)
      console.log(searchResult)
  }
      searchUser()
    },[search])

    const onAddUsers = async(otherUser) => {
      if (singleChat?.users.find(u => u._id === otherUser._id)) {
        return console.log("User Already Exist")
      }

      if (singleChat.groupAdmin._id !== user._id) {
        return console.log("only admins can add someone")
      }

      try {
        {/*Loading */}
        const { data } = await axios.put(`https://chat-backend-pi-one.vercel.app/api/chat/groupadd`, {
          chatId: singleChat._id,
          userId: otherUser._id
        })
        console.log(data)
        dispatch(singleChats(data))
      } catch (error) {
        console.log(error)
      }
      setGroupName("")
    }

    const onRemove = async (otherUser) => {
      if(singleChat?.groupAdmin._id !== user._id && otherUser !== user._id) {
        return console.log("only admins can remove members")
      }

      try {
        const { data } = await axios.put(`https://chat-backend-pi-one.vercel.app/api/chat/groupremove`, {
          chatId: singleChat._id,
          userId: otherUser._id
        })
        console.log(data)
        otherUser._id === user._id ? dispatch(singleChats("")) : dispatch(singleChats(data))
      } catch (error) {
        console.log(error)
      }
      setGroupName("")
    }

   return (
    <div className='px-3 py-5 relative'>
      {/*icon and profile */}
      <div className="flex justify-between md:justify-around mb-3 ">
      <IoMdArrowRoundBack className='block' onClick={() =>{navigate("/chat")}} color='#05E28D' size={24} />
      <h1 className='text-xl font-bold'>Profile</h1>
      {singleChat.groupChat && <FaEllipsisV onClick={() => setShow(!show)} />}
      

      </div>
     {show && <button onClick={() => setEditGroup(!editGroup)} style={{backgroundColor: '#E4F5F2' }} className={`block py-2 px-3   border rounded-lg absolute right-1.5 md:right-24`}>Edit Group</button>}
      { editGroup && <div className="bg-gray-300 px-5 pb-3 pt-10 w-10/12 md:w-1/2 mx-auto mt-20 relative ">
        <FaTimes onClick={() => {setEditGroup(false); setShow(false)}} className='absolute top-0 mb-3' color='red' size={25} />
      <div className=''>
        {/*  */}

        <input className=" mx-auto bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-3.5 mb-6" type="text" placeholder='Edit Group Name' name='name' value={groupName} onChange={(e) => {setGroupName(e.target.value)}} />
        </div>
        <div className=''>
        {/*  */}
        <input className=" mx-auto bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-3.5 mb-6" type="text" placeholder='Add Users' name='name' value={search} onChange={(e) => setSearch(e.target.value)}  />
        {/* {* Loading ? ("") : (console.log(searchResult))} */}
        {searchResult.map(res => <AvatarComponent key={res._id} res={res} onFunction={() => {onAddUsers(res)}} />)}
        </div>
      <button onClick={handleEditName} style={{backgroundColor: "#05E28D"}} className="border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 mb-3 text-center">Update</button>
    </div>}
        <div className="mt-20 ml-10 md:ml-14">
         {!singleChat.groupChat ? <h1>it is false</h1> : <h1>it is true</h1>}
        </div>
        {console.log(singleChat)}
         {!singleChat.groupChat ? (
          <div className='w-1/2 h-1/2 mx-auto md:w-1/4'>
            <img className="rounded-full w-40 h-40  object-cover mb-3" src={singleChat?.users[1]?.picture} alt="" />
            <h1 className='text-black font-bold text-lg'>Name: {singleChat.users[1].name}</h1>
            <h1 className='text-black font-bold text-lg'>Email: {singleChat.users[1].email}</h1>
          </div>
        ) : (
          <div>
          <div className=' w-1/2 h-1/2 mx-auto md:w-1/4'>
            <img className='rounded-full w-40 h-40 object-cover mb-3' src={singleChat?.groupAdmin?.picture} alt="group_picture" />
            <h1 className='text-black font-bold text-lg'>Name: {singleChat.chatName}</h1>
            <h1 className='text-black font-medium text-base'>{singleChat?.users.length} Group Members</h1>
            {/* <div> */}
              {/* <img className="rounded-full w-12 h-12 object-cover " src={singleChat.userspicture} />
              <div className="ml-2">
                <p>{res.name}</p>
                <p className='break-normal'>{res.email}</p> */}
             {/* </div> */}
           

          </div>
          {singleChat?.users.map(user => <ProfileAvatarComponent users={user} key={user.email} handleRemove={() => {onRemove(user)}} />)}

          <div className="ml-2 flex justify-normal items-center" onClick={() => {onRemove(user); navigate("/chat")}}>
          <BiDoorOpen color='red' size={24}/>
          <p style={{color: "red"}} className='text-sm pl-7  font-bold'>Exit Group</p>
          </div>
          
        </div>
        )} 
      
    </div>
  )
}

export default GroupProfile