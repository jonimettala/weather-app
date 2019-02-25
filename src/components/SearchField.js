import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: 'auto',
    marginTop: '20px',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

function CustomizedInputBase(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <IconButton className={classes.iconButton} aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Weather"
        onChange={(event) => props.updateSearchingState(event)}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            props.fetchWeather(props.searchInput)
            ev.preventDefault();
          }
        }}
        autoFocus
      />
      <IconButton className={classes.iconButton} aria-label="Search" onClick={() => props.fetchWeather(props.searchInput)} >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputBase);