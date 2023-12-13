import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

import { Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, Grid, InputLabel, Link, MenuItem, Select, Stack, TextField, ThemeProvider, Typography } from '@mui/material';


import TeamList from "./TeamList";

function EditProject() {
    const {project, setProject, roles, setRoles, user, users, setUsers} = useOutletContext()
    const [error, setError] = useState(null);
    const [teamFormData, setTeamFormData] = useState([])

    // console.log(users)

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const priorURL = (location.pathname===`/projects/${params.id}/edit`) ? `/projects/${params.id}` : `/users/${user.id}`;

    ////////////////////////// PROJECT FORMIK START /////////////////////////////////
  
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
            propertyAddress: project ? project.property_address : "",
            propertyLot: project ? project.property_lot : "",
            propertyBlock: project ? project.property_block : "",
            municipality: project ? project.municipality : "",
            county: project ? project.county : "",
            state: project ? project.state : "",
        },
        enableReinitialize: true,
        validationSchema: projectSchema,
        validateOnChange: false,
        onSubmit: (values) => {
            
            const method = project ? "PATCH" : "POST";

            const url = project ? `/projects/${project.id}` : `/projects`;
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
                    setProject(newProject);
                    setError(null);
                    navigate(`/projects/${newProject.id}`)
                });
            }
            else {
                r.json()
                .then(({error}) => setError(error))
            }
            });
        },
      });

    const createEditButton = project ? "Save Changes" : "Create Project";
////////////////////////// PROJECT FORMIK END /////////////////////////////////////

////////////////////// NEW TEAM MEMBER FORMIK START ////////////////////////////
    const addTeamFormik = useFormik({
        initialValues: {
            role: "",
            user_id: "",
            project_id: params.id
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            fetch('/roles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    r.json()
                    .then(newMember => {
                        setRoles([...roles, newMember]);
                        setError(null)
                    })
                }
            })
        }
    })

    const teamOptions = users ? users.map(u => {
        return <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>
    }) : [];

////////////////////// NEW TEAM MEMBER FORMIK End ////////////////////////////
    

    return (
        <Container>

            <Typography>Project Page</Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '50%'
                    }}
                >
                    <Typography>
                        Project Details
                    </Typography>
                    <Box 
                        component="form"
                        onSubmit={projectFormik.handleSubmit}
                        // sx={{ mt: 1 }}
                    >
                            <TextField 
                                margin="normal"
                                fullWidth
                                id="name" 
                                name="name"
                                label="Name"
                                value={projectFormik.values.name} 
                                onChange={projectFormik.handleChange} 
                                error={projectFormik.errors.name}
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
                                id="propertyAddress" 
                                name="propertyAddress" 
                                label="Property Address"
                                value={projectFormik.values.propertyAddress} 
                                onChange={projectFormik.handleChange}
                            />
                            <TextField 
                                margin="normal"
                                fullWidth
                                id="propertyLot" 
                                name="propertyLot" 
                                label="Lot"
                                value={projectFormik.values.propertyLot} 
                                onChange={projectFormik.handleChange}
                            />
                            <TextField 
                                margin="normal"
                                fullWidth
                                id="propertyBlock" 
                                name="propertyBlock" 
                                label="Block"
                                value={projectFormik.values.propertyBlock} 
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

                            <Stack spacing={2} direction="row">
                                <Button 
                                    type="submit" 
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
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
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Discard Changes
                                </Button>
                            </Stack>

                    </Box>
                </Box>

{/* form for adding and editing team members */}


                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '50%'
                    }}
                    >
                    <Typography>Team Members</Typography>

                    {roles ? <TeamList roles={roles} setRoles={setRoles} users={users}/> : null}
                    
                    <Box 
                        component="form"
                        onSubmit={addTeamFormik.handleSubmit}
                        noValidate
                        sx={{ 
                            mt: 1,
                            width: '90%'
                        }}
                    >

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: 'nowrap',
                            }}
                        >
                            <TextField 
                                id='role'
                                name='role'
                                placeholder="Team Member Role"
                                value={addTeamFormik.values.role}
                                onChange={addTeamFormik.handleChange}
                                sx={{
                                    width: '50%'
                                }}
                            />
                            
                            <FormControl 
                                sx={{
                                    width: '50%'
                                }}
                            >
                                <InputLabel id="team-member-label">Select a Team Member</InputLabel>
                                <Select 
                                    labelId="team-member-label"
                                    id="user_id"
                                    name="user_id"
                                    label="Select a Team Member"
                                    value={addTeamFormik.values.user_id}
                                    onChange={addTeamFormik.handleChange}
                                >
                                    {teamOptions}
                                </Select>

                            </FormControl>
                        </Box>
                        <Button 
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Team Member
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Container>

    )
}

export default EditProject