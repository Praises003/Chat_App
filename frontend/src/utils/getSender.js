import React from 'react'

const getSender = (user, users) => {
  console.log(user, users)
  if(!user || users) return console.log("no user chosen")
  return user._id === users[0]._id ? users[1].name: users[0].name
}

export default getSender