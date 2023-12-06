
import { useState, useEffect } from "react"
import { Box, Button } from "@mui/material"


function Home({user}) {
    const [userProjects, setUserProjects] = useState([])

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

    const projectList = userProjects.map(project => {
        const {id, name, client, property_address, property_block, property_lot, municipality, county, state} = project
        return (
            <Button key={id} variant="contained" >
                <h3>{name}</h3>
                <p>{client}, {property_address}</p>
                <p>{property_block}, {property_lot}, {municipality}, {county}, {state}</p>
            </Button>
        )
    })



    return (
        <Box>
            <h1>{user.name}</h1>
            <Box>
                <h2>My Projects</h2>
                {projectList}
            </Box>
            <h2>My Tasks</h2>
        </Box>
    )
}

export default Home