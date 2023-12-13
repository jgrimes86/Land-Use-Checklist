import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from "dayjs";

import TaskModal from "./TaskModal";

function UserTasks({user, users}) {
    const [userTasks, setUserTasks] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetch('/users/tasks/'+user.id)
        .then((r) => {
            if (r.ok) {
                r.json().then(tasks => setUserTasks(tasks))
            }
            else {
                r.json().then(({error}) => console.log(error))
            }
        })
    }, [])
    
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
                    <TaskModal task={params.row.taskDetail} tasks={userTasks} setTasks={setUserTasks} users={users} />
                </span>
            )
        }
    ]

    const rows = userTasks.map(task => {
        return ({
            id: task.id,
            taskDetail: task,
            task: `${task.project.name}: ${task.name}`,
            startDate: dayjs(task.start_date).format('YYYY-MM-DD'),
            endDate: dayjs(task.end_date).format('YYYY-MM-DD'),
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
                disableRowSelectionOnClick 
            />
        </Box>
    )
}

export default UserTasks
