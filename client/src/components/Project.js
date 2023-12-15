
import { useMemo } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Box, Button, Paper, Typography } from '@mui/material';

import ProjectTasks from "./ProjectTasks";
import TeamList from "./TeamList";
import Loading from "./Loading";

function Project() {
    const params = useParams();
    const navigate = useNavigate();
    const {project, setProject, roles, setRoles, users, setNavError} = useOutletContext()

    useMemo(() => {
        fetch(`/projects/${params.id}`)
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => {setProject(data); setNavError(null)})
            } else {
                r.json()
                .then(({error}) => {setNavError(error); navigate(`/404`)})
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

    if (!project) return <Loading />

    return (
        <Box >
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
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%'
                    }}
                >
                    <Typography variant="h4" sx={{m:1.5}} >
                        {project.name}
                    </Typography>

                    <Button 
                        variant="contained"
                        sx={{ 
                            m: 2, 
                            alignSelf: 'flex-start',
                            width: 200
                        }}
                        onClick={handleEditClick} 
                    >
                        Edit Project
                    </Button>
                    
                    <Box sx={{m:2}}>
                        <Typography sx={{fontWeight:'bold'}}>
                            Client: 
                        </Typography>
                        <Typography sx={{ml:2}}>
                            {project.client}
                        </Typography>
                        <div>
                            <Typography sx={{fontWeight:'bold'}}>
                                Property: 
                            </Typography>
                            <Typography sx={{ml:2}}>
                                {project.property_address}
                            </Typography>
                            <Typography sx={{ml:2}}>
                                Block {project.property_block}, Lot {project.property_lot}
                            </Typography>
                            <Typography sx={{ml:2}}>
                                {project.municipality}
                            </Typography>
                            <Typography sx={{ml:2}}>
                                {`${project.county}, ${project.state}`}
                            </Typography>
                        </div>
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
            <Box
                elevation={2}
                sx={{mt:2}}
            >
                <ProjectTasks users={users} />
            </Box>
        </Box>
    )
}

export default Project