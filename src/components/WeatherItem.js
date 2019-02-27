import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


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
  }
});

function WeatherItem(props) {
  const { classes } = props;

  // If weather can't be shown, a special text will be displayed
  let specialText;
  if (props.loading) {
    specialText = 'Loading...';
  } else if (props.error) {
    specialText = 'Location can\'t be found!';
  };


  if (props.loading || props.error) {
    return (
      <Paper className={classes.paper}>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemText primary={specialText} />
        </ListItem>
      </List>
    </Paper>
    );
  };

  // Button that either saves the weather item or removes it from saved items
  let saveButton;
  if (props.savedCities.includes(props.data.name)) {
    saveButton = (
      <IconButton aria-label="Delete" className={classes.margin} onClick={() => {
        props.handleSave(props.data, props.id);
      }}>
        <DeleteIcon />
      </IconButton>
    );
  } else {
    saveButton = (
      <IconButton aria-label="Add" className={classes.margin} onClick={() => {
        props.handleSave(props.data, -1);
        props.clear();
        }}>
        <AddIcon />
      </IconButton>
    );
  };

  // Converts Kelvin to Celsius and rounds to one decimal
  const toCelsius = (kelvin) => {
    return Math.round((kelvin - 273.15) * 10) / 10;
  }

  return (
    <Paper className={classes.paper}>
      <List className={classes.root}>
        <React.Fragment>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{props.data.name.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${props.data.name}, ${props.data.sys.country}`}
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    {`${toCelsius(props.data.main.temp)} °C, ${props.data.weather[0].main}`}
                  </Typography>
                  {`min ${toCelsius(props.data.main.temp_min)} °C, max ${toCelsius(props.data.main.temp_max)} °C,
                  ${props.data.weather[0].description}`}
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    Clouds
                  </Typography>
                  {`${props.data.clouds.all}%`}
                </React.Fragment>
              }
            />
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    Wind
                  </Typography>
                  {`${props.data.wind.speed} m/s`}
                </React.Fragment>
              }
            />
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    Visibility
                  </Typography>
                  {'100%'}
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    Pressure
                  </Typography>
                  {`${props.data.main.pressure} hpa`}
                </React.Fragment>
              }
            />
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    Humidity
                  </Typography>
                  {`${props.data.main.humidity}%`}
                </React.Fragment>
              }
            />
            <ListItemText
              secondary={
                <React.Fragment>
                  {saveButton}
                </React.Fragment>
              }
            />
          </ListItem>
        </React.Fragment>
      </List>
    </Paper>
  );
}

WeatherItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeatherItem);
