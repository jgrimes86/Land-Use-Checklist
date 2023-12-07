import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

import UserProjects from "./UserProjects";
import UserTasks from "./UserTasks";

function UserHome() {
    const {user} = useOutletContext();
    // const params = useParams();
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
        </div>
    )
}

export default UserHome