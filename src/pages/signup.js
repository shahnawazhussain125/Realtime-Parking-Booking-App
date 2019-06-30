import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, Paper, TextField, Button } from '@material-ui/core';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { signUp } from '../redux/actions/authAction';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: 50,
    height: 500,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 100,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

 
class SignUp extends Component
{
    constructor(props)
    {
        super(props);
        this.state ={
          labelWidth: 0,
          name: "",
          email: "",
          password: "",
          conformPassword: "",
        }
    }

    componentDidMount()
    {
      if(this.props.user)
      {
        this.props.history.push(`/${this.props.userType}`);
      }
    }

    componentWillReceiveProps(nextprops)
    {
      if(nextprops.user)
      {
        alert("Successfully account created!")
        this.props.history.push(`/${ nextprops.userType }`)
      }
      else
      {
        alert(nextprops.signUpError);
      }

    }    

    handleChange = name => e=>{
      this.setState({[name]: e.target.value});
    }

    onClickHandler = () =>{
      const { 
        name, 
        email, 
        password, 
        conformPassword
      } = this.state;
     
      if(name !== "" && email !== "" && password !== "" && conformPassword !== ""
        && name !== " " && email !== " " && password !== " " && conformPassword !== " ")
      {
        if(password === conformPassword)
        {
          this.props.signUp({ name, email, password, conformPassword });
        }
        else
        {
          alert("Password does not match");
        }
      }
      else
      {
        alert("Please complete form correctly");
      }
    }

    render(){
        const { classes } = this.props;
        return (
        <Grid container className={classes.root}>
          <Grid container>
            <Header history={this.props.history}/>
          </Grid>
            <Grid container className={classes.demo} justify="center">
              <Grid item>
                <Paper className={classes.paper}>
                  <form className={classes.form} noValidate autoComplete="off">
                  
                    <TextField
                      id="name"
                      label="Full Name"
                      className={classes.textField}
                      value={this.state.name}
                      onChange={this.handleChange('name')}
                      margin="normal"
                      variant="outlined"
                      fullWidth={true}
                    />

                    <TextField
                      id="email"
                      label="Email"
                      className={classes.textField}
                      value={this.state.email}
                      onChange={this.handleChange('email')}
                      margin="normal"
                      variant="outlined"
                      fullWidth={true}
                    />
                   
                    <TextField
                      id="password"
                      label="Password"
                      className={classes.textField}
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChange('password')}                      
                      margin="normal"
                      variant="outlined"
                      fullWidth={true}
                    />
                    <TextField
                      id="conformPassword"
                      label="Conform Password"
                      className={classes.textField}
                      type="password"
                      value={this.state.conformPassword}
                      onChange={this.handleChange('conformPassword')}                      
                      margin="normal"
                      variant="outlined"
                      fullWidth={true}
                    />
                    <Button 
                      variant="contained" 
                      color="primary" 
                      className={classes.button}
                      onClick={this.onClickHandler}
                      fullWidth={true}
                    >
                      SignUp
                    </Button>
                  </form>
                </Paper>
              </Grid>
          </Grid>
        </Grid>
      );
    }
  
}

const mapStateToProps = (state) =>{
  return {
    signUpError: state.authReducer.signUpError,
    user: state.authReducer.user,
    userType: state.authReducer.userType,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    signUp: (userData) => dispatch(signUp(userData))
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));