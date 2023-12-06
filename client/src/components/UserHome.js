
import UserProjects from "./UserProjects";
import UserTasks from "./UserTasks";

function UserHome({user}) {

    return (
        <div>
            <h1>{user.name}</h1>
            <UserProjects user={user} />
            <UserTasks user={user} />
        </div>
    )
}

export default UserHome