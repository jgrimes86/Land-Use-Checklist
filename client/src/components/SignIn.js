
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';


function SignIn({setUser, signup, setSignup}) {  
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const {setUser, signup, setSignup} = useOutletContext();

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
            setError(null);
            navigate(`/users/home/${user.id}`)
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormControl >
          {signup && <FormLabel htmlFor="name">Name</FormLabel>}
          {signup && <Input 
              id="name" 
              name="name"
              value={formik.values.name} 
              onChange={formik.handleChange} 
          />}
          {signup && <FormLabel htmlFor="company">Company</FormLabel>}
          {signup && <Input 
              id="company" 
              name="company" 
              value={formik.values.company} 
              onChange={formik.handleChange}
          />}
          {signup && <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>}
          {signup && <Input 
              id="phoneNumber" 
              name="phoneNumber" 
              value={formik.values.phoneNumber} 
              onChange={formik.handleChange}
          />}
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input 
              id="email" 
              name="email" 
              value={formik.values.email} 
              onChange={formik.handleChange}
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input 
              id="password" 
              name="password" 
              type="password"
              value={formik.values.password} 
              onChange={formik.handleChange}
          />
          {signup && <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>}
          {signup && <Input 
              id="confirmPassword" 
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword} 
              onChange={formik.handleChange}
          />}
          <Button colorScheme='blue' type="submit" >
              Submit
          </Button>
        </FormControl>
      </form>
      <Button colorScheme='blue' onClick={toggleForm} >
        {signup ? 'Log In' : 'Sign Up'}
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <p style={{ color: "red" }}>{formik.errors.name}</p>
      <p style={{ color: "red" }}>{formik.errors.email}</p>
      <p style={{ color: "red" }}>{formik.errors.password}</p>
      <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>

    </div>
  )
}

export default SignIn