import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loading() {
    return (
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
            <CircularProgress />
        </Box>
      );

}

export default Loading