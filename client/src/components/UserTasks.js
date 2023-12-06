import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

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
        <Box >
            <h2>My Tasks</h2>

        </Box>
    )
}

export default UserTasks
