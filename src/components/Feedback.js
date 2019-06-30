import React from 'react';
import { 
    Grid,
    Paper, 
    TextField,
    Button,
    FormControl,

} from '@material-ui/core';

const Feedback = (props) => 
{
    const { classes } = props;
    return(
        <Grid 
            container 
            justify = "center" 
            spacing={24}
        >
            <Grid item xs={3}>.</Grid>
            <Grid item xs={6} >
                <Paper >
                    <FormControl>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="feedback"
                                label="Comment"
                                placeholder="Write your feedback"
                                multiline={true}
                                rows={10}
                                rowsMax={10}
                                className={classes.textField}
                                onChange= {props.handleChange('message')}
                                margin="normal"
                                variant="outlined"
                                fullWidth={true}
                            />                                
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.button}
                                onClick={(e) =>props.setFeedback(e)}
                                fullWidth={true}
                            >
                                Send
                            </Button>
                        </form>
                    </FormControl>
                </Paper>
            </Grid>
        </Grid>
    )
}


export default Feedback;