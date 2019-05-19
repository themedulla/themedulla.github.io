import React, { Component } from 'react';
import './App.css';
import './user.css';
// import './user.js';
/*
document.addEventListener('DOMContentLoaded', function(){ 
  // your code goes here
  let users = localStorage.getItem('user-list');

  // if (disableLocalStorage || users === null) {
  if (users === null) {
    fetch('https://reqres.in/api/users?page=2')
      .then(function(response) {
          return response.json();
        })
      .then(function(response) {
          users = response.data;
          localStorage.setItem('user-list', JSON.stringify(users));
          fillUsers(users);
        })
      .catch(function(response) {
          document.getElementsByClassName('.Content').html('<div class="error">Error fetching data</div>');
          console.log('Error: ' + response.statusText);
        });
  } else {
      fillUsers(JSON.parse(users));
  }
}, false);
*/

function fillUsers(users){
  // document.getElementById('#loading').remove();

  const tableRow = users.map((user) => 
    <tr>
      <td> first is {user.id} </td>
      <td> second is {user.id} </td>
      <td> third </td>
    </tr>
  );
  
  return (
    {tableRow}
  );
}


class LoadingSpinner extends Component {
  render() {
    return (
      <div id="loading" class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    );
  }
}

class TableRow extends Component {
  render() {
  alert(this.props.id);

    return(
      <tr>
        <td>x</td>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td>{this.props.last_name}</td>
      </tr>
    );
  }
}

class UserList extends Component {
  constructor(props) {
    super(props);
    this.makeUsers=this.makeUsers.bind(this);
    this.state = {
      uuusers: []
      /*
        {
          "id": 13,
          "email": "eve.holt@reqres.in",
          "name": "Abbas",
          "first_name": "Eve",
          "last_name": "Holt",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          "id": 14,
          "email": "charles.morris@reqres.in",
          "name": "Taghi",
          "first_name": "Charles",
          "last_name": "Morris",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
      ] */
    }
  }
  
  makeUsers(users){
    this.setState({uuusers: users});
  }

  componentDidMount() {
    let users = localStorage.getItem('user-list');

    if (1) {
    // if (users === null) {
      fetch('https://reqres.in/api/users?page=2')
        .then(function(response) {
            return response.json();
          })
        .then(function(response) {
            users = response.data;
            localStorage.setItem('user-list', JSON.stringify(users));
            fillUsers(users);
            this.makeUsers(users);
            console.log("2users are:", users);
          })
        .catch(function(response) {
            document.getElementsByClassName('.Content').html('<div class="error">Error fetching data</div>');
            console.log('Error: ' + response.statusText);
          });
    } else {
        fillUsers(JSON.parse(users));
        console.log("it was full!")
        console.log("3users are:", users);
    }
  }

  render(){
    const rows = [];
    this.state.uuusers.forEach((user) => {
      rows.push(
        <TableRow
          id={user.id}
          name={user.name}
          last_name={user.last_name}          
        />
      );
    });

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
  render() {
    return (
      <div className="">
        <hr/>
          <button className="Select">Add</button>
          <button className="Select">Edit</button>
          <button className="Select">Remove</button>
        <hr/>
      </div>
    );
  }
}



class XXX extends Component {
  render(){
    const tRows = this.props.users;
    // let tRow = tRows.map(home => <div>{home.name}</div>);
    return (
      <div>
        {tRows.map(home => <div>{home.id}</div>)}
      </div>
    );
  }

}

class Content extends Component {
  render() {
    return (
      <div className="Content">
        <Table users={this.props.users}/>
        <AddEditRemove/>
        <XXX users={this.props.users}/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Content users={US}/>
        </header>
      </div>
    );
  }
}


const US = []

/*[
  {
    "id": 4,
    "email": "eve.holt@reqres.in",
    "first_name": "Eve",
    "last_name": "Holt",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
  },
  {
    "id": 5,
    "email": "charles.morris@reqres.in",
    "first_name": "Charles",
    "last_name": "Morris",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
  },
]*/

export default App;
