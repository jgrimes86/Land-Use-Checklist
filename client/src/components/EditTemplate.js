import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Paper, Modal, Stack, TextField, Typography } from '@mui/material';

import EditTemplateItem from "./EditTemplateItem";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    '@media (max-width: 1075px)': {
        width: 900
    },
    '@media (max-width: 975px)': {
        width: 800
    },
    '@media (max-width: 875px)': {
        width: 700
    },
    '@media (max-width: 775px)': {
        width: 500
    },
    maxHeight: "75%",
    border: '2px solid #2B2D42',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
}

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
                        setTasks(data.task_list)
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
    
    const taskList = tasks.map((task, index) => {
        return (
                <EditTemplateItem key={`task-${index}`} index={index} task={task} tasks={tasks} setTasks={setTasks} />
        )
    });

    function newTask() {
        setTasks(currentTasks => [...currentTasks, {name: '', description: ''}])
    }

    function handleSubmit(values) {
        const url = templateId ? `/templates/${templateId}` : '/templates';
        const method = templateId ? 'PATCH' : 'POST';
        fetch(url, {
            method: method,
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: values.title,
                task_list: tasks
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
                        }));
                        setTasks([{name: '', description: ''}])
                    } else {
                        setTemplates([...templates, newTemplate]);
                    }
                    handleClose()
                    setTasks([{name: '', description: ''}])
                    templateFormik.resetForm({
                        values: templateFormik.initialValues
                    })
                })
            } else {
                r.json()
                .then(({error}) => console.log(error))
            }
        })
    }

    function handleDelete() {
        fetch(`/templates/${templateId}`, {
            method: 'DELETE'
        })
        .then((r) => {
            if (r.ok) {
                setTemplates((currentTemplates) => currentTemplates.filter(temp => {if (temp.id !== templateId) return temp}));
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
    const buttonStyle = templateId ? {gridRow: '1', gridColumn: '4 / 5', width:'200px'}: {m:2, alignSelf: 'flex-start'};
    const buttonVariant = templateId ? 'outlined' : 'contained';

    return (
        <>
            <Button variant={buttonVariant} onClick={handleOpen} sx={buttonStyle}>{modalButton}</Button>

            <Modal open={open} >
                <Paper sx={modalStyle}>
                    
                    <Typography variant="h6" align='center'>{modalHeading}</Typography>

                    <Box
                        component="form"
                        onSubmit={templateFormik.handleSubmit}
                        sx={{
                            mt: 2,
                            mb: 2,
                            // width: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            
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
                            sx={{width: '100%'}}
                            multiline
                            maxRows={4}
                        />
                    </Box>

                    {taskList}

                    <Box 
                        sx={{
                            mt:2,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Button variant="contained" onClick={newTask}>
                            Add Task
                        </Button>
                        <Button 
                            variant="contained" 
                            type="submit" 
                            sx={{flexGrow:0}}
                            onClick={templateFormik.submitForm}
                        >
                            {saveButton}
                        </Button>
                        <Button variant="outlined" onClick={() => {
                            handleClose();
                            setTasks([{name: '', description: ''}])
                            templateFormik.resetForm({
                                values: templateFormik.initialValues
                            })
                        }}>
                            {cancelButton}
                        </Button>
                        {templateId && <Button 
                            variant="outlined" 
                            onClick={() => {
                                handleDelete();
                                handleClose();
                                setTasks([{name: '', description: ''}])
                                templateFormik.resetForm({
                                    values: templateFormik.initialValues
                                })
                            }}
                        >
                            Delete Template
                        </Button>}
                    </Box>
                </Paper>
            </Modal>
        </>
    )
}

export default EditTemplate