import React from 'react';
import { 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell, 
} from '@material-ui/core';

const MyBooking = (props) => 
{
    const rows = props.bookedData.length? props.bookedData.filter(value =>{
        return value.userId === props.user.uid
    }) : null;

    return(
        <Table >
            <TableHead>
                <TableRow>
                    <TableCell>S/No</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Area</TableCell>
                    <TableCell>Slot</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            
            {rows? 
            <TableBody>
                {
                    rows.map((row, index) => (
                        createRow(row, index, props.deleteBooking)
                    ))
                }
            </TableBody>
            : ""}
        </Table>
    )
}

const createRow = (row, index, deleteBooking) =>{
    let str_hour = new Date(row.startingTime).getHours();
    let end_hour = new Date(row.endingTime).getHours();
    let str_min = new Date(row.startingTime).getMinutes();
    let end_min = new Date(row.endingTime).getMinutes();
    let date = new Date(row.date);
    let current_year = date.getFullYear();
    let curret_month = date.getMonth() + 1;
        curret_month = curret_month < 10 ? "0"+curret_month : curret_month;
    let current_date = date.getDate();
        current_date  = current_date < 10 ? "0"+current_date : current_date;

    return(
        <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell> {current_date + "-" + curret_month + "-" + current_year} </TableCell>
            <TableCell> {`${str_hour > 0 && str_hour <= 12? "0"+str_hour : str_hour === 0 ? "12": str_hour- 12 }:${ str_min < 10? "0"+str_min : str_min } ${str_hour < 12 ? "AM" : "PM"}`} </TableCell>
            <TableCell> {`${end_hour > 0 && end_hour <= 12? "0" + end_hour : end_hour === 0 ? "12" : end_hour - 12 }:${ end_min < 10? "0" + end_min : end_min } ${ end_hour < 12 ? "AM" : "PM"}`} </TableCell>
            <TableCell>{row.area}</TableCell>
            <TableCell>{row.slot}</TableCell>
            <TableCell><button onClick = {() => deleteBooking(row.id)}>Delete</button></TableCell>
        </TableRow>
    )
}

export default MyBooking;