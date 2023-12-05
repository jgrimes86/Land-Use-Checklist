
import { useFormik } from "formik";
import * as yup from "yup";

import { Button } from "@mui/material"
import TextField from "@mui/material/TextField"


function Signup({setUser}) {
    
    const formikSchema = yup.object().shape({
        name: yup.string().required("Must enter a first name").max(15),
        company: yup.string(),
        phoneNumber: yup.string(),
        email: yup.string().email("Invalid email").required("Must enter an email"),
        password: yup.string().required("Must enter a password"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
      });
    
      const formik = useFormik({
        initialValues: {
          name: "",
          company: "",
          phoneNumber: "",
          email: "",
          password: "",
          confirmPassword: ""
        },
        validationSchema: formikSchema,
        // validateOnChange: false,
        onSubmit: (values) => {
          fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          })
          .then((r) => {
            if (r.ok) {
              r.json().then((user) => {
                setUser(user);
              });
            }
          });
        },
      });
    
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField 
                id="name" 
                label="Name" 
                variant="outlined" 
                value={formik.values.name} 
                onChange={formik.handleChange} 
            />
            <TextField 
                id="company" 
                label="Company" 
                variant="outlined" 
                value={formik.values.company} 
                onChange={formik.handleChange}
            />
            <TextField 
                id="phoneNumber" 
                label="Phone Number" 
                variant="outlined" 
                value={formik.values.phoneNumber} 
                onChange={formik.handleChange}
            />
            <TextField 
                id="email" 
                label="Email" 
                variant="outlined" 
                value={formik.values.email} 
                onChange={formik.handleChange}
            />
            <TextField 
                id="password" 
                label="Password" 
                variant="outlined" 
                type="password"
                value={formik.values.password} 
                onChange={formik.handleChange}
            />
            <TextField 
                id="confirmPassword" 
                label="Confirm Password" 
                variant="outlined" 
                type="password"
                value={formik.values.confirmPassword} 
                onChange={formik.handleChange}
            />
            <Button 
                type="submit"
                variant="contained"
            >
                Sign Up
            </Button>
        </form>
    )
}

export default Signup