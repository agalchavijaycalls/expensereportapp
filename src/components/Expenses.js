import React from 'react';
import Expense from './Expense';
import Filters from './Filters';
import { Redirect } from 'react-router-dom';

export default class Expenses extends React.PureComponent {
  render() {
    const expensesArr = this.props.expenses ? this.props.expenses.map((elem, index) => {
      return <Expense
        key={index}
        setUserDetails={this.props.setUserDetails}
        adminSetUserExpenses={this.props.adminSetUserExpenses}
        _id={elem._id}
        username={this.props.username}
        dateTime={elem.dateTime}
        amount={elem.amount}
        description={elem.description}
        comments={elem.comments}
        selectedUser={this.props.selectedUser}
      />
    }) : [];
    return this.props.isEditing ? <Redirect to='/edit_expense' /> : (
      <div>
        <Filters />
        <div className='expenses'>
          {expensesArr}
        </div>
      </div>
    )
  }
}