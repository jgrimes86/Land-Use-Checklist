
import { Box, Button } from "@mui/material"


function Home({user}) {



    return (
        <Box>
            <h1>{user.name}</h1>
            <h2>My Projects</h2>
            <h2>My Tasks</h2>
        </Box>
    )
}

export default Home