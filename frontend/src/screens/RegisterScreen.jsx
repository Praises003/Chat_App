import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import {toast} from "react-toastify"
import {Link, useNavigate} from "react-router-dom"
import chatLogoo from "../assets/chat_logo4.png"
import axios from "axios"

//import {register, reset} from "../slices/userSlice"
import { register, reset } from '../slices/userSlice'

const RegisterScreen = () => {
const [formData, setFormData] = useState({
  name:"",
  email:"",
  password: "",
})

const [pic, setPic] = useState("")
const [uploadPic, setUploadPic] = useState("")

const [show, setShow] = useState(false)
const dispatch = useDispatch()
const navigate = useNavigate()
const {name, email, password,} = formData
const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.user)

useEffect(() => {
  if(isError) {
    toast.error(message)
  }

  if(user) {
    navigate("/start")
  }

},[user, navigate, dispatch])
  

const onChangeFunc = (e) => {
  setFormData(prevState => ({
    ...prevState, [e.target.name]: e.target.value
  }))
}


const pictureFunc = (e) => {
  setPic(e.target.files[0])
}
const onSubmit = async(e) => {
  e.preventDefault()
  let userData
  if(!name && !email && !password && !pic) {
    toast.error("Please Fill out All Fields")
  } 
 
  const url = await postPic()
  userData = {name, email, password, picture: url}
  console.log(url)

   dispatch(register(userData)) 
  console.log("picture empty")
  
console.log("subnit")
}

const postPic = async() => {
  const formD = new FormData()
  formD.append("file", pic)
  formD.append("cloud_name", "dmhylxogr")
  try {
    const { data } = await axios.post("https://chat-app-backned.onrender.com/api/upload", formD)
  console.log(data)
  //setUploadPic(data)
  return data.url
  } catch (error) {
    console.error(error)
  }
  

//console.log(uploadPic)







  

}
   return (
    <>
      <div className="bg-gray-50 w-96  mx-auto mt-6 p-5">
        <img className=' w-40 mx-auto' src={chatLogoo} alt="" />
        <h1 style={{color: "#05E28D"}} className=' font-bold text-4xl text-center mb-6'>WhatsUp</h1>
        <p className='text-center font-medium text-lg md:text-xl mb-4'>Sign Up Now</p>
        <form onSubmit={onSubmit}>
          <div>
          <label className="block mb-3" htmlFor="">Name</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3" type="text" placeholder='Name' name='name' value={name} onChange={onChangeFunc} />
          </div>

          <div>
          <label className="block mb-3" htmlFor=''>Email</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3" type="email"  placeholder='Email' name='email' value={email} onChange={onChangeFunc} />
          </div>

          <div>
            <label className="block mb-3" htmlFor="">Password</label>
              <div className='flex justify-between items-center'> 
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"  type={show ? "text" : "password"} placeholder='Password' name='password' value={password} onChange={onChangeFunc} />
                <span  className='inline-block py-1 rounded-md px-1 m-1 text-center bg-gray-300' onClick={() => setShow(!show)}>{show ? "hide" : "show"}</span>
              </div>
          </div>    

          <div>
          <label className="block w-full mb-3" htmlFor="">Picture </label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3" type="file" placeholder='Picture' name='picture' onChange ={pictureFunc}/>
          {console.log(pic)}
          </div>
        </form>
        <button onClick={onSubmit}  style={{backgroundColor: "#10C17D"}} className={name && email  && password ? 'w-full text-center py-2 text-white rounded-2xl text-lg' : "w-full  text-center py-2 text-white rounded-2xl text-lg opacity-40 cursor-not-allowed"}>Sign Up</button>
        <div className={name && email  && password ? "hidden": 'mt-2 bg-white text-sm font-bold text-red-600'}>Fill Up All Fields To Sign Up</div>

        <div className='mt-5 flex justify-around mb-5'>
          <p className='text-gray-600'>Already have an account?</p>
          <Link to={"/login"} style={{color: "#10C17D"}} className='font-bold'>Sign In</Link>
        </div>


      </div>    
    
    </>
  )
}

export default RegisterScreen