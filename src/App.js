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
      savedCities: [],
      error: false,
      loading: false,
      debugging: true
    };
  }

  componentDidMount() {
    this.loadFromLocalStorage();
  }

  saveToLocalStorage = () => {
    localStorage.setItem('cities', JSON.stringify(this.state.savedCities));
    localStorage.setItem('weathers', JSON.stringify(this.state.savedWeathers));
  }

  loadFromLocalStorage = () => {
    try {
      let weathers = JSON.parse(localStorage.getItem('weathers'));
      let cities = JSON.parse(localStorage.getItem('cities'));

      this.setState({
        savedWeathers: weathers,
        savedCities: cities
      });
    } catch (e) {
      console.log('Nothing to load from Local Storage')
    }
  }

  clearLastResult = () => {
    this.setState({
      lastSearch: null,
      error: null,
      loading: null
    });
  }

  // Callback function to update the user input
  updateSearching = (event) => {
    this.setState({ searchInput: event.target.value });
  }

  fetchWeather = (location) => {
    // Let's try to fetch location only if location was entered
    if (location !== "") {
      this.setState({ loading: true, error: false });
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7cc61ea99e1925b1ad21c6d78f349973`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          throw Error(`Location not found.\n\nNo weather data available for location '${location}'.`);
        }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ lastSearch: data, loading: false, error: false },
          () => {if (this.state.debugging) {
            console.log(data);
          }}
        );
      })
      .catch(error => {
        console.error(error);
        this.setState({ lastSearch: "", loading: false, error: true });
      })
    }
  }

  handleWeatherSave = (weatherData, id) => {
    if (this.state.savedCities.includes(weatherData.name)) {
      if (id === -1) {
        id = this.state.savedCities.indexOf(weatherData.name);
      }
      this.removeWeather(id);
    } else {
      this.saveWeather(weatherData);
    }
  }

  saveWeather = (weatherData) => {
    this.setState({
      savedWeathers: [weatherData].concat(this.state.savedWeathers),
      savedCities: [weatherData.name].concat(this.state.savedCities)
     },
    () => {
      this.saveToLocalStorage();
      if (this.state.debugging) {
        console.log(this.state.savedWeathers);
      }
    });
  }

  removeWeather = (id) => {
    this.setState({
      savedWeathers: this.state.savedWeathers.filter((_, i) => i !== id),
      savedCities: this.state.savedCities.filter((_, i) => i !== id)
    }, () => {
      this.saveToLocalStorage();
      if (this.state.debugging) {
        console.log(`Removed weather with id ${id}`);
      }
    });
  }

  createKey = () => {
    return this.state.savedCities.length;
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
          savedCities={this.state.savedCities}
          handleWeatherSave={(weatherData, id) => this.handleWeatherSave(weatherData, id)}
          createKey={() => this.createKey()}
          error={this.state.error}
          loading={this.state.loading}
          clearLastResult={() => this.clearLastResult()}
        />
      </div>
    );
  }
}

export default App;
