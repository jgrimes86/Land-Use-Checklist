import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, List, ListItem, ListItemText } from '@mui/material';


function UserProjects({user, setProject, setTeam}) {
    const [userProjects, setUserProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/roles/users/'+user.id)
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
        setTeam("");
        navigate('/projects/0/edit');
    }

    const projectList = userProjects.map(project => {
        const {id, name, client, property_address, property_block, property_lot, municipality, county, state} = project;
        const projectDetails = () => (
            <div>
                <p>{`${client}, ${property_address}`}</p>
                <p>{`Block ${property_block}, Lot ${property_lot}, ${municipality}, ${county}, ${state}`}</p>
            </div>
        );
        return (
            <ListItem key={id} onClick={() => handleNavigate(id)} >
                <ListItemText 
                    primary={name}
                    secondary={projectDetails()}
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
