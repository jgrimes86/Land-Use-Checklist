import { useLocation, useParams } from "react-router-dom";
import { Box, Paper } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import TeamListModal from "./TeamListModal";

function TeamList({setError, roles, setRoles, users}) {
    const location = useLocation();
    const params = useParams();

    const rows= roles ? roles.map(role => {
        return ({
            id: role.id,
            role: role.name,
            user_name: role.user.name,
            user_id: role.user_id,
        })
    }) : [];

    return (
        <TableContainer>
            <Table
                sx={{width:'100%', overflow:'auto', maxHeight: 800,}}
            >
                <TableHead>
                    <TableRow sx={{backgroundColor: '#2B2D42'}}>
                        <TableCell sx={{color:'white'}}>Role</TableCell>
                        <TableCell sx={{color:'white'}}>Team Member</TableCell>
                        {(location.pathname === `/projects/${params.id}/edit`) && <TableCell sx={{width: "10%"}}></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component='th' scope='row'>
                                {row.role}
                            </TableCell>
                            <TableCell>{row.user_name}</TableCell>
                            {(location.pathname === `/projects/${params.id}/edit`) && <TableCell>
                                <span>
                                    <TeamListModal row={row} roles={roles} setRoles={setRoles} users={users} setError={setError} />
                                </span>
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TeamList