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
      debugging: false
    };
  }

  componentDidMount() {
    this.loadFromLocalStorage();
    setTimeout(() => this.fetchUpdatedData(), 200);
  }

  // Saves saved locations to browser's local storage
  saveToLocalStorage = () => {
    localStorage.setItem('cities', JSON.stringify(this.state.savedCities));
    localStorage.setItem('weathers', JSON.stringify(this.state.savedWeathers));
  }

  // Loads saved locations from browser's local storage
  loadFromLocalStorage = () => {
    try {
      let cities = [];
      let weathers = JSON.parse(localStorage.getItem('weathers'));
      cities = JSON.parse(localStorage.getItem('cities'));

      if (cities.length !== 0) {
        this.setState({
          savedWeathers: weathers,
          savedCities: cities
        });
      }
    } catch (e) {
      console.log('Error while trying to load local storage data');
    }
  }

  // Removes the last search result from UI
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
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
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

  // Fetches updated data
  /*
    It would be reasonable to combine fetching parts of this and fetchWeather().
    At the moment there is too much repeation of code between these two functions.

    This function also doesn't update the weathers to the same order as they were
    before, which is bad UX and should be fixed in the future.
  */
  fetchUpdatedData = () => {
    if (this.state.savedCities !== 0) {
      let weathers = this.state.savedCities;
      this.setState({
        savedWeathers: [],
        savedCities: []
      })
      weathers.forEach((location) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            throw Error(`Location not found.\n\nNo weather data available for location '${location}'.`);
          }
        })
        .then(response => response.json())
        .then((data) => this.saveWeather(data))
        .catch(error => {
          console.error(error);
        })
      });
    }
  }

  // Callback function for saving or removing the location
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

  // Saves the location to saved locations
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

  // Removes the location from saved locations
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
          error={this.state.error}
          loading={this.state.loading}
          clearLastResult={() => this.clearLastResult()}
        />
      </div>
    );
  }
}

export default App;
