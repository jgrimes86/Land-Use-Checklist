import { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { useFormik } from "formik";

import { Box, Button, Container, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from "dayjs";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: "75%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
}

function TaskModal({task, tasks, setTasks, team}) {
    const location = useLocation();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formik = useFormik({
        initialValues: {
            name: task.name ? task.name : "",
            description: task.description ? task.description : "",
            start_date: dayjs(task.start_date) ? dayjs(task.start_date) : "",
            end_date: dayjs(task.end_date) ? dayjs(task.end_date) : "",
            status: task.status ? task.status : "",
            comments: task.comments ? task.comments : "",
            user_id: task.user_id ? task.user_id : "",
        },

        onSubmit: (values) => {
            fetch(`/tasks/${task.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    r.json()
                    .then((updatedTask) => {
                        setTasks(tasks.map(task => {
                            if (updatedTask.id === task.id) {
                                return updatedTask
                            } else return task
                        }));
                        handleClose()
                })
                }
            })
        },
    })

    function handleDelete() {
        fetch(`/tasks/${task.id}`, {
            method: 'DELETE'
        })
        .then((r) => {
            if (r.ok) {
                setTasks(tasks.filter(t => {
                    if (t.id !== task.id) return t
                }));
                handleClose()
            } else {
                r.json().then(({error}) => console.log(error))
            }
        })
    }

    const taskTitle = (location.pathname===`/users/${params.id}`) ? task.project.name : task.name;


    const teamOptions = team ? team.map(tm => {
            return <MenuItem key={tm.id} value={tm.id}>{tm.name}</MenuItem>
        }) : [];


    // console.log("team options: ", teamOptions)

    return (
        <div>
            <Button 
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpen()
                }}
            >
                Edit
            </Button>
            <Modal
                open={open}
            >
                    <Box sx={modalStyle}>
                        <Typography>
                            {taskTitle}
                        </Typography>
                        <Box 
                            component="form"
                            onSubmit={formik.handleSubmit}
                        >
                            <TextField
                                margin="normal"
                                fullWidth
                                id="name"
                                name="name"
                                label="Task Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="description"
                                name="description"
                                label="Description"
                                multiline
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="comments"
                                name="comments"
                                label="Comments"
                                multiline
                                value={formik.values.comments}
                                onChange={formik.handleChange}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'nowrap',
                                }}
                            >
                                <DatePicker 
                                    label="Start Date"
                                    value={formik.values.start_date}
                                    onChange={formik.handleChange}
                                />

                                <DatePicker 
                                    label="Due Date"
                                    value={formik.values.end_date}
                                    onChange={formik.handleChange}
                                />
                            </Box>

                            {/* Add selection for responsible team member for project page view */}
                            <InputLabel id="team-member-label">Resonsible Team Member</InputLabel>
                            <Select
                                fullWidth
                                labelId="team-member-label"
                                id="user_id"
                                name="user_id"
                                value={formik.values.user_id}
                                onChange={formik.handleChange}
                            >
                                {teamOptions}
                            </Select>

                            <InputLabel id="status-label">status</InputLabel>
                            <Select
                                fullWidth
                                labelId="status-label"
                                id="status"
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value='open'>Open</MenuItem>
                                <MenuItem value='complete'>Complete</MenuItem>
                                <MenuItem value='waiver_requested'>Waiver Requested</MenuItem>
                                <MenuItem value='not_applicable'>Not Applicable</MenuItem>
                                <MenuItem value='incomplete'>Incomplete</MenuItem>
                            </Select>

                            

                            <Stack 
                                spacing={2} 
                                direction="row"
                            >
                                <Button 
                                    type="submit" 
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Save Changes
                                </Button>
                                <Button 
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                                <Button 
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleDelete}
                                >
                                    Delete Task
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
            </Modal>
        </div>
    )
}

export default TaskModal