import React from 'react';
import User from './User';

export default class Users extends React.PureComponent {

  // shouldComponentUpdate(prevProps) {
  //   console.log('prevProps:', prevProps);
  //   console.log('nextProps:', this.props);
  //   return true;
  // }

  render() {
    const users = this.props.usersList.map((user, i) => {
      return <User key={i} user={user} setUsersList={this.props.setUsersList}/>
    });

    /*if (isEditing) {
      return <AddUserForm.js
    }*/

    return (
      <div className='expenses'>
        {users}
      </div>
    )
  }
}