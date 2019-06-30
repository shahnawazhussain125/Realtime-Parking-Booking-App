import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    paddingTop: 10,
    paddingButtom: 10,
  },
  link: {
    color: "white !important",
    textDecoration: "none"
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component 
{
  constructor(props)
  {
    super(props);
    this.state={

    }
  }

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Realtime Parking Booking App
          </Typography>
            {
              user? <Button color="inherit" onClick = {this.props.logOut}>Logout</Button> : <Link to='/signin' className={classes.link}><Button color="inherit">Login</Button></Link>
            }
        </Toolbar>
      </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
