import { useState } from "react";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';

import EditTeam from "./EditTeam";


function EditProject() {
    const {project, setProject, roles, setRoles, user, users, setUsers} = useOutletContext()
    const [error, setError] = useState(null);
    // const [teamFormData, setTeamFormData] = useState([])


    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const priorURL = project ? `/projects/${params.id}` : `/users/${user.id}`;

  
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
        // enableReinitialize: true,
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

    const createEditButton = project ? "Save Changes" : "Create Project";

    return (
        <Container>

            <Typography variant="h4">{project ? project.name : "Create a New Project"}</Typography>
            <Typography sx={{color: "red"}} variant="h6">{error}</Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
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

                {project && <EditTeam roles={roles} setRoles={setRoles} users={users}
                setError={setError} />}

            </Box>

        </Container>

    )
}

export default EditProject