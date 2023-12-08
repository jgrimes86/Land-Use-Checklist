
import { useParams } from "react-router-dom";

function Project() {
    const params = useParams();

    return <p>This will be for project {params.id}</p>
}

export default Project