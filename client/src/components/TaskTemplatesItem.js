import { Box, Button, TextField } from '@mui/material';

function TaskTemplatesItem({index, task, tasks, setTasks}) {

    function handleChange(event) {
        const allTasks = [...tasks];
        allTasks[index][event.target.name] = event.target.value;
        setTasks(allTasks)
    }

    function handleDelete() {
        const allTasks = [...tasks];
        allTasks.splice(index, 1);
        setTasks(allTasks);
    }

    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: 'row',
                m: 1, width: 500,
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                name="name"
                label="Task Name"
                value={task.name}
                onChange={handleChange}
            />
            <TextField
                name="description"
                label="Task Description"
                value={task.description}
                onChange={handleChange}
            />
            <Button variant="outlined" onClick={handleDelete}>Delete Task</Button>
        </Box>
    )
}

export default TaskTemplatesItem