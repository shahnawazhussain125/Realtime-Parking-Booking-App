import React, { Component } from 'react';
import { Grid, Paper, TextField, Button, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { signIn } from '../redux/actions/authAction';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: 50,
      height: 400,
      padding: 10,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingTop: 50,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    button: {
      margin: theme.spacing.unit,
    },
});

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
          }
    }

    componentDidMount()
    {
      if(this.props.user)
      {
        this.props.history.push(`/${this.props.userType}`);
      }
    }

    onClickHandler = () =>{
      const { email, password } = this.state;

      if(email !== "" && email !== " " && password !== "" && password !== " ")
      {
        this.props.signIn({ email, password });
      }
      else
      {
        alert("Some field is empty");
      }
    }

    handleChange = name => (event) =>{
        this.setState({ [name]: event.target.value })
    }

    componentWillReceiveProps(nextProps)
    {
      if(nextProps.user)
      {
        this.props.history.push(`/${ nextProps.userType }`);
      }
      else
      {
        alert(nextProps.signInError);
      }
    }


    render() { 
        const { classes } = this.props;
        return ( 
        <Grid container className={classes.root} justify="center">
          <Grid container >
            <Header/>
          </Grid>
          <Grid container justify="center">
            <Grid item >
              <Paper className={classes.paper}>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                      id="outlined-email"
                      label="Email"
                      className={classes.textField}
                      value={this.state.email}
                      onChange={this.handleChange('email')}
                      margin="normal"
                      variant="outlined"
                      fullWidth={true}
                    />
                   
                    <TextField
                      id="standard-password-input"
                      label="Password"
                      className={classes.textField}
                      type="password"
                      autoComplete="current-password"
                      value={this.state.password}
                      onChange={this.handleChange('password')}                      
                      margin="normal"
                      variant="outlined"
                      fullWidth={true}
                    />
                    <Button 
                      variant="contained" 
                      color="primary" 
                      className={classes.button}
                      onClick={() => this.onClickHandler()}
                      fullWidth={true}
                    >
                      Login
                    </Button>
                    <Link to="/signup" > Create an Account</Link>
                  </form>
                </Paper>
              </Grid>
          </Grid>
        </Grid>
      )
    }
}

const mapStateToProps = (state) =>{
  return({
    user: state.authReducer.user,
    userType: state.authReducer.userType,
    signInError: state.authReducer.signInError,
  })
}

const mapDispatchToProps = (dispatch) =>{
  return({
    signIn: (authData) => dispatch(signIn(authData)),
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));