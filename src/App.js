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
  render() {
    return(
      <tr>
        <td></td>
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
    
    if (1) {
    // if (users === null) {
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
    // const isLoaded = this.state.isLoaded;
    const { error, isLoaded } = this.state;
    const rows = [];
    // console.log("in render, uuusers:", this.state.uuusers);
      this.state.uuusers.forEach((usr) => {
        rows.push(
          <TableRow
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
        <UserList/>
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

  handleAdd(selectedButton) {
    this.props.onButtonClick('add');
  }

  handleEdit(selectedButton) {
    this.props.onButtonClick('edit');
  }

  handleRemove(selectedButton) {
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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     shit: null
  //   }
  // }

  // handleClick(selectedButton) {
  //   this.props.onButtonClick(selectedButton);
  // }

  render(){
    const selectedButton = this.props.buttonClicked;
    // const tRows = this.props.users;
    // let tRow = tRows.map(home => <div>{home.name}</div>);
    if(selectedButton === "add") {
      return (
        <div>
          <form className="HiddenForms" id="add">
            <fieldset>
              <legend>Add Member</legend>
              Name:<br />
              <input className="memberName" type="text" name="name" />
              <br />
              Job:<br />
              <input className="memberJob" type="text" name="job" />
              <br /><br />
              <button type="button" className="btn submit"
               onclick="handleClick('submit'); return false;">Submit</button>
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
                    <input className="memberName" type="text" name="name"></input>
                    <br/>
                    Job:<br/>
                    <input className="memberJob" type="text" name="job"></input>
                    <br/><br/>
                    <button type="button" className="btn warning"
                     onclick="editMember(); return false;">Change!</button>
                </p>
                <p className="messages">User has been edited successfully!</p>
            </fieldset>
          </form>
        </div>
      );
    }

    if(selectedButton == "remove") {
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
                   onclick="removeMember(); return false;">Remove!</button>
              </p>
              <p class="messages">User has been deleted successfully!</p>
            </fieldset>
          </form>
        </div>
      );
    }

    return (
        <div>
          Shhhhhhit
        </div>
      );
    }
}

class Content extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      buttonClicked: "",
    }
  }

  handleClick(selectedButton) {
    this.setState ({
      buttonClicked: selectedButton
    });
  }

  render() {
    return (
      <div className="Content">
        <Table />
        <AddEditRemove onButtonClick={this.handleClick}/>
        <Forms buttonClicked={this.state.buttonClicked}/>
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
