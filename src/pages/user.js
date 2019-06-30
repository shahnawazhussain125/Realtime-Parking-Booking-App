import React, { Component } from 'react';   
import { Grid, Paper, withStyles, Tabs, Tab, Typography} from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';
import Header from '../components/Header';
import Booking from '../components/Booking';
import MyBooking from '../components/MyBooking';
import Feedback from '../components/Feedback';
import MyFeedback from '../components/MyFeedback'
import { connect } from 'react-redux';
import { setBooking, getBooking, deleteBooking, setFeedback, myFeedback} from '../redux/actions/userAction';
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

class User extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          message: "",
          user: "",
          value: 0,
         }
    }

    componentWillReceiveProps(nextProps)
    {
      if(nextProps.user)
      {
        if(nextProps.bookingError)
        {
          alert(nextProps.bookingError);
        }
      }
      else
      {
        localStorage.clear();
        this.props.history.push('/');
      }
    }

    componentDidMount()
    {
      this.props.getBooking();
      this.props.myFeedback( this.props.user.uid );
    }

    deleteBooking = (id) =>{
      this.props.deleteBooking(id);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleTextAreaChange = name => event =>{
      this.setState({ [name] : event.target.value })
    }

    setFeedback = (event) =>{
      event.preventDefault();
      const { message } = this.state;
      const { user, name } = this.props; 
      let date = new Date();
          date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

      if(message !== "" && message !== " ")
      {
        this.props.setFeedback({username: name, userId: user.uid, message, date})
      }
    }

    logOut = () =>{
      this.props.signOut();
    }
    render() { 
        const { classes, user } = this.props;
        // console.log('this.props.myfeedback', this.props.myfeedback)
        return ( 
            <Grid container className={classes.root}>
                <Grid container>
                    <Header 
                      history={this.props.history}
                      user = { user }
                      logOut = { this.logOut }
                    />
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Booking" >
                            </Tab>
                            <Tab label="My Booking" >

                            </Tab>
                            <Tab label="Feedback" >

                            </Tab>
                            <Tab label="My Feedback" >

                            </Tab>
                        </Tabs>
                        <SwipeableViews
                            // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <TabContainer >
                                <Booking/>
                            </TabContainer>
                            <TabContainer>
                                <MyBooking
                                  user = { this.props.user }
                                  bookedData = { user ? this.props.bookedData : []}
                                  deleteBookingError = { this.props.deleteBookingError}
                                  deleteBooking = { this.deleteBooking }

                                />
                            </TabContainer>
                            <TabContainer >
                                <Feedback
                                  classes={classes}
                                  setFeedback={this.setFeedback}
                                  handleChange={this.handleTextAreaChange}
                                />
                            </TabContainer>
                            <TabContainer>
                              <MyFeedback
                                myfeedback={this.props.myfeedback}
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
      name: state.authReducer.name,
      bookedData: state.userReducer.bookedData,
      myfeedback: state.userReducer.myfeedback,
      bookingError: state.userReducer.bookingError,
      getBookedDataError: state.userReducer.getBookedDataError,
      deleteBookingError: state.userReducer.deleteBookingError,
      feedbackError: state.userReducer.feedbackError,
    })
}

const mapDispatchToProps = ( dispatch) =>{
    return({
        setBooking: (bookigData) => dispatch(setBooking(bookigData)),
        getBooking: () => dispatch(getBooking()),
        deleteBooking: (id) => dispatch(deleteBooking(id)),
        setFeedback: (data) => dispatch(setFeedback(data)),
        signOut: () => dispatch(signOut()),
        myFeedback: (uid) => dispatch(myFeedback(uid)),
    })
}


export default connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(User));