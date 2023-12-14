import { useState, useEffect } from "react";
import { Box, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from "dayjs";

import TaskModal from "./TaskModal";

function UserTasks({user, users}) {
    const [userTasks, setUserTasks] = useState([])

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
            headerClassName: 'task-table-header',
            minWidth: 300,
            // headerAlign: 'center',
            flex: 1
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            headerClassName: 'task-table-header',
            width: 100,
            // headerAlign: 'center'
        },
        {
            field: 'endDate',
            headerName: 'Due Date',
            headerClassName: 'task-table-header',
            width: 100,
            // headerAlign: 'center'
        },
        {
            field: 'status',
            headerName: 'Status',
            headerClassName: 'task-table-header',
            width: 150,
            // headerAlign: 'center'
        },
        {
            field: 'edit',
            headerName: 'Edit Task',
            headerClassName: 'task-table-header',
            sortable: false,
            width: 100,
            headerAlign: 'center',
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
        <Paper 
            elevation={2}
            sx={{ 
                mt: 2,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }} 
        >
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
                getRowHeight={() => 'auto'}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    '.MuiDataGrid-columnHeaders': {
                        backgroundColor: '#2B2D42',
                        color: 'white',
                    },
                    '.MuiDataGrid-menuIconButton': {
                        color: 'white'
                    },
                    '.MuiDataGrid-sortIcon': {
                        color: 'white'
                    }
                }}
            />
        </Paper>
    )
}

export default UserTasks
