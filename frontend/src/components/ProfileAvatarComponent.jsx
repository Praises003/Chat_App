import React from 'react'
import { useDispatch, useSelector } from 'react-redux';


const ProfileAvatarComponent = ({users, handleRemove}) => {
    const {user }= useSelector(state => state.user)
    
  return (
    <div className="">
        <div style={{}} className='flex   border rounded md:rounded-none md:border bor border-gray-100  p-2.5 ml-2 ' >
            <img className="rounded-full w-12 h-12 object-cover " src={users.picture} />
            <div className="ml-2 w-full flex justify-between md:justify-start pt-1.5 items-start">
                <div className="">
                    <p>{users.name}</p>
                    <p className='break-normal'>{users.email}</p>
                </div>
                <p style={{backgroundColor: '#E4F5F2', color: "#05E28D" }} className={`${user._id === users?._id ? "block" : "hidden"} text-sm border rounded`}>Group Admin</p>
                
                    
                    
                
                    
            
            
            
            </div>
            
         </div>
         <button className='bg-red-600 text-sm border rounded p-1 ml-2 mt-0.5 mb-3 text-white' onClick={handleRemove}>Remove</button>

        

    </div>
    
  )
}

export default ProfileAvatarComponent