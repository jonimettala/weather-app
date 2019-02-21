import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Button variant="contained" color="primary">
          Material Button
        </Button>
      </div>
    );
  }
}

export default App;
