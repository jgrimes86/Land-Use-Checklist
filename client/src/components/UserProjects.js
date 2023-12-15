import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, List, ListItem, ListItemText, Paper } from '@mui/material';


function UserProjects({user, setProject, setRoles}) {
    const [userProjects, setUserProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/users/${user.id}/projects`)
        .then((r) => {
            if (r.ok) {
                r.json().then(projects => setUserProjects(projects))
            }
            else {
                r.json().then(({error}) => console.log(error))
            }
        })
    }, [])

    function handleNavigate(projectId) {
        navigate(`/projects/${projectId}`)
    }

    function handleCreateProject() {
        setProject("");
        setRoles("");
        navigate('/projects/0/edit');
    }

    const projectList = userProjects.map(project => {
        const {id, name, client, property_address, property_block, property_lot, municipality, county, state} = project;
        return (
            <ListItem key={id} >
                <ListItemText 
                    primary={name}
                    secondary={`${client}, ${property_address} Block ${property_block}, Lot ${property_lot}, ${municipality}, ${county}, ${state}`}
                    secondaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                />
                <Button variant="contained" onClick={() => handleNavigate(id)}>Go to project</Button>
            </ListItem>
        )
    })

    return (
        <Paper
            elevation={2} 
            sx={{
                mt: 2,
            }}
        >
            <List sx={{width:'100%',}}>
                {projectList}
            </List>
            <Button 
                onClick={handleCreateProject}
                variant="outlined"
                sx={{
                    m:2,
                }}
            >
                Create New Project
            </Button>
        </Paper>

    )
}

export default UserProjects
