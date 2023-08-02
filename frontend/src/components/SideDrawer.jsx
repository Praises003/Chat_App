import React, { useState } from 'react'
import {FaTimes} from "react-icons/fa"
import axios from "axios"

const SideDrawer = ({show, setShow}) => {
  const [loading, setLoading] = useState(false)
  const [resLoad, setResLoad] = useState(false)
  const [input, setInput] = useState("")
  const [inputRes, setInputRes ] = useState([])
    const [drawer, setDrawer] = useState(true)
    console.log(drawer)


  const handleInput = async() => {
    if (!search) return <h1>Please Fill The Input</h1>
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/user?search=${input}`)
      setLoading(false);
      setInputRes(data)
      console.log(data)
      console.log(inputRes)
    } catch(err) {
        console.log(err.message)
    }
  }
    
  
    //const showp = show
  return (
    <>
    { show  || drawer ? (<div className={`my-1 mx-4 h-screen w-3/4 absolute top-0 bg-white shadow transition-transform ${show ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="w-72 absolute top-0 left-0 flex justify-center items-center">
            <input className={` w-full border border-gray-300 text-gray-900 text-md p-2 mb-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  bg-white  `} type="text" placeholder='search for users'value= {input} onChange={(e) => setInput(e.target.value)} />
            <FaTimes color='#05E28D' size={25} onClick={() => setShow(!show)} />
            {console.log(show)}
            {console.log(drawer)}
        </div>

    </div> ) : ""}
    {console.log(inputRes)}
    </>
  )
  
}

export default SideDrawer