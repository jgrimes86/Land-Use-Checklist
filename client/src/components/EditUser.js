import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom"
import { useFormik } from "formik";
import * as yup from "yup";

import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, Stack, TextField, ThemeProvider, Typography } from '@mui/material';


function EditUser() {
  const [error, setError] = useState(null);
  const {user, setUser} = useOutletContext();
  const navigate = useNavigate();

  function handleHomeClick() {
      navigate(`/users/${user.id}`)
  }

  const formikSchema = yup.object().shape({
      name: yup.string().required("Must enter a first name"),
      company: yup.string(),
      phoneNumber: yup.string(),
      email: yup.string().email("Invalid email").required("Must enter an email"),
    });

    const formik = useFormik({
      initialValues: {
        name: user ? user.name : "",
        company: user ? user.company : "",
        phoneNumber: user ? user.phone_number : "",
        email: user ? user.email : "",
    },
      enableReinitialize: true,
      validationSchema: formikSchema,
      validateOnChange: false,
      onSubmit: (values) => {
        const url = `/users/${user.id}`;
        fetch(url, {
          method: "PATCH",
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

  if (!user) return <p>Loading...</p>;

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
        <h1>This is for editing the user info</h1>

        <Box 
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth 
            id="name" 
            name="name"
            label="Name"
            value={formik.values.name} 
            onChange={formik.handleChange} 
            error={formik.errors.name}
            helperText={formik.errors.name}
          />

          <TextField
            margin="normal"
            fullWidth 
            id="company" 
            name="company"
            label="Company" 
            value={formik.values.company} 
            onChange={formik.handleChange}
          />

          <TextField
            margin="normal"
            fullWidth 
            id="phoneNumber" 
            name="phoneNumber" 
            label="Phone Number"
            value={formik.values.phoneNumber} 
            onChange={formik.handleChange}
          />

          <TextField
            margin="normal"
            fullWidth 
            id="email" 
            name="email" 
            label="email"
            value={formik.values.email} 
            onChange={formik.handleChange}
            error={formik.errors.email}
            helperText={formik.errors.email}
          />

{/* ADD FUNCTIONALITY TO CHANGE PASSWORD BUTTON */}
          <Button
            sx={{ mt: 3, mb: 2 }}
          >
            Change password
          </Button>

          <Stack spacing={2} direction="row">
            <Button 
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Changes
            </Button>

            <Button
              onClick={() => {
                formik.resetForm({
                  values: formik.initialValues
                })
              }}
              type="reset"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Undo Changes
            </Button>
          </Stack>
        </Box>

        {error && <p style={{ color: "red" }}>{error}</p>}

      </Box>

    </Container>
  )
}

export default EditUser