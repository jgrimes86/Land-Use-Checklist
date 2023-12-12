// import { useMemo, useState } from "react";
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Box, Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

import UserProjects from "./UserProjects";
import UserTasks from "./UserTasks";

function UserHome() {
    const {user, setProject, setTeam} = useOutletContext()
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/users/${user.id}/accounts`)
    }

    if (!user) return <p>Loading...</p>

    return (
        <Box>
            <Paper
                elevation={2} 
                sx={{
                    mt: 2
                }}
            >
                <Typography variant="h4">{user.name}</Typography>
            </Paper>
            <UserProjects user={user} setProject={setProject} setTeam={setTeam} />
            <UserTasks user={user} />
            {/* <button onClick={handleClick} >Edit User</button> */}
        </Box>
    )
}

export default UserHome