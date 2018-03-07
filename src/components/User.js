import React from 'react'

const User = (props) => {
  console.log('mapstatesta', props.user)
  if (props.user === undefined) {
    return null
  }
  return (
    <div>
      <h1>User</h1>
      <h2>{props.user.name}</h2>
    </div>)
}

export default User
