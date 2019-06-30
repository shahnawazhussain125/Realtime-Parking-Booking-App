import React from 'react';
import { 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell,
} from '@material-ui/core';

const MyFeedback = (props) => 
{
    const rows = props.myfeedback.length? props.myfeedback : null;

    return(
        <Table >
            <TableHead>
                <TableRow>
                    <TableCell>S/No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {rows? rows.map((row, index) => (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell> {row.username} </TableCell>
                    <TableCell>{row.message}</TableCell>
                    <TableCell>{row.date}</TableCell>
                </TableRow>
            ))
            : ""}
            </TableBody>
        </Table>
    )
}

export default MyFeedback;