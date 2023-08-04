import React from 'react'

const AvatarComponent = ({res, onFunction, unClick}) => {
  return (
    <div style={{ backgroundColor: "#E8E8E8"}}className='flex mb-3 justify-between  w-72 border rounded-lg p-2.5 ml-2' onClick={() => onFunction(res._id)} >
      <img className="rounded-full w-12 h-12 object-cover" src={res.picture} />
      <div className="">
        <p>{res.name}</p>
        <p className='break-normal'>{res.email}</p>
      </div>
    </div>
  )
}

export default AvatarComponent