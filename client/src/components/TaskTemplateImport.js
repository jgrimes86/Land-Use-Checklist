import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Autocomplete, Box, Button, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 900,
    maxHeight: "75%",
    bgcolor: 'background.paper',
    border: '2px solid #2B2D42',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
}

function TaskTemplateImport({templates, setTasks}) {
    const [autocompleteValue, setAutocompleteValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const params = useParams();
    const [selectedTemplate, setSelectedTemplate] = useState('')

    const templateOptions = templates ? templates.map(temp => {
        return {label: temp.title, templateId: temp.id}
    }): [];

    function handleOptionClick(templateId) {
        fetch(`/templates/${templateId}`)
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => {
                    setSelectedTemplate(data)
                })
            } else {
                r.json()
                .then(({error}) => console.log(error))
            }
        })
    }

    function handleImport() {
        fetch(`/projects/${params.id}/templates`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedTemplate)
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => {
                    setTasks((currentTasks) => [...currentTasks, ...data])
                    setAutocompleteValue(null);
                    setInputValue('')
                })
            } else {
                r.json()
                .then(({error}) => console.log(error))
            }
        })
    }

    const rows = selectedTemplate ? selectedTemplate.task_list.map(task => {
            return ({
                id: task.id,
                name: task.name,
                description: task.description
            })
        }) : [];

    return (

        <Paper
            elevation={2}
            sx={{
                mt: 2,
                width: 300
            }}
        >
            <Autocomplete 
                disableClearable
                value={autocompleteValue}
                onChange={(event, value) => {
                    setAutocompleteValue(value)
                    if (event.type === 'click' || event.keyCode === 13) {
                        // event.stopPropagation();
                        handleOptionClick(value.templateId);
                        handleOpen();
                    }
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue)
                }}
                id="template-select"
                options={templateOptions}
                getOptionLabel={option => option.label}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                sx={{ width: 300, height:'auto' }}
                renderInput={(params) => <TextField {...params} label="Import Tasks From Template" />}
            />
            <Modal open={open}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" align='center'>
                        Task Template: {selectedTemplate.title}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '100%', overflow:'auto', mt:2 }} >
                            <TableHead>
                                <TableRow sx={{backgroundColor: '#2B2D42'}}>
                                    <TableCell sx={{color:'white'}}>Task Name</TableCell>
                                    <TableCell sx={{color:'white'}}>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name+row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell >{row.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Stack
                        spacing={2} 
                        direction="row"
                        justifyContent='center'
                        sx={{mt:3}}
                    >
                        <Button 
                            variant="contained" 
                            onClick={() => {
                                handleImport();
                                handleClose()
                            }}
                        >
                            Import Tasks
                        </Button>

                        <Button 
                            variant="outlined" 
                            onClick={() => {
                                handleClose();
                                setAutocompleteValue(null);
                                setInputValue('')
                            }}
                        >
                            Cancel Import
                        </Button>

                    </Stack>

                </Box>
            </Modal>
        </Paper>
    )
}

export default TaskTemplateImport