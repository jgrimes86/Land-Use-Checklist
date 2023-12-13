// import { useMemo, useState } from "react";
import { useOutletContext } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';

import UserProjects from "./UserProjects";
import UserTasks from "./UserTasks";

function UserHome() {
    const {user, setProject, setRoles} = useOutletContext()

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
            <UserProjects user={user} setProject={setProject} setRoles={setRoles} />
            <UserTasks user={user} />
        </Box>
    )
}

export default UserHome