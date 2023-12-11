
import { useEffect, useMemo } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Box, Button, Paper, Typography } from '@mui/material';


import ProjectTasks from "./ProjectTasks";
import TeamList from "./TeamList";

function Project() {
    const params = useParams();
    const navigate = useNavigate();
    const {project, setProject, team, setTeam, users, setUsers} = useOutletContext()

    // console.log("team: ", team)

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
                .then(data => setTeam(data))
            }
        })

        fetch('/users')
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => setUsers(data))
            }
        })
        
    }, [])

    function handleEditClick() {
        navigate(`/projects/${params.id}/edit`)
    }

    return (
        <Box>
            <Box>
                <h2>{project.name}</h2>

                <button onClick={handleEditClick} >Edit Project</button>
            </Box>
            <Box>
                <Paper>
                    <Typography>{project.client}</Typography>
                    <Typography>{project.property_address}</Typography>
                    <Typography>{`Block ${project.property_block}, Lot ${project.property_lot}`}</Typography>
                    <Typography>{`${project.municipality}, ${project.county}, ${project.state}`}</Typography>
                </Paper>
                <Box>
                    <TeamList team={team} />
                </Box>
            </Box>
            <Box>
                <ProjectTasks team={team} />
            </Box>
        </Box>
    )
}

export default Project