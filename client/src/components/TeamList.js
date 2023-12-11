
import { Box, Button, Typography, Modal, Tab } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function TeamList({team}) {

    const columns=[
        {
            field: 'role',
            headerName: 'Role',
            // width: '50%',
        },
        {
            field: 'user_name',
            headerName: 'Team Member',
            // width: '50%',
        },
    ]

    const rows= team ? team.map(role => {
        return ({
            id: role.id,
            role: role.name,
            user_name: role.user.name,
            user_id: role.user_id,
        })
    }) : [];

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Role</TableCell>
                        <TableCell>Team Member</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            onClick={() => console.log(row)}
                        >
                            <TableCell component='th' scope='row'>
                                {row.role}
                            </TableCell>
                            <TableCell>{row.user_name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default TeamList