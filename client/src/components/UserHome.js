import { useOutletContext } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';

import UserProjects from "./UserProjects";
import UserTasks from "./UserTasks";
import Loading from "./Loading";

function UserHome() {
    const {user, setUser, users, setProject, setRoles} = useOutletContext();

    if (!user) return <Loading />

    return (
        <Box>
            <Paper
                elevation={2} 
                sx={{
                    mt: 2,
                }}
            >
                <Typography sx={{m:1.5, pt:1, pb:1}} variant="h4">{user.name}</Typography>
            </Paper>
            <UserProjects user={user} setProject={setProject} setRoles={setRoles} />
            <UserTasks user={user} users={users} />
        </Box>
    )
}

export default UserHome