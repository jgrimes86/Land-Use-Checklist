
import { useFormik } from "formik";
import * as yup from "yup";

import { Button } from "@mui/material"
import TextField from "@mui/material/TextField"


function Login({setUser}) {
    
    const formikSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter an email"),
        password: yup.string().required("Must enter a password"),
      });
    
      const formik = useFormik({
        initialValues: {
          email: "",
          password: ""
        },
        validationSchema: formikSchema,
        // validateOnChange: false,
        onSubmit: (values) => {
          fetch("/login", {
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
            <Button 
                type="submit"
                variant="contained"
            >
                Login
            </Button>
        </form>
    )
}


export default Login