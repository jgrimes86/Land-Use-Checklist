import { useState } from 'react';
import { json, useParams } from 'react-router-dom';
import { Autocomplete, Box, Button, Modal, Paper, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';


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
    overflow: 'scroll',
}

function ImportTaskTemplate({templates, setTasks}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const params = useParams();
    const [selectedTemplate, setSelectedTemplate] = useState('')

    const templateOptions = templates ? templates.map(temp => {
        return {label: temp.title, templateId: temp.id}
    }): [];

    function handleOptionClick(templateId) {
        console.log(selectedTemplate)
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
        fetch(`/projects/${params.id}/tasks`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'tasks': selectedTemplate.tasks})
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => {
                    console.log(data)
                })
            } else {
                r.json()
                .then(({error}) => console.log(error))
            }
        })
    }

    const rows = selectedTemplate ? selectedTemplate.tasks.map(task => {
        return ({
            id: task.id,
            name: task.name,
            description: task.description
        })
    }) : [];

    return (

        <Box>
            <Autocomplete 
                disablePortal
                id="template-select"
                options={templateOptions}
                getOptionLabel={option => option.label}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                sx={{ width: 300, height:'auto' }}
                renderInput={(params) => <TextField {...params} label="Import Tasks From Template" />}
                onChange={(event, value) => {
                    if (event.type === 'click' || event.keyCode === 13) {
                        handleOptionClick(value.templateId);
                        handleOpen();
                    }
                }}
            />
            <Modal open={open}>
                <Paper>
                    <Typography>{selectedTemplate.title}</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '100%' }} >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Task Name</TableCell>
                                    <TableCell>Description</TableCell>

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
                        sx={{mt:2}}
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

                        <Button variant="outlined" onClick={handleClose}>Cancel Import</Button>

                    </Stack>

                </Paper>
            </Modal>
        </Box>
    )
}

export default ImportTaskTemplate