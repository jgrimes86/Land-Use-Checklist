import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';

function UserProjects({user}) {
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

    const projectList = userProjects.map(project => {
        const {id, name, client, property_address, property_block, property_lot, municipality, county, state} = project
        return (
            <Button key={id} colorScheme="blue" onClick={() => handleNavigate(id)} >
                <h3>{name}</h3>
                <p>{client}, {property_address}</p>
                <p>{property_block}, {property_lot}, {municipality}, {county}, {state}</p>
            </Button>
        )
    })

    return (
        <div>
            <h2>My Projects</h2>
            {projectList}
            <Button colorScheme="blue" >Create New Project</Button>
        </div>
    )
}

export default UserProjects
