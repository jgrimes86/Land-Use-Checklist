import { useOutletContext } from "react-router-dom";
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';

import EditTemplate from "./EditTemplate";

function TaskTemplates() {
    const {templates, setTemplates} = useOutletContext();

    const existingTemplates = templates ? templates.map(template => {
        return (
            <Box 
                key={template.id} 
                sx={{
                    display: 'grid',
                    gap: 1,
                    gridAutoColumns: '1fr',
                    alignItems: 'center',
                    
                  }}
            >
                <Typography variant="h6" sx={{justifySelf:"right", gridRow: '1', gridColumn: 'span 3' }}>{template.title}</Typography>
                <EditTemplate templates={templates} setTemplates={setTemplates} templateId={template.id} />
            </Box>
        )
    }) : []

    return(
        <Paper
            elevation={2} 
            sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center'
            }}
        >

            <Typography variant="h4" sx={{mt:2}}>Task Templates</Typography>

            <Stack 
                spacing={2} 
                divider={<Divider flexItem />}
                sx={{
                    mt: 2,
                    ml: 2,
                    mr: 2,
                }}
            >
                {existingTemplates}
            </Stack>

            <EditTemplate templates={templates} setTemplates={setTemplates} />

        </Paper>
    )
}

export default TaskTemplates