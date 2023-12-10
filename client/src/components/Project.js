
import { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

function Project() {
    const params = useParams();
    const navigate = useNavigate();
    const {project, setProject, team, setTeam, users, setUsers} = useOutletContext()

    useEffect(() => {
        fetch(`/projects/${params.id}`)
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => setProject(data))
            }
        })

        fetch(`/roles/${params.id}`)
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => setTeam(data))
            }
        })

        fetch('/users')
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => setUsers(data))
            }
        })
        
    }, [])

    function handleEditClick() {
        navigate(`/projects/${params.id}/edit`)
    }

    return (
        <>
            <p>This will be for project {params.id}</p>
            <button onClick={handleEditClick} >Edit Project</button>
        </>
    )
}

export default Project