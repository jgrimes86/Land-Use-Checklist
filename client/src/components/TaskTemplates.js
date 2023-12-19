import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Box } from '@mui/material';

import EditTemplate from "./EditTemplate";

function TaskTemplates() {
    const {templates, setTemplates} = useOutletContext();
    // const [templates, setTemplates] = useState('')

    // useEffect(() => {
    //     fetch('/templates')
    //     .then(r => r.json())
    //     .then(data => setTemplates(data))
    // }, [])

    const existingTemplates = templates ? templates.map(template => {
        return (
            <Box key={template.id} >
                <Box >{template.title}</Box>
                <EditTemplate templates={templates} setTemplates={setTemplates} templateId={template.id} />
            </Box>
        )
    }) : []

    return(
        <Box>

            <h1>Task Templates</h1>

            {existingTemplates}

            <EditTemplate templates={templates} setTemplates={setTemplates} />

        </Box>
    )
}

export default TaskTemplates