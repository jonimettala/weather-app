import React, { Component } from 'react';
import NavBar from './components/NavBar';
import SearchField from './components/SearchField';
import WeatherList from './components/WeatherList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      searchInput: "",
      lastSearch: null,
      savedWeathers: [],
      error: false,
      loading: false
    };
  }

  updateSearching = (event) => {
    this.setState({ searchInput: event.target.value });
  }

  fetchWeather = (location) => {
    if (location !== "") {
      this.setState({ loading: true, error: false })
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7cc61ea99e1925b1ad21c6d78f349973`)
      .then(response => {
        if (response.ok) {
          return response
        } else {
          throw Error('Location not found.')
        }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ lastSearch: data, loading: false, error: false })
        console.log(data);
      })
      .catch(error => {
        console.error(error)
        this.setState({ lastSearch: "", loading: false, error: true })
      })
    }
  }

  saveWeather = (weatherData) => {
    this.setState({ savedWeathers: this.state.savedWeathers.concat(weatherData) });
  }

  render() {
    return (
      <div>
        <NavBar />
        <SearchField
          fetchWeather={(location) => this.fetchWeather(location)}
          updateSearchingState={(event) => this.updateSearching(event)}
          searchInput={this.state.searchInput}
        />
        <WeatherList
          lastSearch={this.state.lastSearch}
          savedWeathers={this.state.savedWeathers}
          error={this.state.error}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default App;
