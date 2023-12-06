import { useState, useEffect } from "react";

function UserTasks({user}) {
    const [userTasks, setUserTasks] = useState([])

    useEffect(() => {
        fetch('/tasks/users/'+user.id)
        .then((r) => {
            if (r.ok) {
                r.json().then(tasks => setUserTasks(tasks))
            }
            else {
                r.json().then(({error}) => console.log(error))
            }
        })
    }, [])

    console.log(userTasks)

    return (
        <div >
            <h2>My Tasks</h2>

        </div>
    )
}

export default UserTasks
