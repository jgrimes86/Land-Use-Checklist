import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

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

    console.log("User Tasks: ", userTasks)

    const taskList = userTasks.map(task => {
            return <TaskItem key={task.id} task={task}/>
        })
    
    return (
        <div >
            <h2>My Tasks</h2>
            {taskList}
        </div>
    )
}

export default UserTasks
