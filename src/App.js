import React, { Component } from 'react';
import './App.css';
import './loading-spinner.css';
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
  // alert(this.props.id);

    return(
      <tr>
        <td>x</td>
        <td>{this.props.id}</td>
        <td>{this.props.name}inTR</td>
        <td>{this.props.last_name}</td>
      </tr>
    );
  }
}

class UserList extends Component {
  constructor(props) {
    super(props);
    this.makeUsers=this.makeUsers.bind(this);
    this.took = this.took.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      uuusers: [      
        {
          "id": 13,
          "name": "2Abbas",
          "last_name": "khalili",
        },
        {
          "id": 14,
          "name": "2Naghi",
          "last_name": "Mamouli",
        },
      ]
    }
  }
  
  makeUsers(users){
    this.setState({uuusers: users});
  }

  tick(){
    let l = localStorage.getItem('user-list');
    // loca = loca.json();
    l = JSON.parse(l);

    this.setState({uuusers: l});
  }

  took(){
    // let l = localStorage.getItem('user-list');
    // l = JSON.parse(l);
    // this.setState({uuusers: l});
    this.setState({isLoaded: true});
  }

  componentDidMount() {
    // exxeeeess xxx:
    this.timerID = setInterval(
      () => this.tick(),
      9000
    );
    //////////////////////////////
    this.timerID = setInterval(
      () => this.took(),
      3000
    );
    //////////////////////////////
    //////////////////////////////


    let users = localStorage.getItem('user-list');

    if (1) {
    // if (users === null) {
      fetch('https://reqres.in/api/users?page=2')
        .then(function(response) {
            console.log("step 1 done.");

            return response.json();
          })
        .then(function(response) {
            users = response.data;
            localStorage.setItem('user-list', JSON.stringify(users));
          ///  fillUsers(users);
            // this.makeUsers(users);
            console.log("2users are:", users);
          ///  let loca = localStorage.getItem('user-list');
            // loca = loca.json();
          ///  loca = JSON.parse(loca);
          ///  console.log("localStorage:", loca);
            // console.log("localStorage:", localStorage.getItem('user-list'));
            
            // console.log("bef");
            // console.log("uuusers:", this.state.uuusers);

            
            this.setState({
              uuusers: users,
              // isLoaded: true,

            }).then(
                this.setState({
                  isLoaded: true,
                })
            )

            // console.log("uuusers:", this.state.uuusers);
            // console.log("fin");


          })
        .catch(function(response) {
            document.getElementsByClassName('.Content').html('<div class="error">Error fetching data</div>');
            console.log('Error: ' + response.statusText);
            this.setState({
              isLoaded: true,
              error: response
            });
          });
    } else {
        fillUsers(JSON.parse(users));
        console.log("it was full!")
        console.log("3users are:", users);
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
            name={usr.name}
            last_name={usr.last_name}          
          />
        );
      });




    if(isLoaded) {
      return (
        <tbody>
          {rows}
        </tbody>
      );
    } else {
        return (
          <tbody>
            <tr>
              <td>1</td>
              <td>100</td>
              <td>1Asghar</td>
              <td>1ok4</td>
            </tr>
            
            <tr>
              <td>2</td>
              <td>101</td>
              <td>1Taghiz</td>
              <td>1ok5</td>
            </tr>
          </tbody>
        );
      }
      // this.state.uuusers.forEach((usr) => {
      //   rows.push(
      //     <TableRow
      //       id={usr.id}
      //       name={usr.name}
      //       last_name={usr.last_name}          
      //     />
      //   );
      // });

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
