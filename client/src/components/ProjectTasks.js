import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Autocomplete, Box, Button, Paper, Popover, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from "dayjs";

import TaskModal from "./TaskModal";

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)

function ProjectTasks({users, tasks, setTasks}) {
    const params = useParams();
    // const [tasks, setTasks] = useState([]);
    const [team, setTeam] = useState([])

    // const [anchorEl, setAnchorEl] = useState(null);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // const open = Boolean(anchorEl);
    // const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        fetch(`/projects/${params.id}/tasks`)
        .then((r) => {
            if (r.ok) {
                r.json().then(tasks => setTasks(tasks))
            } else {
                r.json().then(({error}) => console.log(error))
            }
        })

        fetch(`/projects/${params.id}/team-members`)
        .then((r) => {
            if (r.ok) {
                r.json().then(teamMembers => setTeam(teamMembers))
            } else {
                r.json().then(({error}) => console.log(error))
            }
        })
    }, [])

    const columns = [
        {
            field: 'task',
            headerName: 'Task',
            minWidth: 300,
            flex: 1
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            width: 100,
        },
        {
            field: 'endDate',
            headerName: 'Due Date',
            width: 100,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
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
            cellClassName: 'edit-task-button--cell',
            renderCell: (params) => (
                <span>
                    <TaskModal task={params.row.taskDetail} tasks={tasks} setTasks={setTasks} users={users} />
                </span>
            )
        }
    ]

    const rows = tasks ? tasks.map(task => {
        return ({
            id: task.id,
            taskDetail: task,
            task: task.name,
            startDate: dayjs(task.start_date).format('YYYY-MM-DD'),
            endDate: dayjs(task.end_date).format('YYYY-MM-DD'),
            status: task.status,
            user: task.user ? task.user.name : ""
        })
    }) : [];

    return (
        <Paper
            elevation={2}
            sx={{ 
                mt: 2,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Box 
                sx={{ 
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
                    pageSizeOptions={[5, 10, 15, 20]}
                    disableRowSelectionOnClick 
                    getRowHeight={() => 'auto'}
                    getRowClassName={(params) => {
                        if (dayjs().isSameOrAfter(params.row.endDate) && (params.row.status === 'Open' || 'Not Satisfied')) {
                            return 'row-theme--Overdue'
                        } else if ((params.row.status === 'Complete') || (params.row.status === 'Waiver Granted')) {
                            return 'row-theme--Green'
                        } else if ((params.row.status === 'Waiver Requested') || (params.row.status === 'Not Applicable')) {
                            return 'row-theme--Yellow'
                        } else if (params.row.status === 'Not Satisfied') {
                            return 'row-theme--Orange'
                        }
                    }}
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
                        },
                        '.MuiDataGrid-cell:focus': {
                            outline: "none",
                        },
                        '& .edit-task-button--cell': {
                            paddingLeft: 0,
                        },
                        '& .row-theme--Overdue': {
                            backgroundColor: '#E46C66'
                        },
                        '& .row-theme--Green': {
                            backgroundColor: '#98ECA0'
                        },
                        '& .row-theme--Yellow': {
                            backgroundColor: '#F2E891'
                        },
                        '& .row-theme--Orange': {
                            backgroundColor: '#F4AC7C'
                        },
                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#B7B7B8",
                        },
                    }}
                />
            </Box>

            {tasks && team ? <TaskModal task={""} tasks={tasks} setTasks={setTasks} team={team} /> : null}

        </Paper>
    )
}

export default ProjectTasks