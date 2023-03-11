import React, { useState } from "react";
import axios from "axios";
import apiKey from "./apiKey";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faDroplet,
  faAnglesDown,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const locationHandler = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <h1>Weather App</h1>
          <div className="input-city">
            <label htmlFor="city" className="city-label">
              Enter your city
            </label>
            <input
              value={location}
              onKeyPress={locationHandler}
              onChange={(event) => setLocation(event.target.value)}
              type="text"
              id="city"
            ></input>
          </div>
          <div className="city-card">
            <div className="city-output city--box">
              <h2>{data.name}</h2>
              <h4 className="temp">
                {data.main ? <p>{Math.round(data.main.temp)} &#8451;</p> : null}
              </h4>
            </div>
            <div className="weather-icon-card city--box">
              {data.weather ? (
                <p className="weather-text">{data.weather[0].main}</p>
              ) : null}
            </div>
          </div>
          <div className="weather-inf">
            <div className="inf-box">
              <FontAwesomeIcon icon={faAnglesDown} className="icon" />
              {data.main ? (
                <p className="icon-text pressure">{data.main.pressure} hPa</p>
              ) : null}
            </div>
            <div className="inf-box">
              <FontAwesomeIcon icon={faDroplet} className="icon" />
              {data.main ? (
                <p className="icon-text humidity">{data.main.humidity}%</p>
              ) : null}
            </div>
            <div className="inf-box">
              <FontAwesomeIcon icon={faWind} className="icon" />
              {data.wind ? (
                <p className="icon-text wind">{data.wind.speed} m/s</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
