import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, List, ListItem, ListItemText } from '@mui/material';


function UserProjects({user, setProject, setRoles}) {
    const [userProjects, setUserProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/users/${user.id}/roles`)
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
                <Button onClick={() => handleNavigate(id)}>Go to project</Button>
            </ListItem>
        )
    })

    return (
        <Box>
            <List sx={{width:'95%',}}>
                {projectList}
            </List>
            <Button 
                onClick={handleCreateProject}
            >
                Create New Project
            </Button>
        </Box>

    )
}

export default UserProjects
