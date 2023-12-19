import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Paper, Stack, TextField } from '@mui/material';

import EditTemplateItem from "./EditTemplateItem";

function EditTemplate({templates, setTemplates}) {
    const [tasks, setTasks] = useState([{name: '', description: ''}])
   
    const formikSchema = yup.object().shape({
        title: yup.string().required("Must enter a template title")
    })
    
    const templateFormik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: formikSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            handleSubmit(values)
        }
    })
    
    const taskList = tasks.map((task, index) => {
        return (
                <EditTemplateItem key={index} index={index} task={task} tasks={tasks} setTasks={setTasks} />
        )
    })

    function newTask() {
        setTasks(currentTasks => [...currentTasks, {name: '', description: ''}])
    }

    function handleSubmit(values) {
        console.log(tasks)
        fetch('/templates', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: values.title,
                tasks: tasks
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(newTemplate => {
                    setTemplates([...templates, newTemplate])
                })
            } else {
                r.json()
                .then(({error}) => console.log(error))
            }
        })
    }
    
    return (
        <Paper >
            <h1>Create New Task Template</h1>

            <Box
                component="form"
                onSubmit={templateFormik.handleSubmit}
                sx={{
                    m: 1,
                    width: 300,
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="template-name"
                    name="title"
                    label="Template Name"
                    value={templateFormik.values.title}
                    onChange={templateFormik.handleChange}
                />

                <Button 
                    variant="contained" 
                    type="submit" 
                >
                    Save Template
                </Button>
            </Box>

            {taskList}

            <Button variant="contained" onClick={newTask}>Add Task</Button>
        </Paper>
    )
}

export default EditTemplate