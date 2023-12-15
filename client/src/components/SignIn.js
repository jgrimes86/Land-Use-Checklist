
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Box, Button, Container, CssBaseline, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function SignIn() {  
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {setUser, signup, setSignup} = useOutletContext();

  const signupSchema = yup.object().shape({
      name: yup.string().required("Must enter a first name"),
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
            navigate(`/user/home`)
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

  function handleShowPassword() {
    setShowPassword((show) => !show)
  }

  function handleShowConfirmPassword() {
    setShowConfirmPassword((show) => !show)
  }

  function handleMouseDownPassword(e) {
    e.preventDefault()
  }

  return (
    
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 500,
          ml: 'auto',
          mr: 'auto'
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
                helperText = {formik.errors.name}
            />}
            {signup && <TextField 
                margin="normal"
                fullWidth
                id="company" 
                name="company" 
                label="Company"
                value={formik.values.company} 
                onChange={formik.handleChange}
            />}
            {signup && <TextField 
                margin="normal"
                fullWidth
                id="phoneNumber" 
                name="phoneNumber" 
                label="Phone Number"
                value={formik.values.phoneNumber} 
                onChange={formik.handleChange}
            />}
            <TextField 
                margin="normal"
                fullWidth
                id="email" 
                name="email" 
                label="Email Address"
                value={formik.values.email} 
                onChange={formik.handleChange}
                error={!!formik.errors.email}
                helperText={formik.errors.email}
            />
            <FormControl variant="outlined" sx={{width:"100%", mt:2.5}}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput 
                  fullWidth
                  id="password" 
                  name="password" 
                  label="Password"
                  type={showPassword ? "text" : "password" }
                  endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                  }
                  value={formik.values.password} 
                  onChange={formik.handleChange}
                  error={!!formik.errors.password}
              />
              <FormHelperText>{formik.errors.password}</FormHelperText>
            </FormControl>
            {signup && <FormControl variant="outlined" sx={{width:"100%", mt:2.5}}>
              <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
              <OutlinedInput 
                  fullWidth
                  id="confirmPassword" 
                  name="confirmPassword" 
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password" }
                  endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                  }
                  value={formik.values.confirmPassword} 
                  onChange={formik.handleChange}
                  error={!!formik.errors.confirmPassword}
              />
              <FormHelperText>{formik.errors.confirmPassword}</FormHelperText>
            </FormControl>}

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

  )
}

export default SignIn