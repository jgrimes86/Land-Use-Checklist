import { useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
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
    border: '2px solid #2B2D42',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
}

function TaskModal({task, tasks, setTasks, users}) {
    const location = useLocation();
    const params = useParams();
    const [inputValue, setInputValue] = useState("")
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formikSchema = yup.object().shape({
        name: yup.string().required('Must enter a task name'),
        description: yup.string(),
        start_date: yup.date(),
        end_date: yup.date().min(yup.ref('start_date')),
        status: yup.string(),
        comments: yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            name: task.name ? task.name : "",
            description: task.description ? task.description : "",
            start_date: dayjs(task.start_date) ? dayjs(task.start_date) : dayjs(),
            end_date: dayjs(task.end_date) ? dayjs(task.end_date) : dayjs(),
            status: task.status ? task.status : "",
            comments: task.comments ? task.comments : "",
            user_name: task.user? task.user.name : "",
            user_id: task.user_id ? task.user_id : "",
        },
        validationSchema: formikSchema,
        validateOnChange: false,
        onSubmit: (values) => {
            const url = task ? `/tasks/${task.id}` : `/projects/${params.id}/tasks`;
            const method = task ? 'PATCH' : 'POST';
            fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    r.json()
                    .then((data) => {
                        if (task) {
                            setTasks(tasks.map(task => {
                                if (data.id === task.id) {
                                    return data
                                } else return task
                            }));
                        } else {
                            setTasks([...tasks, data])
                        };
                        handleClose()
                    })
                }
            })
        }
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

    const taskTitle = (location.pathname===`/home`) ? task.project.name : task.name;

    const options = users ? users.map(user => {
        return {label: user.name, user_id: user.id}
    }) : [];

    const buttonText = task ? "Edit" : "Add Task";
    const buttonStyle = task ? {width:80, m:0.5} : {width:'auto', m:2, ml:1.5};
    const saveButtonText = task ? "Save Changes" : "Create Task";

    return (
        <Box>
            <Button 
                variant = "contained"
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                    console.log(task)
                }}
                sx={buttonStyle}
            >
                {buttonText}
            </Button>
            <Modal
                open={open}
            >
                <Box sx={modalStyle}>
                    <Typography variant="h6" align='center'>
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
                            error={formik.errors.name}
                            helperText={formik.errors.name}
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
                                mt:2
                            }}
                        >
                            <DatePicker 
                                label="Start Date"
                                format="YYYY-MM-DD"
                                value={formik.values.start_date}
                                onChange={(value) => {
                                    formik.setFieldValue('start_date', dayjs(value));
                                    }}
                            />

                            <DatePicker 
                                label="Due Date"
                                format="YYYY-MM-DD"
                                value={formik.values.end_date}
                                onChange={(value) => {
                                    formik.setFieldValue('end_date', dayjs(value));
                                    }}
                            />
                        </Box>

                        {formik.errors.end_date ? <Typography sx={{color:"red"}}>Due Date cannot be earlier than Start Date</Typography> : null}


                        <Autocomplete 
                            id="user_name"
                            name="user_name"
                            options={options}
                            value={formik.values.user_name}
                            onChange={(event, newValue) => {
                                formik.setFieldValue('user_name', newValue.label);
                                formik.setFieldValue('user_id', newValue.user_id)
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue)
                            }}
                            isOptionEqualToValue={(option, value) => option.label === formik.values.user_name}

                            sx={{width: '100%', mt:2.5}}
                            disableClearable
                            renderInput={(params) => <TextField {...params} label="Select a Team Member" />}
                        />

                        <FormControl
                            fullWidth
                            sx={{
                                mt: 3
                            }}
                        >
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                fullWidth
                                labelId="status-label"
                                id="status"
                                name="status"
                                label="Status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value='Open'>Open</MenuItem>
                                <MenuItem value='Complete'>Complete</MenuItem>
                                <MenuItem value='Waiver Requested'>Waiver Requested</MenuItem>
                                <MenuItem value='Waiver Granted'>Waiver Granted</MenuItem>
                                <MenuItem value='Not Applicable'>Not Applicable</MenuItem>
                                <MenuItem value='Not Satisfied'>Not Satisfied</MenuItem>
                            </Select>
                        </FormControl>

                        <Stack 
                            spacing={2} 
                            direction="row"
                            justifyContent='center'
                            sx={{mt:2}}
                        >
                            <Button 
                                type="submit" 
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {saveButtonText}
                            </Button>
                            <Button 
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => {
                                    handleClose();
                                    formik.resetForm({
                                        values: formik.initialValues
                                    })
                                }}
                            >
                                Close
                            </Button>
                            {task && <Button 
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleDelete}
                            >
                                Delete Task
                            </Button>}
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default TaskModal