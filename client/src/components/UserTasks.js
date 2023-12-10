import { useState, useEffect } from "react";
import { Box, Button, Typography, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import TaskModal from "./TaskModal";

function UserTasks({user}) {
    const [userTasks, setUserTasks] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    // console.log("User Tasks: ", userTasks)
    
    const columns = [
        {
            field: 'task',
            headerName: 'Task',
            width: 500,
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            width: 150,
        },
        {
            field: 'endDate',
            headerName: 'Due Date',
            width: 150,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
        },
        {
            field: 'edit',
            headerName: 'Edit Task',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <span>
                    <TaskModal task={params.row.taskDetail} userTasks={userTasks} setUserTasks={setUserTasks} />
                </span>
            )
        }
    ]

    const rows = userTasks.map(task => {
        return ({
            id: task.id,
            taskDetail: task,
            task: `${task.project.name}: ${task.name}`,
            startDate: task.start_date,
            endDate: task.end_date,
            status: task.status,
        })
    })

    return (
        <Box sx={{ height: 400, width: '100%'}} >
            <DataGrid 
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
            />
        </Box>
    )
}

export default UserTasks
