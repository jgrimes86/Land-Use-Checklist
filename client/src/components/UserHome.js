import { useMemo, useState } from "react";
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

import UserProjects from "./UserProjects";
import UserTasks from "./UserTasks";
import TaskTable from './TaskTable';

function UserHome({user}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/users/account/${user.id}`)
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <UserProjects user={user} />
            <UserTasks user={user} />
            <Button colorScheme="blue" onClick={handleClick} >Edit User</Button>
            <TaskTable user={user} />
        </div>
    )
}

export default UserHome