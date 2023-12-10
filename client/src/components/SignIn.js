
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import { LockOutlinedIcon } from '@mui/icons-material';


function SignIn() {  
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {setUser, signup, setSignup} = useOutletContext();

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
    validateOnChange: false,
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
            setError(null);
            navigate(`/users/${user.id}`)
          });
        }
        else {
          r.json()
          .then(({error}) => setError(error))
        }
      });
    },
  });
  
  function toggleForm() {
    setSignup((currentState) => !currentState)
  }

  return (
    <Container>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" varian="h5">
          {signup ? "Sign Up" : "Sign In"}
        </Typography>
        <Box 
          component="form" 
          onSubmit={formik.handleSubmit} 
          noValidate 
          sx={{ mt: 1 }}
        >
            {/* {signup && <label htmlFor="name">Name</label>} */}
            {signup && <TextField 
                margin="normal"
                fullWidth
                id="name" 
                name="name"
                label="Name"
                autoFocus
                value={formik.values.name} 
                onChange={formik.handleChange} 
                error = {formik.errors.name}
                helperText = {formik.errors.name ? formik.errors.name : null}
            />}
            {/* {signup && <label htmlFor="company">Company</label>} */}
            {signup && <TextField 
                margin="normal"
                fullWidth
                id="company" 
                name="company" 
                label="Company"
                value={formik.values.company} 
                onChange={formik.handleChange}
            />}
            {/* {signup && <label htmlFor="phoneNumber">Phone Number</label>} */}
            {signup && <TextField 
                margin="normal"
                fullWidth
                id="phoneNumber" 
                name="phoneNumber" 
                label="Phone Number"
                value={formik.values.phoneNumber} 
                onChange={formik.handleChange}
            />}
            {/* <label htmlFor="email">Email</label> */}
            <TextField 
                margin="normal"
                fullWidth
                id="email" 
                name="email" 
                label="Email Address"
                value={formik.values.email} 
                onChange={formik.handleChange}
                error={formik.errors.email}
                helperText={formik.handleChange}
            />
            {/* <label htmlFor="password">Password</label> */}
            <TextField 
                margin="normal"
                fullWidth
                id="password" 
                name="password" 
                type="password"
                label="Password"
                value={formik.values.password} 
                onChange={formik.handleChange}
                error={formik.errors.password}
                helperText={formik.errors.password}
            />
            {/* {signup && <label htmlFor="confirmPassword">Confirm Password</label>} */}
            {signup && <TextField 
                margin="normal"
                fullWidth
                id="confirmPassword" 
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                value={formik.values.confirmPassword} 
                onChange={formik.handleChange}
                error={formik.errors.confirmPassword}
                helperText={formik.errors.confirmPassword}
            />}
            <Button 
              type="submit" 
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                {signup ? 'Create Account' : 'Log In'}
            </Button>
        </Box>

                <Button 
                  onClick={() => {
                    toggleForm();
                    formik.resetForm({values: formik.initialValues});
                    setError(null)
                  }} 
                >
                  {signup ? 'Already have an account? Sign in' : "Don't Have an Account? Sign Up"}
                </Button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </Box>

    </Container>
  )
}

export default SignIn