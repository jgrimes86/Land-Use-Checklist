import { useEffect, useState } from "react";
import { Box, Button, TextField } from '@mui/material';

import EditTemplate from "./EditTemplate";

function TaskTemplates() {
    const [templates, setTemplates] = useState('')

    console.log(templates)

    useEffect(() => {
        fetch('/templates')
        .then(r => r.json())
        .then(data => setTemplates(data))
    }, [])

    console.log(templates)

    const existingTemplates = templates ? templates.map(template => {
        return <Box key={template.id}>{template.title}</Box>
    }) : []

    return(
        <Box>
            <h1>Task Templates</h1>

            {existingTemplates}

            <EditTemplate templates={templates} setTemplates={setTemplates}/>
        </Box>
    )
}

export default TaskTemplates