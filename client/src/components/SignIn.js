
import { useFormik } from "formik";
import * as yup from "yup";

import { Box, Button, TextField } from "@mui/material"


function SignIn({setUser, signup, setSignup}) {  

  const signupSchema = yup.object().shape({
      name: yup.string().required("Must enter a first name").max(15),
      company: yup.string(),
      phoneNumber: yup.string(),
      email: yup.string().email("Invalid email").required("Must enter an email"),
      password: yup.string().required("Must enter a password"),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    });

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter an email"),
    password: yup.string().required("Must enter a password"),
  });
  
  const schema = signup ? signupSchema : loginSchema

  const formik = useFormik({

    initialValues: {
      name: "",
      company: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: ""
  },

    validationSchema: schema,
    // validateOnChange: false,
    onSubmit: (values) => {
      const url = signup ? "/signup" : "/login";
      fetch(url, {
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
  
  function toggleForm() {
    setSignup((currentState) => !currentState)
  }

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
          {signup && <TextField 
              id="name" 
              label="Name" 
              variant="outlined" 
              value={formik.values.name} 
              onChange={formik.handleChange} 
          />}
          {signup && <TextField 
              id="company" 
              label="Company" 
              variant="outlined" 
              value={formik.values.company} 
              onChange={formik.handleChange}
          />}
          {signup && <TextField 
              id="phoneNumber" 
              label="Phone Number" 
              variant="outlined" 
              value={formik.values.phoneNumber} 
              onChange={formik.handleChange}
          />}
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
          {signup && <TextField 
              id="confirmPassword" 
              label="Confirm Password" 
              variant="outlined" 
              type="password"
              value={formik.values.confirmPassword} 
              onChange={formik.handleChange}
          />}
          <Button type="submit" variant="contained" >
              Submit
          </Button>
      </form>
      <Button variant="outlined" onClick={toggleForm} >{signup ? 'Log In' : 'Sign Up'}</Button>
    </Box>
  )
}

export default SignIn