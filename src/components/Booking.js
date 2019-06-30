import React, { Component } from 'react';
import { 
    withStyles, 
    Grid, 
    Paper, 
    TextField, 
    Button, 
    FormControl, 
    InputLabel, 
    Select,
    OutlinedInput,
    MenuItem
} from '@material-ui/core';
import { connect } from 'react-redux';
import { setBooking } from '../redux/actions/userAction';

const styles = theme =>  ({
    root: {
        margin: 50,
    },
    paper:{
        maginTop: 50,
        padding: 20

        
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
      slotBtn:{
          width: 100,
          height: 50,
          margin: 30,
          color: "white",
          backgroundColor: "#cddc39",
          border: "none",
      },
      error: {
          color: "red",

      },
      showSlotBtn:{
          margin: 20,
      }
})
class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            date: "",
            startTime: "00:00",
            endTime: "01:00",
            area: 1,
            slot: 0,
            labelWidth: 0,
            showSlot: false,
            dateError: "",
            startTimeError: "",
            endTimeError: "",
         }
    }

   

    defaultState = () =>{
        let date = new Date();
        let current_year = date.getFullYear();
        let curret_month = date.getMonth() + 1;
            curret_month = curret_month < 10 ? "0"+curret_month : curret_month;
        let current_date = date.getDate();
            current_date  = current_date < 10 ? "0"+current_date : current_date;

        let hour = date.getHours();
            hour = hour < 10? "0"+hour : hour;
        let minute = date.getMinutes();
            minute = minute < 10? '0'+minute : minute;
        let startTime = `${ hour }:${ minute }`;
        let endTime = `${ hour  }:${ minute }`;
            date = `${current_year}-${curret_month}-${current_date}`;
            // console.log({startTime, endTime, date});
        
        this.setState({startTime, endTime, date, slot: 0, showSlot: false});
    }

    componentDidMount()
    {
        this.defaultState();
    }

    componentWillReceiveProps(nextProps)
    {
        if( !nextProps.bookingError)
        {
            this.defaultState();
        }
    }

    handleDateChange = name => event =>{
        let curre_date = new Date();
            curre_date.setHours(5);
            curre_date.setMinutes(0);
            curre_date.setSeconds(0);
            curre_date.setMilliseconds(0);
            curre_date = curre_date.getTime();
        let selected_date = new Date(event.target.value).getTime();

        if( selected_date >= curre_date)
        {
            this.setState({ [name]: event.target.value, dateError: "", slot: 0, showSlot: false});
        }
        else
        {
            alert("Date must be greater or equal to current date");
            this.setState({[name]: event.target.value,  slot: 0, dateError: "Date must be greater or equal to current date", showSlot: false})
        }
    }

    validation = () =>{
        const { date, startTime, endTime} = this.state;
        let error = true;
        let startingTime = new Date(`${ date } ${ startTime }`).getTime();
        let endingTime = new Date(`${ date } ${ endTime }`).getTime();
        let current_time = new Date();
            current_time.setSeconds(0);
            current_time.setMilliseconds(0);
            current_time = current_time.getTime();
            
        if(this.state.dateError !== "")
        {
            error = false;
            alert("First Select date");
        }
        else if( startingTime < current_time)
        {
            error = false;
            alert("Starting time must be grater than or equal to current time")
        }
        else if( endingTime <= startingTime)
        {
            error = false;
            alert("Ending time must be greate than starting Time");
        }
        else
        {
            error = true;
        }
        
        return error;
    }

    handleStartingTimeChange = name => event =>{
       
        let selected_time = new Date(`${ this.state.date } ${ event.target.value }`).getTime();
        let current_time = new Date();
            current_time.setSeconds(0);
            current_time.setMilliseconds(0);
            current_time = current_time.getTime();
            
        if(this.state.dateError !== "")
        {
            alert("First Select date");
        }
        else if( selected_time >= current_time)
        {
            this.setState({ [name] : event.target.value, startTimeError: "", endTimeError: "", slot: 0, showSlot: false })
        }
        else
        {
            this.setState({ [name] : event.target.value, startTimeError: "Starting time must be greate than or equal to Current Time", endTimeError: "",  slot: 0, showSlot: false })
        }
    }

    handleEndingTimeChange = name => event =>{
        let selected_time = new Date(`${ this.state.date } ${ event.target.value }`).getTime();
        let start_time = new Date(`${ this.state.date } ${ this.state.startTime }`).getTime();
        
        if(selected_time === NaN || start_time === NaN)
        {
            alert("First Select date");
        }
        else if( selected_time > start_time)
        {
            this.setState({ [name] : event.target.value, endTimeError: "",  slot: 0, showSlot: false })
        }
        else
        {
            this.setState({[name] : event.target.value, endTimeError: "Ending time must be greate than starting Time",  slot: 0, showSlot: false })
        }
    }

    handleAreaChange = name => (event) =>{
        this.setState({ [name]: event.target.value, showSlot: false });
    }

    handleChange = name => (event) =>{
        this.setState({ [name]: event.target.value });
    }

    onClickHandler = () =>{
        const { date , startTime, endTime, area, slot, dateError, startTimeError, endTimeError} = this.state;
        const { user } = this.props;

        let startingTime = new Date(`${date} ${startTime}`).getTime();
        let endingTime = new Date(`${date} ${endTime}`).getTime();
        let selected_date = new Date(date);
            selected_date.setHours(0);
            selected_date.setMinutes(0);
            selected_date.setMilliseconds(0);
            selected_date.setMilliseconds(0);
        if(!dateError && !startTimeError && !endTimeError && slot)
        {
            if( endingTime > startingTime)
            {
                this.props.setBooking({date: selected_date.getTime(), startingTime, endingTime, area, userId: user.uid, slot});
            }
            else
            {
                alert("Ending Timing is not correct")
            }
        }
        else
        {
            let error = dateError? dateError : startTimeError ? startTimeError: endTimeError? endTimeError : "Please select a slot";
            alert(error);
        }
    }

    createSlot = (classes) =>{
        const { bookedData } = this.props;
        const { area, date, startTime, slot } = this.state;
        
        let curre_date = new Date();
            curre_date.setHours(0);
            curre_date.setMinutes(0);
            curre_date.setSeconds(0);
            curre_date.setMilliseconds(0)
            curre_date = curre_date.getTime();
        
        let startingTime = new Date(`${date} ${startTime}`).getTime();

        let filterData  = bookedData.filter(value =>{
            return area === value.area && curre_date === value.date
        })

        let slotes = [];
        for(let i = 1; i <= 10 ; i++)
        {
            let filterbySlot = filterData.filter(value =>{
                return ( startingTime <= value.endingTime  && value.slot == i )
            })

            slotes.push(<button value = {i} key = {i} onClick={filterbySlot.length? () => alert("Already booked") : this.handleChange("slot")} className={classes.slotBtn} style={filterbySlot.length? {backgroundColor: "#bf360c"} : slot == i? {backgroundColor: "green"}: {}}> Slot {i} </button>)
        }
        return slotes;
    }

    showSlotHandler = () =>{
        const { dateError, startTimeError, endTimeError} = this.state;
        if(this.validation())
        {
            if(dateError || startTimeError || endTimeError)
            {
                alert("First Correct the error")
            }
            else
            {
                this.setState({showSlot: true,  slot: 0})
            }
        }
            
    }

    render() { 
        const { classes } = this.props;
        const { startTime, endTime, date, showSlot, dateError, startTimeError, endTimeError } = this.state;
        return ( 
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper className = { classes.paper }>
                        <form className={classes.form} noValidate autoComplete="off">    
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                defaultValue = { date }
                                value = { this.state.date }
                                onChange = { this.handleDateChange('date') }
                                InputLabelProps={{
                                shrink: true,
                                }}
                                margin="normal"
                                variant="outlined"
                                fullWidth= {true}
                            />
                            <p className={classes.error}>{dateError}</p>
                            <TextField
                                id="startTime"
                                label="Start Time"
                                type="time"
                                onChange={this.handleStartingTimeChange('startTime')}
                                value = { startTime }
                                InputLabelProps={{
                                shrink: true,
                                }}
                                inputProps={{
                                    step: 60, // 1 min
                                }}
                                margin="normal"
                                variant="outlined"
                                fullWidth= {true}
                            />
                            <p className={classes.error}>{startTimeError}</p>
                            <TextField
                                id="endTime"
                                label="End Time"
                                type="time"
                                value = { endTime }
                                onChange={this.handleEndingTimeChange('endTime')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 60, // 1 min
                                }}
                                margin="normal"
                                variant="outlined"
                                fullWidth= {true}
                            />
                            <p className={classes.error}>{endTimeError}</p>
                            <FormControl 
                                variant="outlined" 
                                className={classes.formControl}
                                fullWidth ={true}
                            >
                                <InputLabel
                                    ref={ref => {
                                    this.InputLabelRef = ref;
                                    }}
                                    htmlFor="area"
                                >
                                    Area
                                </InputLabel>
                                <Select
                                    value={this.state.area}
                                    onChange={this.handleAreaChange('area')}
                                    input={
                                    <OutlinedInput
                                        labelWidth={this.state.labelWidth}
                                        name="Area"
                                        id="area"
                                    />
                                    }
                                >                                   
                                    <MenuItem value={1}>Area1</MenuItem>
                                    <MenuItem value={2}>Area2</MenuItem>
                                    <MenuItem value={3}>Area3</MenuItem>
                                    
                                </Select>
                            </FormControl>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.showSlotBtn}
                                onClick={ () => this.showSlotHandler()}
                                
                            >
                                Show Slot
                            </Button>            
                        </form>
                        {
                            showSlot 
                            && 
                            this.createSlot(classes)
                        }
                        {
                            showSlot 
                            && 
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.button}
                                onClick={this.onClickHandler}
                                fullWidth={true}
                            >
                                Book
                            </Button>
                        }
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) =>{
    return({
        bookingError: state.userReducer.bookingError,
        bookedData: state.userReducer.bookedData,
        getBookedDataError: state.userReducer.getBookedDataError,
        user: state.authReducer.user,
    })
}

const mapDispatchToProps = ( dispatch) =>{
    return({
        setBooking: (bookigData) => dispatch(setBooking(bookigData)),
    })
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Booking));