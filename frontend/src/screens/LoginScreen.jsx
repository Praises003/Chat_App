import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import {Link} from "react-router-dom"
import chatLogoo from "../assets/chat_logo4.png"
import { login } from '../slices/userSlice'
import { useSelector, useDispatch } from 'react-redux'


const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email:"",
    password: ""
   
  })
  const [show, setShow] = useState(false)
  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
  
    if(user) {
      navigate("/chat")
    }
  
  },[user, dispatch, navigate])
  
  const { email, password } = formData
  const onChangeFunc = (e) => {
    setFormData(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    let userData = { email, password}
    if (!userData) {
     return toast.error("Please Fill out All Fields") 
    }
    dispatch(login(userData))
    
  }
  console.log(formData)
     return (
      <>
        <div className="bg-gray-50 w-96  mx-auto mt-6 p-5">
          <img className=' w-40 mx-auto' src={chatLogoo} alt="" />
          <h1 style={{color: "#05E28D"}} className=' font-bold text-4xl text-center mb-6'>WhatsUp</h1>
          <p className='text-center font-medium text-lg md:text-xl mb-4'>Sign in to your account</p>
          <form onSubmit={onSubmit}>
           
  
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
  
            
          </form>
          <button onClick={onSubmit}  style={{backgroundColor: "#10C17D"}} className={ email  && password ? 'w-full block text-center py-2 text-white rounded-2xl text-lg' : "w-full block text-center py-2 text-white rounded-2xl text-lg opacity-40 cursor-not-allowed"}>Sign In</button>
        
          <div className={email  && password ? "hidden": 'mt-2 bg-white text-sm font-bold text-red-600'}>Fill Up All Fields To Sign In</div>
  
          <div className='mt-5 flex justify-around mb-5'>
            <p className='text-gray-600'>Don't have an account?</p>
            <Link to={"/register"} style={{color: "#10C17D"}} className='font-bold'>Sign Up</Link>
          </div>
        </div>    
      
      </>
    )
}

export default LoginScreen