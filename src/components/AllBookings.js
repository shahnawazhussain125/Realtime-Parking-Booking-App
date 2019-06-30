import React from 'react';
import { 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell, 
} from '@material-ui/core';

const AllBookings = (props) => 
{
    const rows = props.allBookings;
    return(
        <Table >
            <TableHead>
                <TableRow>
                    <TableCell>S/No</TableCell>
                    <TableCell>Area</TableCell>
                    <TableCell>Slot</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                </TableRow>
            </TableHead>
            {rows? 
            <TableBody>
                {
                    rows.map((row, index) => (
                        createRow(row, index)
                    ))
                }
            </TableBody>
            : ""}
        </Table>
    )
}

const createRow = (row, index) =>{
    let str_hour = new Date(row.startingTime).getHours();
    let end_hour = new Date(row.endingTime).getHours();
    let str_min = new Date(row.startingTime).getMinutes();
    let end_min = new Date(row.startingTime).getMinutes();
    return(
        <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{row.area}</TableCell>
            <TableCell>{row.slot}</TableCell>
            <TableCell> {`${new Date(row.date).getDate()}-${new Date(row.date).getMonth() + 1 }-${new Date(row.date).getFullYear()}`} </TableCell>
            <TableCell> {`${str_hour > 0 && str_hour <= 12? "0"+str_hour : str_hour === 0 ? "12": str_hour- 12 }:${ str_min < 10? "0"+str_min : str_min } ${str_hour < 12 ? "AM" : "PM"}`} </TableCell>
            <TableCell> {`${end_hour > 0 && end_hour <= 12? "0" + end_hour : end_hour === 0 ? "12" : end_hour - 12 }:${ end_min < 10? "0" + end_min : end_min } ${ end_hour < 12 ? "AM" : "PM"}`} </TableCell>
        </TableRow>
    )
}

export default AllBookings;