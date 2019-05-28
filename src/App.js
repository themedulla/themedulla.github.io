import React, { Component } from 'react';
import './App.css';
import './loading-spinner.css';
// import './user.js';

class LoadingSpinner extends Component {
  render() {
    return (
      <tr id="loading">
        <td></td>
        <td className="Spinner"><div className="bounce1"></div></td>
        <td className="Spinner"><div className="bounce2"></div></td>
        <td className="Spinner"><div className="bounce3"></div></td>
      </tr>
    );
  }
}

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.onSelectedUserChange = this.onSelectedUserChange.bind(this);
  }

  onSelectedUserChange(e){
    this.props.onUserIdChange(e.target.value);
  }

  render() {
    return(
      <tr>
        <td style={{visibility:
         this.props.buttonClicked === 'remove' || this.props.buttonClicked === 'edit' ?
         'visible' : 'hidden' }}>
           <input onClick={this.onSelectedUserChange} type='radio'
           name='choose' value={this.props.id} />
        </td>
        <td>{this.props.id}</td>
        <td>{this.props.name} {this.props.last_name}</td>
        <td><img src={this.props.avatar} alt="avatar" /></td>
      </tr>
    );
  }
}

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      uuusers: []
    }
  }

  componentDidMount() {
    let users = localStorage.getItem('user-list');
    const that = this;
    
    // if (1) {
    if (users === null) {
      fetch('https://reqres.in/api/users?page=2')
        .then(function(response) {
            return response.json();
          })
        .then(function(response) {
            users = response.data;
            localStorage.setItem('user-list', JSON.stringify(users));
            
            that.setState({
              uuusers: users,
              isLoaded: true,
            });
          })
        .catch(function(response) {
            document.getElementsByClassName('.Content').html(
              '<div class="error">Error fetching data</div>'
            );
            console.log('Error: ' + response.statusText);
            that.setState({
              isLoaded: true,
              error: response
            });
          });
    } else {
        console.log("the users were already stored in the localStorage!")
        console.log("So let's launch them from there!")

        users = JSON.parse(users);
        that.setState({
          isLoaded: true,
          uuusers: users
        });
    }
  }

  componentWillUnmount() {
  }

  render(){
    const { error, isLoaded } = this.state;
    const rows = [];
    this.state.uuusers.forEach((usr) => {
      rows.push(
        <TableRow 
          buttonClicked = {this.props.buttonClicked}
          onUserIdChange = {this.props.onUserIdChange}
          id={usr.id}
          name={usr.first_name}
          last_name={usr.last_name}
          avatar={usr.avatar}
        />
      );
    });

    if(!isLoaded){
      return (
        <tbody>
          <LoadingSpinner />
        </tbody>
      );
    }

    if(error){
      return (
        <p className="Error"> Error:{error}</p>
      );
    }

    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
}

class Table extends Component {
  render() {
    return (
      <div className="Table" id="user-list">
        <thead>
            <th></th> <th>id</th> <th>name</th> <th>avatar</th>
        </thead>
        <UserList onUserIdChange={this.props.onUserIdChange} buttonClicked={this.props.buttonClicked} />
      </div>
    );
  }
}

class AddEditRemove extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd() {
    this.props.onButtonClick('add');
  }

  handleEdit() {
    this.props.onButtonClick('edit');
  }

  handleRemove() {
    this.props.onButtonClick('remove');
  }

  render() {
    return (
      <div className="AddEditRemove">
        <hr/>
          <button onClick={this.handleAdd} className="Select">Add</button>
          <button onClick={this.handleEdit} className="Select">Edit</button>
          <button onClick={this.handleRemove} className="Select">Remove</button>
        <hr/>
      </div>
    );
  }
}

class Forms extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirmAdd = this.handleConfirmAdd.bind(this);
    this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
    this.handleConfirmRemove = this.handleConfirmRemove.bind(this);
    this.state = {
      value: '',
      userId: ''
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleConfirmAdd() {
    this.props.onConfirm(this.state.value, '');
  }

  handleConfirmEdit() {
    this.props.onConfirm(this.state.value, this.state.userId);
  }

  handleConfirmRemove() {
    this.props.onConfirm('', this.state.userId);
  }
  render(){
    const selectedButton = this.props.buttonClicked;

    if(selectedButton === "add") {
      return (
        <div>
          <form className="HiddenForms" id="add">
            <fieldset>
              <legend>Add Member</legend>
              Name:<br />
              <input className="memberName" type="text" name="name"
               onChange={this.handleChange} />
              <br />
              Job:<br />
              <input className="memberJob" type="text" name="job" />
              <br /><br />
              <button type="button" className="btn submit"
               onClick={this.handleConfirmAdd}>Submit</button>
            </fieldset>
          </form>
        </div>
      );
    }

    if(selectedButton === "edit") {
      return (
        <div>
          <form className="HiddenForms" id="edit">
            <fieldset>
              <legend>Edit Member</legend>
                <p className="beforeHint">Please select a user to edit.</p>
                <p className="afterHint">
                    Change it's info to: <br/><br/>

                    Name:<br/>
                    <input className="memberName" type="text" name="name"
                     onChange={this.handleChange} />
                    <br/>
                    Job:<br/>
                    <input className="memberJob" type="text" name="job" />
                    <br/><br/>
                    <button type="button" className="btn warning"
                     onClick={this.handleConfirmEdit}>Change!</button>
                </p>
                <p className="messages">User has been edited successfully!</p>
            </fieldset>
          </form>
        </div>
      );
    }

    if(selectedButton === "remove") {
      return(
        <div>
          <form class="HiddenForms" id="remove" action="">
            <fieldset>
              <legend>Remove Member</legend>

              <p class="beforeHint">Please select the user you want to remove.</p>
              <p class="afterHint">
                  Are you sure you want to permanently delete user '<span></span>'?
                  <br/><br/>
                  <button type="button" class="btn danger"
                   onClick={this.handleConfirmRemove}>Remove!</button>
              </p>
              <p class="messages">User has been deleted successfully!</p>
            </fieldset>
          </form>
        </div>
      );
    }

    return (
        <div></div>
      );
    }
}

class Content extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleUserId = this.handleUserId.bind(this);
    this.state = {
      buttonClicked: '',
      name: '',
      confirmed: false,
      userId: ''
    }
  }

  handleClick(selectedButton) {
    this.setState ({
      buttonClicked: selectedButton,
      name: '',
      confirmed: false,
      userId: ''
    });
  }

  handleConfirm(value, userId) {
    this.setState ({
      name: value,
      confirmed: true,
      userId: userId
    });
    console.log("handleConfirm: button:", this.state.buttonClicked ," value :", value)
  }

  handleUserId(selectedUser) {
    this.setState ({
      userId: selectedUser
    })
    console.log("userId :", selectedUser)
  }

  render() {
    return (
      <div className="Content">
        <Table onUserIdChange={this.handleUserId} buttonClicked={this.state.buttonClicked}/>
        <AddEditRemove onButtonClick={this.handleClick}/>
        <Forms buttonClicked={this.state.buttonClicked} onConfirm={this.handleConfirm}/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Content />
        </header>
      </div>
    );
  }
}

export default App;
