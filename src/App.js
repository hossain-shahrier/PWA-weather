import { fetchWeather } from "./api/fetchWeather";
import styled from "styled-components";
import "./App.css";
import { useState } from "react";
const Container = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.418)),
    url("https://images.unsplash.com/photo-1562155618-e1a8bc2eb04f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1191&q=80");
  background-size: cover;
  background-position: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Search = styled.input`
  outline: none;
  padding: 20px 7%;
  border-radius: 10px;
  border: none;
  margin-bottom: 5%;
  background: rgba(250, 250, 250, 0.85);
  @media only screen and (max-width: 600px) {
    padding: 20px 15%;
  }
  ::placeholder {
    font-style: italic;
  }
`;
const Error = styled.span`
  color: white;
  font-style: italic;
`;
const City = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 8%;
  border-radius: 20px;
  background: rgba(250, 250, 250, 0.85);
  box-shadow: 10px 10px 5px 0px rgba(15, 15, 15, 0.404);
  @media only screen and (max-width: 600px) {
    padding: 40px 20%;
  }
`;
const CityName = styled.h2`
  font-size: 2em;
`;
const WeatherName = styled.span``;
const WeatherCountry = styled.sup`
  padding: 0.2em 0.6em;
  margin-left: 0.2em;
  border-radius: 30px;
  color: #fff;
  background: #ff8c00;
`;
const Temp = styled.span`
  font-size: 5rem;
  font-weight: bold;
  margin-top: 10px;
  color: #1e2432;
  text-align: center;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CityIcon = styled.img`
  margin-top: 10px;
  width: 100px;
  height: 100px;
`;
const WeatherDescription = styled.span`
  margin-top: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");
  const search = async (e) => {
    if (e.key === "Enter") {
      await fetchWeather(city)
        .then((data) => {
          setWeather(data);
          setError("");
          setCity("");
        })
        .catch(() => {
          setCity("");
          setError("City not found.");
        });
    }
  };
  return (
    <Container>
      <Search
        type="text"
        placeholder="Search for a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={search}
      />
      <Error>{error}</Error>
      {weather.main && (
        <City>
          <CityName>
            <WeatherName>{weather.name}</WeatherName>
            <WeatherCountry>{weather.sys.country}</WeatherCountry>
          </CityName>
          <Temp>Temperature {Math.round(weather.main.temp)}&deg;C</Temp>
          <Info>
            <CityIcon
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <WeatherDescription>
              {weather.weather[0].description}
            </WeatherDescription>
          </Info>
        </City>
      )}
    </Container>
  );
};

export default App;
