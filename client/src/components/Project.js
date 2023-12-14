
import { useMemo } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Box, Button, Paper, Typography } from '@mui/material';

import ProjectTasks from "./ProjectTasks";
import TeamList from "./TeamList";

function Project() {
    const params = useParams();
    const navigate = useNavigate();
    const {project, setProject, roles, setRoles, users} = useOutletContext()

    useMemo(() => {
        fetch(`/projects/${params.id}`)
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => setProject(data))
            }
        })

        fetch(`/projects/${params.id}/roles`)
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => setRoles(data))
            }
        })
    }, [])

    function handleEditClick() {
        navigate(`/projects/${params.id}/edit`)
    }

    if (!project) return <p>Loading...</p>

    return (
        <Box sx={{m:0.5}}>
            <Paper
                elevation={2} 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2
                }}
            >
                <Typography 
                    variant="h4"
                    sx={{ ml: 2 }}
                >
                    {project.name}
                </Typography>

                <Button 
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 2 }}
                    onClick={handleEditClick} 
                >
                    Edit Project
                </Button>
            </Paper>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                }}
            >
                <Paper
                    elevation={2}
                    sx={{
                        mt: 2,
                        mr: 1,
                        width: '50%'
                    }}
                >
                    <Box sx={{ml:2}}>
                        <Typography>{project.client}</Typography>
                        <Typography>{project.property_address}</Typography>
                        <Typography>{`Block ${project.property_block}, Lot ${project.property_lot}`}</Typography>
                        <Typography>{`${project.municipality}, ${project.county}, ${project.state}`}</Typography>
                    </Box>
                </Paper>
                <Paper
                    elevation={2}
                    sx={{
                        mt: 2,
                        ml: 1,
                        width: '50%'
                    }}
                >
                    <TeamList roles={roles} setRoles={setRoles} users={users} sx={{mr:2}}/>
                </Paper>
            </Box>
            <Paper
                elevation={2}
                sx={{mt:2}}
            >
                <ProjectTasks users={users} />
            </Paper>
        </Box>
    )
}

export default Project