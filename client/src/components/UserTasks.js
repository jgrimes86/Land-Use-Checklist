import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

import { chakra, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,} from '@chakra-ui/react';
// import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
// import { useTable, useSortBy } from 'react-table';

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
