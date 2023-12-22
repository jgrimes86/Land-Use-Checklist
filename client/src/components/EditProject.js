import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Stack, TextField, Typography } from '@mui/material';

import EditTeam from "./EditTeam";
import Loading from "./Loading";

function EditProject() {
    const {project, setProject, roles, setRoles, user, users} = useOutletContext()
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const projectSchema = yup.object().shape({
        name: yup.string().required("You must enter a project name"),
        client: yup.string(),
        propertyAddress: yup.string(),
        propertyLot: yup.string(),
        propertyBlock: yup.string(),
        municipality: yup.string(),
        county: yup.string(),
        state: yup.string(),
      });

    const projectFormik = useFormik({
        initialValues: {
            name: project ? project.name : "",
            client: project ? project.client : "",
            property_address: project ? project.property_address : "",
            property_lot: project ? project.property_lot : "",
            property_block: project ? project.property_block : "",
            municipality: project ? project.municipality : "",
            county: project ? project.county : "",
            state: project ? project.state : "",
        },
        enableReinitialize: true,
        validationSchema: projectSchema,
        validateOnChange: false,
        onSubmit: (values) => {
            const method = project ? "PATCH" : "POST";
            const url = project ? `/projects/${params.id}` : `/projects`;
            fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    r.json().then((newProject) => {
                        if (!project) {
                            fetch('/roles', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    role: "",
                                    user_id: user.id,
                                    project_id: newProject.id
                                }),
                            })
                            .then((r) => {
                                if (r.ok) {
                                    r.json()
                                    .then(newRole => {
                                        setRoles([...roles, newRole])
                                        setProject(newProject);
                                        setError(null);
                                        navigate(`/projects/${newProject.id}`)
                                    })
                                }
                            })
                        } else {
                            setProject(newProject);
                            setError(null);
                            navigate(`/projects/${newProject.id}`)
                        }
                    });
                }
                else {
                    r.json()
                    .then(({error}) => setError(error))
                }
            })
        },
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    function deleteProject() {
        fetch(`/projects/${params.id}`, {
            method: "DELETE"
        })
        .then((r) => {
            if (r.ok) {
                setProject("")
                setRoles("")
                navigate(`/home`)
            }
        })
    }

    if (!user) return <Loading />
      
    const priorURL = project ? `/projects/${params.id}` : `/home`;
    const createEditButton = project ? "Save Changes" : "Create Project";

    return (
        <Box>

            <Paper
                elevation={2} 
                sx={{
                    mt: 2,
                }}
            >
                <Box 
                    sx={{
                        display:'flex', 
                        flexDirection:'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography sx={{m:1.5, pt:1, pb:1}} variant="h4">{project ? project.name : "Create a New Project"}</Typography>
                    <Button 
                        variant="outlined" 
                        onClick={handleClickOpen}
                        sx={{m:2.5}}
                    >
                        Delete Project
                    </Button>
                </Box>
                <Typography sx={{color: "red"}} variant="h7">{error}</Typography>
            </Paper>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                <Paper
                    elevation={2} 
                    sx={{
                        mt:2,
                        mr:1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '50%',
                        maxHeight: 850,
                        overflow: 'auto',
                    }}
                >
                    <Typography variant="h6" sx={{mt:2}}>
                        Project Details
                    </Typography>
                    <Box 
                        component="form"
                        onSubmit={projectFormik.handleSubmit}
                        sx={{ m: 2 }}
                    >
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="name" 
                            name="name"
                            label="Name"
                            value={projectFormik.values.name} 
                            onChange={projectFormik.handleChange} 
                            error={!!projectFormik.errors.name}
                            helperText={projectFormik.errors.name}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="client" 
                            name="client"
                            label="Client" 
                            value={projectFormik.values.client} 
                            onChange={projectFormik.handleChange}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="property_address" 
                            name="property_address" 
                            label="Property Address"
                            value={projectFormik.values.property_address} 
                            onChange={projectFormik.handleChange}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="property_lot" 
                            name="property_lot" 
                            label="Lot"
                            value={projectFormik.values.property_lot} 
                            onChange={projectFormik.handleChange}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="property_block" 
                            name="property_block" 
                            label="Block"
                            value={projectFormik.values.property_block} 
                            onChange={projectFormik.handleChange}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="municipality" 
                            name="municipality" 
                            label="Municipality"
                            value={projectFormik.values.municipality} 
                            onChange={projectFormik.handleChange}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="county" 
                            name="county" 
                            label="County"
                            value={projectFormik.values.county} 
                            onChange={projectFormik.handleChange}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="state" 
                            name="state" 
                            label="State"
                            value={projectFormik.values.state} 
                            onChange={projectFormik.handleChange}
                        />

                        <Stack spacing={2} sx={{mt: 1.5}} direction="row" justifyContent='center'>
                            <Button 
                                type="submit" 
                                variant="contained"
                                // sx={{ mt: 3, mb: 2 }}
                            >
                                {createEditButton}
                            </Button>

                            <Button
                                onClick={() => {
                                    projectFormik.resetForm({
                                        values: projectFormik.initialValues
                                    });
                                    navigate(priorURL)
                                }}
                                type="reset"
                                variant="outlined"
                                // sx={{ mt: 3, mb: 2 }}
                            >
                                Discard Changes
                            </Button>
                        </Stack>
                    </Box>
                </Paper>

                {project && <EditTeam roles={roles} setRoles={setRoles} users={users}
                setError={setError} />}

            </Box>
            
            <>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete Project?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deleting this Project will also delete all related tasks and team member roles.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => {
                            deleteProject();
                            handleClose();
                        }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        </Box>
    )
}

export default EditProject