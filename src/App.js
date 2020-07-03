import React from "react";
import * as $ from "jquery";
import logo from "./logo.svg";
import "./App.css";
import dataFile from "./city.list.json";
import config from "./config.json";
import countryCode from "./countrycode.json";
import { Button, InputGroup } from "react-bootstrap";

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
      isActive: true,
      currentTemp: "",
      responseObj: {},
    };
    this.getForecast = this.getForecast.bind(this);
  }

  componentDidMount() {}

  getForecast() {
    // fetch(
    //   "https://community-open-weather-map.p.rapidapi.com/weather?q=seattle",
    //   {
    //     method: "GET",
    //     headers: {
    //       "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    //       "x-rapidapi-key":
    //         "a5bbbde1eemsh008b1bc05139f67p1da3f8jsn404465dbd05a",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({
    //       responseObj: response,
    //       currentTemp: response.main.temp,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    fetch(
      "https://community-open-weather-map.p.rapidapi.com/weather?id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q=london",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": config.APIKEY,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          responseObj: response,
          currentTemp: response.main.temp,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let isActive = this.state.isActive;
    let currentTemp = this.state.currentTemp;
    let responseObj = this.state.responseObj;

    return (
      <div className="App">
        <header className="App-header">
          <h1>React Weather App</h1>
          <main>
            <div>
              <h2>Find Current Weather Conditions</h2>
              <div>{JSON.stringify(responseObj)}</div>
              <button onClick={() => this.getForecast()}>Get Forecast</button>
              <div>{currentTemp}</div>
            </div>
          </main>
          <footer>React Weather App - Daniel Nwaroh</footer>
        </header>
      </div>
    );
  }
}

export default App;
