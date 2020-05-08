import React from "react";
import * as $ from "jquery";
import logo from "./logo.svg";
import "./App.css";
import dataFile from "./city.list.json";
import config from "./config.json";

var secretkey = config.APIKEY;

let users = [
  {
    name: "Leonard Rogers",
    email: "egestas@justonecante.org",
  },
  {
    name: "Walker Pace",
    email: "erat.eget.tincidunt@idsapienCras.org",
  },
  {
    name: "Lance Mcintyre",
    email: "Nam.ligula@quamvel.net",
  },
  {
    name: "Rudyard Conway",
    email: "sit@nunc.org",
  },
  {
    name: "Chadwick Oneal",
    email: "laoreet@dictum.edu",
  },
  {
    name: "Isaiah Kent",
    email: "diam.dictum@lobortisquam.co.uk",
  },
  {
    name: "Griffith Perkins",
    email: "congue@acfermentumvel.ca",
  },
  {
    name: "Lawrence Wheeler",
    email: "ac.libero@Duisac.org",
  },
  {
    name: "Preston Walker",
    email: "egestas.rhoncus@eudui.co.uk",
  },
  {
    name: "Simon Brewer",
    email: "nunc.sed@Fuscediamnunc.co.uk",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      users: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.setState({
      users: dataFile,
    });
    this.refs.search.focus();
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      searchString: this.refs.search.value,
    });
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      console.log("enter pressed!");
      var settings = {
        url:
          "http://api.openweathermap.org/data/2.5/weather?q=Calgary&APPID=" +
          secretkey,
        method: "GET",
        crossDomain: true,
        timeout: 0,
        dataType: "jsonp",
        headers: {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key":
            "a5bbbde1eemsh008b1bc05139f67p1da3f8jsn404465dbd05a",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }
  }
  render() {
    console.log(dataFile);
    let _users = this.state.users;
    let search = this.state.searchString.trim().toLowerCase();

    if (search.length > 0) {
      _users = _users.filter(function (user) {
        return user.name.toLowerCase().match(search);
      });
    }
    console.log(_users);
    return (
      <div className="App">
        <header className="App-header">
          <input
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={(e) => this.handleChange(e)}
            onKeyPress={this.handleKeyPress}
            placeholder="type name here"
          />
          {_users.length < 10 ? (
            <ul>
              {_users.map((l) => {
                return <li key={l.id}>{l.name}</li>;
              })}
            </ul>
          ) : null}
        </header>
      </div>
    );
  }
}

export default App;
