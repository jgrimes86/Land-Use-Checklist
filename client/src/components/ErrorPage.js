import { useRouteError, useNavigate, useParams } from "react-router-dom";
import { Box, Button } from '@mui/material';


function ErrorPage() {
    const navigate = useNavigate();
    const params = useParams();
    const error = useRouteError();
    console.error(error);

    return(
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 500,
                ml: 'auto',
                mr: 'auto'
            }}
        >
            <h1>404 - Not Found!</h1>
            <Button 
                variant="contained"
                onClick={()=>{navigate(`/users/${params.id}`)}}
            >
                Navigate to Home
            </Button>
        </Box>
    )
}

export default ErrorPage