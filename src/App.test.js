import React from 'react';
import renderer from 'react-test-renderer';
import { toCelsius } from './components/WeatherItem';
import App from "./App";

it('renders without crashing', () => {
  const div = document.createElement('div');
  renderer.create(<App />, div);
});

describe('Converting temperatures', () => {
  it('converts Kelvin to Celsius', () => {
    expect(toCelsius(2)).toEqual(-271.1);
  });
});
