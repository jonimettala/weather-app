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

function AutoGridNoWrap(props) {
  const { classes } = props;

  const showLastSearch = () => {
    if (props.lastSearch !== null) {
      return <WeatherItem weatherData={props.lastSearch} />
    }
  }

  const showSavedWeathers = () => {
    let savedWeathers;
    for (let weather of props.savedWeathers) {
      savedWeathers += <WeatherItem weatherData={weather} saved={false}/>;
    }
    return savedWeathers;
  }

  return (
    <div className={classes.root}>
      {showLastSearch()}
      {showSavedWeathers()}
      {showSavedWeathers()}
    </div>
  );
}

AutoGridNoWrap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoGridNoWrap);