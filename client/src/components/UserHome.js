
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

import UserProjects from "./UserProjects";
import UserTasks from "./UserTasks";

function UserHome({user}) {

    return (
        <Box>
            <h1>{user.name}</h1>
            <UserProjects user={user} />
            <UserTasks user={user} />
        </Box>
    )
}

export default UserHome