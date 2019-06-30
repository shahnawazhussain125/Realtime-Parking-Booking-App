import React from 'react';
import { 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell,
} from '@material-ui/core';

const AllUsers = (props) => 
{
    const rows = props.allUsers.length? props.allUsers.filter(value =>{
        return value.userType !== "admin"
    }) : null;

    return(
        <Table >
            <TableHead>
                <TableRow>
                    <TableCell>S/No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {rows? rows.map((row, index) => (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell> {row.name} </TableCell>
                    <TableCell>{row.email}</TableCell>
                </TableRow>
            ))
            : ""}
            </TableBody>
        </Table>
    )
}

export default AllUsers;