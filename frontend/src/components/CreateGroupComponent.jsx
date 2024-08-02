import React, { useEffect } from 'react'
import chatLogoo from "../assets/chat_logo4.png"
import { useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { chats } from '../slices/chatSlice'
import axios from 'axios'
import MemberBadge from './MemberBadge'
import AvatarComponent from './AvatarComponent'
import { Link, useNavigate } from 'react-router-dom'

const CreateGroupComponent = () => {
    const [groupName, setGroupName] = useState("")
    const [selectedMembers, setSelectedMembers] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {chat, isLoading, isError, isSuccess, message} = useSelector(state => state.chat)
    const {singleChat,} = useSelector(state => state.singleChat)
    console.log(singleChat)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submit")
        if(!groupName || !selectedMembers) return console.log("cant submit")

        try {
            const { data } = await axios.post(`https://chat-app-api-vzj2.onrender.com/api/chat/group`, {
                name: groupName,
                users: JSON.stringify(selectedMembers.map(member => member._id))
            }, {
              withCredentials: true // important to include cookies
            })

            console.log(data)
            dispatch(chats([data, ...chat]))
            console.log(chat)
            navigate("/chat")
            
        } catch (error) {
            
        }
    }

    // const onSearch =  (e) => {
    //     const s = setSearch(e.target.value); 
    //     // if (!s) {
    //     //     console.log("not input")
    //     //     return
    //     // }

    //      try {
    //     //     const { data } = await axios.get(`/api/user?search=${s}`)
    //     //     console.log(data)  
    //         console.log(search)
    //     } catch (error) {
            
    //     }
    // }

    // const func = async (inp) =>{
     
    //     await inp
    //     setSearch(inp)
    //     console.log(search)

    //     // setSearch(prevSearch => {} )
        
    //     console.log(search)
    //     if(!inp) return console.log('not input')
    //     console.log(inp)
    //     const { data } = await axios.get(`api/user?search=${search}`)
    //     console.log(data)
    //     setSearchResult(data.users)
    //     //console.log(searchResult.users)
    // }

    useEffect(() => {
        const func = async () =>{
     
            console.log(search)
    
            // setSearch(prevSearch => {} )
            
            console.log(search)
            // if(!inp) return console.log('not input')
            // console.log(inp)
            const { data } = await axios.get(`https://chat-app-api-vzj2.onrender.com/api/user?search=${search === "" ? null : search}`, {
              withCredentials: true // important to include cookies
            })
            console.log(data)
            setSearchResult(data.users)
            console.log(searchResult)
        }
        func()
    },[search])
    
    // useEffect(() => {
        
    // const func = async (inp) =>{
    //     // setSearch(prevSearch => {} )
        
    //     console.log(search)
    //     if(!inp) return console.log('not input')
    //     console.log(inp)
    //     const { data } = await axios.get(`api/user?search=${search}`)
    //     console.log(data)
    //     setSearchResult(data.users)
    //     //console.log(searchResult.users)
    // }
    //     func()
    // }, [search])
    const onGroup = (membersToAdd) => {
        if(selectedMembers.includes(membersToAdd)){ return console.log("user exist")}
      console.log(membersToAdd)
      console.log(selectedMembers)
        setSelectedMembers([...selectedMembers, membersToAdd])
    }

    const onDelete = (delMember) => {
        setSelectedMembers(selectedMembers.filter(sel => sel._id !== delMember._id))
    }
console.log(search)
  return (
    <div style={{backgroundColor: "#F6F7FB"}} className='w-full h-full py-5'>
        <div className="">
            <img className=' w-24 mx-auto mb-10' src={chatLogoo} alt="" />
            
        </div>
        
       
        <div style={{backgroundColor: "#FFFFFF"}} className="w-10/12 md:w-7/12 border rounded mx-auto h-full p-4 shadow" >
            <h1 className="w-1/2 mt-5 mx-auto text-2xl mb-6">Create A Group</h1>
            <form onSubmit={handleSubmit} >
            <div className=''>
          {/*  */}
          <input className=" mx-auto bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-3.5 mb-6" type="text" placeholder='Group Name' name='name' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
          </div>

          <div>
      
          <input className="bg-gray-50  mx-auto border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-3.5 mb-6" type="text"  placeholder='Add Group Members' name='' value={search} onChange={(e) =>{ 
            // const val = e.target.value
            setSearch(e.target.value)}} />
          </div>
          
            {selectedMembers.map(res => <MemberBadge key={res._id} user={res} onFunction = {() => onDelete(res)} />)}
            {console.log(selectedMembers)}
          
          {searchResult.map(user => (<AvatarComponent key={user._id} res={user}onFunction={() => onGroup(user)}  />))}

          <div>
      
      {/* <input className="bg-gray-50  mx-auto border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-3.5 mb-3" type="submit"   name='submit' /> */}
      </div>

          <div className="">
            
            <button  style={{backgroundColor: "#05E28D"}} className=" mx-auto border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-3.5 mb-3 text-center">Create Group</button>
          </div>
            </form>
            

        </div>
    </div>
  )
}

export default CreateGroupComponent