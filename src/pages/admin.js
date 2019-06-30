import React, { Component } from 'react';   
import { Grid, Paper, withStyles, Tabs, Tab, Typography} from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';
import Header from '../components/Header';
import AllUsers from '../components/AllUsers';
import AllBookings from '../components/AllBookings';
import AllFeedbacks from '../components/AllFeedbacks';
import { connect } from 'react-redux';
import { getAllUsers, getAllBookings, getAllFeedbacks } from '../redux/actions/adminAction';
import { signOut } from '../redux/actions/authAction';

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

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: 0,
            allUsers: props.allUsers,
            allBookings: props.allBookings,
            allFeedbacks: props.allFeedbacks,
         }
    }

    componentDidMount()
    {
      this.props.getAllUsers();
      this.props.getAllBookings();
      this.props.getAllFeedbacks();
    }

    componentWillReceiveProps(nextProps)
    {
      if(nextProps.user)
      {
        this.setState({
          allUsers: nextProps.allUsers,
          allBookings: nextProps.allBookings,
          allFeedbacks: nextProps.allFeedbacks,
        })
      }
      else
      {
        this.props.history.push('/')
      }
    }

    deleteBooking = (id) =>{
      this.props.deleteBooking(id);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    logOut = () =>{
      this.props.signOut();
    }
    render() { 
        
        const { classes, user } = this.props;
        const { value } = this.state;
        return ( 
            <Grid container className={classes.root}>
                <Grid container>
                    <Header 
                      history={this.props.history}
                      user={user}
                      logOut = {this.logOut}
                    />
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="All User" >
                            </Tab>
                            <Tab label="All Booking" >

                            </Tab>
                            <Tab label="All Feedback" >

                            </Tab>
                            
                        </Tabs>
                        <SwipeableViews
                            // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <TabContainer >
                                <AllUsers
                                  allUsers = { this.props.allUsers}
                                  getAllUsersError = { this.props.getAllUsersError}
                                />
                            </TabContainer>
                            <TabContainer>
                                <AllBookings
                                  allBookings = { this.props.allBookings }
                                  getAllBookingsError = { this.props.getAllBookingsError }
                                />
                            </TabContainer>
                            <TabContainer >
                                <AllFeedbacks
                                  allFeedbacks ={ this.props.allFeedbacks? this.props.allFeedbacks : [] }
                                  getAllFeedbacksError= {this.getAllFeedbacksError}
                                />
                            </TabContainer>
                            
                        </SwipeableViews>
                    </Paper>
                </Grid>
                </Grid>
            </Grid>
         );
    }
}

const TabContainer = ({ children }) => {
    return (
      <Typography component="div"  style={{ padding: 8 * 3 }}>
        {children}
      </Typography>
    );
  }


const mapStateToProps = (state) =>{
    return({
      user: state.authReducer.user,
      allUsers: state.adminReducer.allUsers,
      allBookings: state.adminReducer.allBookings,
      allFeedbacks: state.adminReducer.allFeedbacks,
      getAllUsersError: state.adminReducer.getAllUsersError,
      getAllBookingsError: state.adminReducer.getAllBookingsError,
      getAllFeedbacksError: state.adminReducer.getAllFeedbacksError,

    })
}

const mapDispatchToProps = ( dispatch) =>{
    return({
      getAllUsers:() => dispatch(getAllUsers()), 
      getAllBookings: () => dispatch(getAllBookings()), 
      getAllFeedbacks: () => dispatch(getAllFeedbacks()),
      signOut: () => dispatch(signOut()),
    })
}


export default connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(Admin));