import React from 'react'
import {FaTimes} from "react-icons/fa"

const MemberBadge = ({user, onFunction}) => {
  return (
    <div style={{ backgroundColor: "#05E28D"}}className='mb-3  inline-block border rounded-lg px-2 py-1 ml-2' onClick={onFunction} >
     
      <div className="flex justify-center align-middle items-center">
        <p className='text-white'>{user.name}</p>
        <FaTimes color='#FFF' size={16} onClick={onFunction} />
        
      </div>
    </div>
  )
}

export default MemberBadge