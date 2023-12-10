import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";


function EditProject() {
    const {project, setProject, team, setTeam, users, setUsers} = useOutletContext()
    const [error, setError] = useState(null);


    // console.log("project: ", project)

////////////////////////// PROJECT FORMIK START /////////////////////////////////
    const params = useParams();
    const navigate = useNavigate();
  
    const projectSchema = yup.object().shape({
        name: yup.string().required("Must enter a project name"),
        client: yup.string(),
        propertyAddress: yup.string(),
        propertyLot: yup.string(),
        propertyBlock: yup.string(),
        municipality: yup.string(),
        county: yup.string(),
        state: yup.string(),
      });

      const projectFormik = useFormik({
        initialValues: {
          name: project ? project.name : "",
          client: project ? project.client : "",
          propertyAddress: project ? project.property_address : "",
          propertyLot: project ? project.property_lot : "",
          propertyBlock: project ? project.property_block : "",
          municipality: project ? project.municipality : "",
          county: project ? project.county : "",
          state: project ? project.state : "",
      },
        validationSchema: projectSchema,
        // validateOnChange: false,
        onSubmit: (values) => {
            
            const method = project ? "PATCH" : "POST";

            const url = project ? `/projects/${project.id}` : `/projects`;
            fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
            if (r.ok) {
                r.json().then((newProject) => {
                    setProject(newProject);
                    setError(null);
                    // navigate(`/projects/${newProject.id}`)
                });
            }
            else {
                r.json()
                .then(({error}) => setError(error))
            }
            });
        },
      });

    const createEditButton = project ? "Save Changes" : "Create Project";
////////////////////////// PROJECT FORMIK END /////////////////////////////////////

////////////////////////// TEAM FORMIK START ///////////////////////////////////

    const teamFormik = useFormik({
        initialValues: {
            role: "",
            user_id: 0,
            project_id: params.id
        },

        onSubmit: (values) => {
            fetch('/roles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    r.json()
                    .then(newMember => {
                        setTeam([...team, newMember]);
                        setError(null)
                    })
                }
            })
        }
    })

    // Serializer_mixin recursion error preventing Role from including user info.  If fixed, can avoid the userId map
    const currentTeamMembers = users.map((u) => {
        const teamIds = team.map(tm => tm.id)
        if (teamIds.includes(u.id)){
            return <div key={u.id}>{u.name}</div>
        }
    })

    console.log("current team", currentTeamMembers)

    const teamOptions = users.map(u => {
        return <option key={u.id} value={u.id}>{u.name}</option>
    });
////////////////////////// TEAM FORMIK END /////////////////////////////////////

    return (
        <div>
            <p>Project Page</p>

            <form onSubmit={projectFormik.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name" 
                        name="name"
                        value={projectFormik.values.name} 
                        onChange={projectFormik.handleChange} 
                    />
                    <label htmlFor="client">Client</label>
                    <input 
                        id="client" 
                        name="client" 
                        value={projectFormik.values.client} 
                        onChange={projectFormik.handleChange}
                    />
                    <label htmlFor="propertyAddress">Property Address</label>
                    <input 
                        id="propertyAddress" 
                        name="propertyAddress" 
                        value={projectFormik.values.propertyAddress} 
                        onChange={projectFormik.handleChange}
                    />
                    <label htmlFor="propertyLot">Lot</label>
                    <input 
                        id="propertyLot" 
                        name="propertyLot" 
                        value={projectFormik.values.propertyLot} 
                        onChange={projectFormik.handleChange}
                    />
                    <label htmlFor="propertyBlock">Block</label>
                    <input 
                        id="propertyBlock" 
                        name="propertyBlock" 
                        value={projectFormik.values.propertyBlock} 
                        onChange={projectFormik.handleChange}
                    />
                    <label htmlFor="municipality">Municipality</label>
                    <input 
                        id="municipality" 
                        name="municipality" 
                        value={projectFormik.values.municipality} 
                        onChange={projectFormik.handleChange}
                    />
                    <label htmlFor="county">County</label>
                    <input 
                        id="county" 
                        name="county" 
                        value={projectFormik.values.county} 
                        onChange={projectFormik.handleChange}
                    />
                    <label htmlFor="state">State</label>
                    <input 
                        id="state" 
                        name="state" 
                        value={projectFormik.values.state} 
                        onChange={projectFormik.handleChange}
                    />

                    <button
                        onClick={() => {
                            projectFormik.resetForm({
                                values: projectFormik.initialValues
                            })
                        }}
                        type="reset"
                    >
                        Discard Changes
                    </button>

                    <button type="submit" >
                        {createEditButton}
                    </button>

            </form>

            {currentTeamMembers}
            <form onSubmit={teamFormik.handleSubmit}>
                    <div>Team Members</div>

                    {/* <label htmlFor='role'>Role</label> */}
                    <input 
                        id='role'
                        name='role'
                        placeholder="Team Member Role"
                        value={teamFormik.values.role}
                        onChange={teamFormik.handleChange}
                    />

                    <select 
                        id="teamMember"
                        name="user_id"
                        placeholder="Select Team Member"
                        value={teamFormik.values.teamMember}
                        onChange={teamFormik.handleChange}
                    >
                        {teamOptions}
                    </select>

                    <button type="submit">
                        Add Team Member
                    </button>

            </form>




        </div>
    )
}

export default EditProject