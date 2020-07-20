import React, { useState } from "react";
let [responseObj, setResponseObj] = useState({});
const Forecast = () => {
  function getForecast() {}
  return (
    <div>
      <h2>Find Current Weather Conditions</h2>
      <div>{JSON.stringify(responseObj)}</div>
      <button onClick={getForecast}>Get Forecast</button>
    </div>
  );
};
export default Forecast;
