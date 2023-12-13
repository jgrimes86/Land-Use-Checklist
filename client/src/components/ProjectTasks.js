import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from "dayjs";



import TaskModal from "./TaskModal";

function ProjectTasks() {
    const params = useParams();
    const [tasks, setTasks] = useState([]);
    const [team, setTeam] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            width: 400,
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
            startDate: dayjs(task.start_date).format('YYYY-MM-DD'),
            endDate: dayjs(task.end_date).format('YYYY-MM-DD'),
            status: task.status,
            user: task.user ? task.user.name : ""
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
            {tasks && team ? <TaskModal task={""} tasks={tasks} setTasks={setTasks} team={team} /> : null}
        </Box>
    )
}

export default ProjectTasks