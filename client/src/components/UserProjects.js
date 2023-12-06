import { useState, useEffect } from "react";

function UserProjects({user}) {
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
            <div key={id} variant="contained" >
                <h3>{name}</h3>
                <p>{client}, {property_address}</p>
                <p>{property_block}, {property_lot}, {municipality}, {county}, {state}</p>
            </div>
        )
    })

    return (
        <div>
            <h2>My Projects</h2>
            {projectList}
            <button variant="outlined" >Create New Project</button>
        </div>
    )
}

export default UserProjects
