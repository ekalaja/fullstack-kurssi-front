import React from 'react'
import { connect } from 'react-redux'



const UserList = (props) => {

  if (props.users === undefined) {
    return null
  }
  return (
    <div>
      <h2>users</h2>
      <table>
        <tbody>
        <tr>
          <th> </th>
          <th>blogs added</th>
        </tr>{props.users.map(user =>
          <tr key={user.id}>
            <td><a href={`/users/${user.id}`}>{user.name}</a></td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>)
}

const mapStateToProps =  (state) => {
  return {
    users: state.users
  }
}


export default connect(
  mapStateToProps,
  null
)(UserList)