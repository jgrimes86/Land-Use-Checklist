import { Box, Button, TextField } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function EditTemplateItem({index, task, tasks, setTasks}) {

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
                mt: 1, 
                width: '100%',
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                name="name"
                label="Task Name"
                value={task.name}
                onChange={handleChange}
                sx={{ width: '45%', mr:1 }}
                multiline
                minRows={1}
                maxRows={4}
            />
            <TextField
                name="description"
                label="Task Description"
                value={task.description}
                onChange={handleChange}
                sx={{ width: '45%', mr:1 }}
                multiline
                minRows={1}
                maxRows={4}
            />
            
            <Button 
                variant="contained" 
                sx={{width: 50, maxHeight: 50}}
                onClick={handleDelete}
            >
                <DeleteForeverIcon/>
            </Button>
        </Box>
    )
}

export default EditTemplateItem