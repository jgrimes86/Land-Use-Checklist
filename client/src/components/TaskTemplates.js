import { useState } from "react";
import { Box, Button, Paper, Stack, TextField } from '@mui/material';

import TaskTemplatesItem from "./TaskTemplatesItem";

function TaskTemplates() {
    const [templateTitle, setTemplateTitle] = useState('')
    const [tasks, setTasks] = useState([{name: '', description: ''}])

    console.log(tasks)

    const taskList = tasks.map((task, index) => {
        return (
                <TaskTemplatesItem key={index} index={index} task={task} tasks={tasks} setTasks={setTasks} />
        )
    })

    function handleTitleChange(event) {
        setTemplateTitle(event.target.value)
    }

    function newTask() {
        setTasks(currentTasks => [...currentTasks, {name: '', description: ''}])
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("submit clicked")
    }
    
    return (
        <Paper >
            <h1>This will have the Task Templates</h1>

            <Box
                component="form"
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
                    value={templateTitle}
                    onChange={handleTitleChange}
                />

                <Button 
                    variant="contained" 
                    type="submit" 
                    onClick={handleSubmit}
                >
                    Save Template
                </Button>
            </Box>

            {taskList}

            <Button variant="contained" onClick={newTask}>Add Task</Button>

        </Paper>
    )
}

export default TaskTemplates