import React from "react";
import {
  Grid,
  Header,
  Icon,
  Input,
  Statistic,
  Card,
  Image,
  Popup,
  Modal,
  Button,
  Table,
} from "semantic-ui-react";
// import "semantic-ui-css/semantic.min.css";
import "./App.css";
import config from "./config.json";
import countryList from "./countrycode.json";
import _ from "lodash";

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
      searchBarValue: "",
      searchResult: {},
      openModal: false,
      resultLength: 0,
      selectedCity: {},
      listOfCities: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.openSearchModal = this.openSearchModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectRow = this.selectRow.bind(this);
  }

  componentDidMount() {
    console.log(countryList);
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
        this.setState({
          searchResult: response,
          resultLength: response.list.length,
        });
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

  openSearchModal() {
    console.log("modal");
    this.setState({
      openModal: true,
    });
  }

  closeModal() {
    console.log("close");
    this.setState({
      openModal: false,
    });
  }

  selectRow(id, index) {
    const { searchResult } = this.state;
    console.log("row");
    console.log(index);
    console.log(searchResult.list[index]);
    this.setState({
      openModal: false,
      dataReady: true,
      selectedCity: searchResult.list[index],
      currentTemp: this.convertToCelcius(searchResult.list[index].main.temp),
    });
  }

  render() {
    const {
      currentTemp,
      dataReady,
      searchResult,
      resultLength,
      selectedCity,
      listOfCities,
    } = this.state;

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
              <Header as="h1" icon textAlign="center">
                <Header.Content>React Weather App</Header.Content>
              </Header>

              <main>
                <div>
                  <h2>Find Current Weather Conditions</h2>

                  <div className={"cardContainer"}>
                    <Card style={{ height: "100%" }}>
                      <Card.Content className={"cardContentContainer"}>
                        <div className={"innerCard"}>
                          <Popup
                            trigger={
                              <Icon
                                link
                                aria-hidden="true"
                                className="add huge icon"
                                onClick={this.openSearchModal}
                              ></Icon>
                            }
                            content="Click to add a city"
                            basic
                          />
                          <Card.Header>Add a city</Card.Header>
                        </div>
                      </Card.Content>
                    </Card>
                  </div>

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
                        : this.convertToCelcius(selectedCity.main.temp) +
                          "\u00b0C"}
                    </Statistic.Value>
                    <Statistic.Label className={"tempLabel"}>
                      {dataReady === false
                        ? ""
                        : encodeURIComponent(selectedCity.name) +
                          ", " +
                          countryList[selectedCity.sys.country]}
                    </Statistic.Label>
                  </Statistic>
                  <Header as="h6" className={"tempLabel"}>
                    {dataReady === false
                      ? ""
                      : "Feels like " +
                        this.convertToCelcius(selectedCity.main.feels_like)}
                  </Header>
                </div>
              </main>
            </Grid.Column>
          </Grid>
          {/*<footer>React Weather App - Daniel Nwaroh</footer>*/}
        </header>
        <Modal
          open={this.state.openModal}
          id={"addCityModal"}
          onClose={this.closeModal}
          style={{ textAlign: "center" }}
        >
          <Modal.Header>Search a City</Modal.Header>
          <Modal.Content>
            <Modal.Description>
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
            </Modal.Description>
            <div>
              {resultLength === 0 ? null : (
                <Table
                  celled
                  fixed
                  singleLine
                  selectable
                  style={{ marginTop: "30px" }}
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>City</Table.HeaderCell>
                      <Table.HeaderCell>Country</Table.HeaderCell>
                      <Table.HeaderCell>
                        Temperature ({"\u00b0C"})
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {_.map(
                      searchResult.list,
                      ({ name, id, sys, main }, index) => (
                        <Table.Row
                          key={id}
                          onClick={() => this.selectRow(id, index)}
                        >
                          <Table.Cell>{name}</Table.Cell>
                          <Table.Cell>{countryList[sys.country]}</Table.Cell>
                          <Table.Cell>
                            {this.convertToCelcius(main.temp)}
                          </Table.Cell>
                        </Table.Row>
                      )
                    )}
                  </Table.Body>
                </Table>
              )}
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default App;
