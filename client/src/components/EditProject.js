import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"


function EditProject() {
    const [project, setProject] = useState("");
    const [error, setError] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.id !== 0) {
            // fetch project info
        }
    }, [])

    const formikSchema = yup.object().shape({
        name: yup.string().required("Must enter a project name"),
        client: yup.string(),
        property_address: yup.string(),
        property_lot: yup.string(),
        property_block: yup.string(),
        municipality: yup.string(),
        county: yup.string(),
        state: yup.string(),
      });

      const formik = useFormik({
        initialValues: {
          name: project ? project.name : "",
          client: project ? project.client : "",
          property_address: project ? project.property_address : "",
          property_lot: project ? project.property_lot : "",
          property_block: project ? project.property_block : "",
          municipality: project ? project.municipality : "",
          county: project ? project.county : "",
          state: project ? project.state : "",
      },
        validationSchema: formikSchema,
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
                navigate(`/projects/${newProject.id}`)
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

    return (
        <div>
            <p>Project Page</p>

            <form onSubmit={formik.handleSubmit}>
                <FormControl >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input 
                        id="name" 
                        name="name"
                        value={formik.values.name} 
                        onChange={formik.handleChange} 
                    />
                    <FormLabel htmlFor="client">Client</FormLabel>
                    <Input 
                        id="client" 
                        name="client" 
                        value={formik.values.client} 
                        onChange={formik.handleChange}
                    />
                    <FormLabel htmlFor="property_address">Property Address</FormLabel>
                    <Input 
                        id="property_address" 
                        name="property_address" 
                        value={formik.values.property_address} 
                        onChange={formik.handleChange}
                    />
                    <FormLabel htmlFor="property_lot">Lot</FormLabel>
                    <Input 
                        id="property_lot" 
                        name="property_lot" 
                        value={formik.values.property_lot} 
                        onChange={formik.handleChange}
                    />
                    <FormLabel htmlFor="property_block">Block</FormLabel>
                    <Input 
                        id="property_block" 
                        name="property_block" 
                        value={formik.values.property_block} 
                        onChange={formik.handleChange}
                    />
                    <FormLabel htmlFor="municipality">Municipality</FormLabel>
                    <Input 
                        id="municipality" 
                        name="municipality" 
                        value={formik.values.municipality} 
                        onChange={formik.handleChange}
                    />
                    <FormLabel htmlFor="county">County</FormLabel>
                    <Input 
                        id="county" 
                        name="county" 
                        value={formik.values.county} 
                        onChange={formik.handleChange}
                    />
                    <FormLabel htmlFor="state">State</FormLabel>
                    <Input 
                        id="state" 
                        name="state" 
                        value={formik.values.state} 
                        onChange={formik.handleChange}
                    />


                    <Button colorScheme='blue' type="submit" >
                        {createEditButton}
                    </Button>
                    
                    
                    <Button
                        colorScheme="blue" 
                        onClick={() => {
                            formik.resetForm({
                                values: formik.initialValues
                            })
                        }}
                        type="reset"
                    >
                        Discard Changes
                    </Button>


                </FormControl>
            </form>
        </div>
    )
}

export default EditProject