import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { Box, Button, Typography, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';


import TaskModal from "./TaskModal";

function ProjectTasks({team}) {
    const params = useParams();
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetch(`/projects/${params.id}/tasks`)
        .then((r) => {
            if (r.ok) {
                r.json().then(tasks => setTasks(tasks))
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
            width: 400,
            // cellClassName: (params) =>
            //     clsx('task-title', {
            //         // whiteSpace: 'normal',
            //         // wordWrap: 'break-word',
            //         // display: "inline-block"
            //       }),
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
            field: 'user',
            headerName: 'Team Member',
            width: 150,
        },
        {
            field: 'edit',
            headerName: 'Edit Task',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <span>
                    <TaskModal task={params.row.taskDetail} tasks={tasks} setTasks={setTasks} team={team} />
                </span>
            )
        }
    ]

    const rows = tasks ? tasks.map(task => {
        return ({
            id: task.id,
            taskDetail: task,
            task: task.name,
            startDate: task.start_date,
            endDate: task.end_date,
            status: task.status,
            user: task.user.name
        })
    }) : [];

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

export default ProjectTasks