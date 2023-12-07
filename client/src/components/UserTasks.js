import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

import { Table, Thead, Tbody, Tr, Th, Td, } from '@chakra-ui/react';

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
            <h2>My Task List</h2>
            {taskList}

            <h2>My Task Table</h2>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Project</Th>
                        <Th>Start Date</Th>
                        <Th>End Date</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {userTasks.map(task => {
                        return <Tr key={task.id} >
                            <Td>{task.project.name}</Td>
                            <Td>{task.start_date}</Td>
                            <Td>{task.end_date}</Td>
                            <Td>{task.status}</Td>
                        </Tr>
                    })}
                </Tbody>
            </Table>



        </div>
    )
}

export default UserTasks
