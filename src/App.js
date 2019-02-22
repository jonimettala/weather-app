import React, { Component } from 'react';
import NavBar from './components/NavBar';
import SearchField from './components/SearchField';
import WeatherList from './components/WeatherList';

class App extends Component {
  fetchWeather = (location) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=7cc61ea99e1925b1ad21c6d78f349973')
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => console.error(error))
  }

  render() {
    return (
      <div>
        <NavBar />
        <SearchField fetchWeather={(location) => this.fetchWeather(location)} />
        <WeatherList />
      </div>
    );
  }
}

export default App;
