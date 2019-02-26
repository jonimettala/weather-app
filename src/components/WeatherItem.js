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
    specialText = "Loading..."
  } else if (props.error) {
    specialText = "Location can't be found!"
  }


  if (props.loading || props.error) {
    return (
      <Paper className={classes.paper}>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemText primary={specialText} />
        </ListItem>
      </List>
    </Paper>
    )
  }

  // Button that either saves the weather item or removes it from saved items
  let saveButton;
  if (props.saved) {
    saveButton = (
      <IconButton aria-label="Delete" className={classes.margin}>
        <DeleteIcon />
      </IconButton>
    )
  } else {
    saveButton = (
      <IconButton aria-label="Add" className={classes.margin}>
        <AddIcon />
      </IconButton>
    )
  }

  return (
    <Paper className={classes.paper}>
      <List className={classes.root}>
        <React.Fragment>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>D</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${props.data.name}, ${props.data.sys.country}`}
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    7°C, Drizzle
                  </Typography>
                  {"min X°C, max Y°C, light intensity drizzle"}
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
                  {"90 %"}
                </React.Fragment>
              }
            />
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    Wind
                  </Typography>
                  {"4.1 80 deg"}
                </React.Fragment>
              }
            />
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    Visibility
                  </Typography>
                  {"100%"}
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    Wind
                  </Typography>
                  {"pressure"}
                </React.Fragment>
              }
            />
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    Humidity
                  </Typography>
                  {"humidity"}
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