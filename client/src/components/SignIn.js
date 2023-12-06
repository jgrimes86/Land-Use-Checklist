
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";


function SignIn({setUser, signup, setSignup}) {  
  const [error, setError] = useState(null)

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
            setError(null)
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
        {signup && <label htmlFor="name">Name</label>}
        {signup && <input 
            id="name" 
            name="name"
            value={formik.values.name} 
            onChange={formik.handleChange} 
        />}
        {signup && <label htmlFor="company">Company</label>}
        {signup && <input 
            id="company" 
            name="company" 
            value={formik.values.company} 
            onChange={formik.handleChange}
        />}
        {signup && <label htmlFor="phoneNumber">Phone Number</label>}
        {signup && <input 
            id="phoneNumber" 
            name="phoneNumber" 
            value={formik.values.phoneNumber} 
            onChange={formik.handleChange}
        />}
        <label htmlFor="email">Email</label>
        <input 
            id="email" 
            name="email" 
            value={formik.values.email} 
            onChange={formik.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input 
            id="password" 
            name="password" 
            type="password"
            value={formik.values.password} 
            onChange={formik.handleChange}
        />
        {signup && <label htmlFor="confirmPassword">Confirm Password</label>}
        {signup && <input 
            id="confirmPassword" 
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword} 
            onChange={formik.handleChange}
        />}
        <button type="submit" variant="contained" >
            Submit
        </button>
      </form>
      <button variant="outlined" onClick={toggleForm} >{signup ? 'Log In' : 'Sign Up'}</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p style={{ color: "red" }}>{formik.errors.name}</p>
      <p style={{ color: "red" }}>{formik.errors.email}</p>
      <p style={{ color: "red" }}>{formik.errors.password}</p>
      <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>
    </div>
  )
}

export default SignIn