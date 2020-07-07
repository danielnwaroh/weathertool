import React from "react";
import {
  Grid,
  Segment,
  Header,
  Icon,
  Input,
  Statistic,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
// import logo from "./logo.svg";
import "./App.css";
// import dataFile from "./city.list.json";
import config from "./config.json";
// import countryCode from "./countrycode.json";
// import { Button, InputGroup } from "react-bootstrap";
import countryList from "./countrycode.json";

var secretkey = config.APIKEY;

var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTemp: "",
      dataReady: false,
      responseObj: {},
      searchBarValue: "",
    };
    this.getForecast = this.getForecast.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    console.log(countryList);
  }

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
      "https://community-open-weather-map.p.rapidapi.com/weather?id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q=calgary",
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
      .then((response) => {
        this.setState({
          dataReady: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    // console.log(event.target.value);
    this.setState({ searchBarValue: event.target.value });
  }

  handleKeyDown(event) {
    // console.log(event.key);
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    // console.log("submit");
    console.log(this.state.searchBarValue);
    fetch(
      "https://community-open-weather-map.p.rapidapi.com/find?type=link%252C%20accurate&units=imperial%252C%20metric&q=" +
        this.state.searchBarValue,
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
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getCurrentDate() {
    let d = new Date();
    let dayOfWeek = weekday[d.getDay()];
    let day = d.getDate();
    let month = months[d.getMonth()];
    let currentDate = dayOfWeek + ", " + day + " " + month;
    return currentDate;
  }

  convertToCelcius(temp) {
    return Math.round(temp - 273.15);
  }

  render() {
    const { currentTemp, dataReady, responseObj } = this.state;
    // let currentTemp = this.state.currentTemp;
    // let responseObj = this.state.responseObj;

    return (
      <div className="App">
        <header className="App-header">
          <Grid columns="equal">
            <Grid.Column
              width={10}
              className={"mainGrid"}
              style={{
                background: "#F2FBFF",
                borderRadius: "10px 0px 0px 10px",
              }}
            >
              {/*<Segment>1</Segment>*/}
              {/*<Grid.Row>*/}
              {/*  <h1>React Weather App</h1>*/}
              {/*</Grid.Row>*/}
              <Header as="h1" icon textAlign="center">
                <Header.Content>React Weather App</Header.Content>
              </Header>

              <main>
                <div>
                  <h2>Find Current Weather Conditions</h2>
                  <Input
                    icon={
                      <Icon
                        name="search"
                        inverted
                        circular
                        link
                        onClick={this.handleSubmit}
                      />
                    }
                    placeholder="Search..."
                    value={this.state.searchBarValue}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                  />
                  <div>{JSON.stringify(responseObj)}</div>
                  <button onClick={() => this.getForecast()}>
                    Get Forecast
                  </button>
                  <div>{currentTemp}</div>
                </div>
              </main>
            </Grid.Column>
            <Grid.Column
              width={6}
              className={"mainGrid"}
              id={"currentDisplay"}
              style={{
                background: "#11103A",
                borderRadius: "0px 10px 10px 0px",
              }}
            >
              {/*<Segment>2</Segment>*/}
              <main>
                <div style={{ color: "white" }}>
                  <Header
                    as="h2"
                    icon
                    textAlign="center"
                    style={{ color: "inherit" }}
                  >
                    <Icon name="cloud" />
                    <Header.Content>Today</Header.Content>
                    <Header.Content style={{ fontSize: "12px" }}>
                      {this.getCurrentDate()}
                    </Header.Content>
                  </Header>
                  <Statistic>
                    <Statistic.Value className={"tempLabel"}>
                      {dataReady === false
                        ? ""
                        : this.convertToCelcius(currentTemp) + "\u00b0" + "C"}
                    </Statistic.Value>
                    <Statistic.Label className={"tempLabel"}>
                      {dataReady === false
                        ? ""
                        : encodeURIComponent(responseObj.name) +
                          ", " +
                          countryList[responseObj.sys.country]}
                    </Statistic.Label>
                  </Statistic>
                  <Header as="h6" className={"tempLabel"}>
                    {dataReady === false
                      ? ""
                      : "Feels like " +
                        this.convertToCelcius(responseObj.main.feels_like)}
                  </Header>
                </div>
              </main>
            </Grid.Column>
          </Grid>

          {/*<footer>React Weather App - Daniel Nwaroh</footer>*/}
        </header>
      </div>
    );
  }
}

export default App;
