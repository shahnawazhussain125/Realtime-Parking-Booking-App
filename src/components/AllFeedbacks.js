import React from 'react';
import { 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell,
} from '@material-ui/core';

const ALlFeedbacks = (props) => 
{
    const rows = props.allFeedbacks.length? props.allFeedbacks : null;

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

export default ALlFeedbacks;