import React from 'react'

export const  RealUtil = ({user, users}) => {
  return (
    <div>
      {user._id === users[0]._id ? (<h1>{users[0].name}</h1>): (<h1>{users[1].name}</h1>)}
    </div>
  )
}

