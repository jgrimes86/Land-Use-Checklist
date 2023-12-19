import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Paper, Modal, Stack, TextField } from '@mui/material';

import EditTemplateItem from "./EditTemplateItem";

function EditTemplate({templates, setTemplates, templateId}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [template, setTemplate] = useState('')
    const [tasks, setTasks] = useState([{name: '', description: ''}])
   
    useEffect(() => {
        if (templateId) {
            fetch(`/templates/${templateId}`)
            .then((r) => {
                if (r.ok) {
                    r.json()
                    .then(data => {
                        setTemplate(data)
                        setTasks(data.tasks)
                        // console.log(data)
                    })
                } else {
                    r.json()
                    .then(({error}) => console.log(error))
                }
            })
        }
    }, [])

    const formikSchema = yup.object().shape({
        title: yup.string().required("Must enter a template title")
    })
    
    const templateFormik = useFormik({
        initialValues: {
            title: template ? template.title : "",
        },
        validationSchema: formikSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            handleSubmit(values)
        }
    })
    
    const taskList = template ? tasks.map((task, index) => {
        return (
                <EditTemplateItem key={`task-${index}`} index={index} task={task} tasks={tasks} setTasks={setTasks} />
        )
    }) : [];

    function newTask() {
        setTasks(currentTasks => [...currentTasks, {name: '', description: ''}])
    }

    function handleSubmit(values) {
        // console.log(tasks)
        const url = templateId ? `/templates/${templateId}` : '/templates';
        const method = templateId ? 'PATCH' : 'POST';
        fetch(url, {
            method: method,
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
                    if (template) {
                        setTemplates(templates => templates.map(temp => {
                            if (temp.id === newTemplate.id) {
                                return newTemplate
                            } else return temp
                        }))
                    } else {
                        setTemplates([...templates, newTemplate]);
                    }
                    handleClose()
                })
            } else {
                r.json()
                .then(({error}) => console.log(error))
            }
        })
    }
    
    const modalButton = templateId ? 'Edit Template' : 'Add New Template';
    const modalHeading = templateId ? 'Edit Task Template' : 'Create New Task Template';
    const saveButton = templateId ? 'Save Changes' : 'Save Template';
    const cancelButton = templateId ? 'Cancel Changes' : 'Discard Template';

    return (
        <>
            <Button onClick={handleOpen}>{modalButton}</Button>

            <Modal open={open} >
                <Paper >
                    
                    <h1>{modalHeading}</h1>

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

                        <Button variant="contained" type="submit" >
                            {saveButton}
                        </Button>
                        <Button variant="outlined" onClick={handleClose}>
                            {cancelButton}
                        </Button>
                    </Box>

                    {taskList}

                    <Button variant="contained" onClick={newTask}>Add Task</Button>
                </Paper>
            </Modal>
        </>
    )
}

export default EditTemplate