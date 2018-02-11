import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  if (type === 'error') {
    return (
      <div className="error" style={{color: 'Red', border: '5px solid red', padding: '5px'}}>
        {message}
      </div>
    )
  } else {
    return (
      <div className="error" style={{color: 'Green', border: '5px solid green', padding: '5px'}}>
        {message}
      </div>
    )
  }

}

export default Notification