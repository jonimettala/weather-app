import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WeatherItem from './WeatherItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  paper: {
    maxWidth: 800,
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
  },
});

function WeatherList(props) {
  const { classes } = props;

  const showLastSearch = () => {
    if (props.lastSearch !== null) {
      return <WeatherItem 
        data={props.lastSearch}
        save={(weatherData) => props.saveWeather(weatherData)}
        loading={props.loading}
        error={props.error}
        clear={() => props.clearLastResult()}
      />;
    }
  }

  return (
    <div className={classes.root}>
      {showLastSearch()}
      {props.savedWeathers.map((weather) => (
        <WeatherItem data={weather} saved={true}/>
      ))}
    </div>
  );
}

WeatherList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeatherList);
