// import { useMemo, useState } from "react";
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

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
        <div>
            <h1>{user.name}</h1>
            <UserProjects user={user} setProject={setProject} setTeam={setTeam} />
            <UserTasks user={user} />
            {/* <button onClick={handleClick} >Edit User</button> */}
        </div>
    )
}

export default UserHome