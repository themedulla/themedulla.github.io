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
        <td><img src={this.props.avatar} /></td>
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
