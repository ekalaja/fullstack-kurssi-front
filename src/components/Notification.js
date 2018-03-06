import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    if (this.props.notification.length < 1) {
      return null
    }
    return (
      <div className="error" style={{color: 'Green', border: '5px solid green', padding: '5px'}}>
        {this.props.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps,
  null
)(Notification)
export default ConnectedNotification


/*import React from 'react'

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

export default Notification*/