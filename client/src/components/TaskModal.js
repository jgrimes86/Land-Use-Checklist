import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Box, Button, Modal, Typography } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

function TaskModal({task, userTasks, setUserTasks}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formik = useFormik({
        initialValues: {
            name: task.name,
            description: task.description,
            start_date: task.start_date,
            end_date: task.end_date,
            status: task.status,
            comments: task.comments,
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
                        setUserTasks(userTasks.map(task => {
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
                setUserTasks(userTasks.filter(t => {
                    if (t.id !== task.id) return t
                }));
                handleClose()
            } else {
                r.json().then(({error}) => console.log(error))
            }
        })
    }




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
                // onClose={handleClose}
            >
                <Box sx={modalStyle}>


                <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />

                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />

                        <label htmlFor="comments">Comments</label>
                        <input
                        // should be text area or multi-line input
                            id="comments"
                            name="comments"
                            value={formik.values.comments}
                            onChange={formik.handleChange}
                        />

                        <label htmlFor="start_date">Start Date</label>
                        <input
                            id="start_date"
                            name="start_date"
                            value={formik.values.start_date}
                            onChange={formik.handleChange}
                        />

                        <label htmlFor="end_date">Due Date</label>
                        <input
                            id="end_date"
                            name="end_date"
                            value={formik.values.end_date}
                            onChange={formik.handleChange}
                        />

                        <label htmlFor="status">status</label>
                        <select
                            id="status"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                        >
                            <option value='open'>Open</option>
                            <option value='complete'>Complete</option>
                            <option value='waiver_requested'>Waiver Requested</option>
                            <option value='not_applicable'>Not Applicable</option>
                            <option value='incomplete'>Incomplete</option>
                        </select>

                        <Button type="submit" >
                            Save Changes
                        </Button>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={handleDelete}>
                            Delete Task
                        </Button>
                    </form>


                </Box>

            </Modal>

        </div>
    )
}

export default TaskModal