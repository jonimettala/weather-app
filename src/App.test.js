import React from 'react';
import { shallow } from 'enzyme';
import WeatherList from './components/WeatherList';
import { toCelsius } from './components/WeatherItem';

it('weatherlist renders without crashing', () => {
  shallow(<WeatherList />);
});

describe('Converting temperatures', () => {
  it('converts Kelvin to Celsius', () => {
    expect(toCelsius(2)).toEqual(-271.1);
  });
});
