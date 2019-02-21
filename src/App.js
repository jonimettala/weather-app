import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import NavBar from './components/NavBar';
import SearchField from './components/SearchField';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <SearchField />
      </div>
    );
  }
}

export default App;
