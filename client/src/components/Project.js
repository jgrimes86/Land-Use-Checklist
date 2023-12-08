
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function Project() {
    const params = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState("");

    useEffect(() => {
        fetch(`/projects/${params.id}`)
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => setProject(data))
            }
        })
    }, [])

    function handleEditClick() {
        navigate(`/projects/${params.id}/edit`)
    }

    return (
        <>
            <p>This will be for project {params.id}</p>
            <Button onClick={handleEditClick}>Edit Project</Button>
        </>
    )
}

export default Project