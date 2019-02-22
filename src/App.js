import React, { Component } from 'react';
import NavBar from './components/NavBar';
import SearchField from './components/SearchField';
import WeatherList from './components/WeatherList';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <SearchField />
        <WeatherList />
      </div>
    );
  }
}

export default App;
