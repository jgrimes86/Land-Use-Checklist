import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom"
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"

function EditUser({user, setUser}) {
    const [error, setError] = useState(null);
    // const {user, setUser, checkOK} = useOutletContext();
    const navigate = useNavigate();

    function handleHomeClick() {
        navigate(`/users/home/${user.id}`)
    }

    const formikSchema = yup.object().shape({
        name: yup.string().required("Must enter a first name").max(15),
        company: yup.string(),
        phoneNumber: yup.string(),
        email: yup.string().email("Invalid email").required("Must enter an email"),
        // oldPassword: yup.string(),
        // newpassword: yup.string(),
        // confirmPassword: yup.string().oneOf([yup.ref('newpassword'), null], 'Passwords must match')
      });

      const formik = useFormik({
        initialValues: {
          name: user.name,
          company: user.company,
          phoneNumber: user.phone_number,
          email: user.email,
        //   oldPassword: "",
        //   newpassword: "",
        //   confirmPassword: ""
      },
        validationSchema: formikSchema,
        // validateOnChange: false,
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
                // navigate(`/users/home/${user.id}`)
              });
            }
            else {
              r.json()
              .then(({error}) => setError(error))
            }
          });
        },
      });


    return (
        <div>
            <h1>This is for editing the user info</h1>

            <form onSubmit={formik.handleSubmit}>
                <FormControl >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input 
                        id="name" 
                        name="name"
                        value={formik.values.name} 
                        onChange={formik.handleChange} 
                    />
                    <FormLabel htmlFor="company">Company</FormLabel>
                    <Input 
                        id="company" 
                        name="company" 
                        value={formik.values.company} 
                        onChange={formik.handleChange}
                    />
                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                    <Input 
                        id="phoneNumber" 
                        name="phoneNumber" 
                        value={formik.values.phoneNumber} 
                        onChange={formik.handleChange}
                    />
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input 
                        id="email" 
                        name="email" 
                        value={formik.values.email} 
                        onChange={formik.handleChange}
                    />
                    {/* <FormLabel htmlFor="oldPassword">Password</FormLabel>
                    <Input 
                        id="oldPassword" 
                        name="oldPassword" 
                        type="oldPassword"
                        value={formik.values.password} 
                        onChange={formik.handleChange}
                    />
                    <FormLabel htmlFor="newpassword">New Password</FormLabel>
                    <Input 
                        id="newpassword"
                        name="newpassword"
                        type="password"
                        value={formik.values.newpassword}
                        onChange={formik.handleChange}
                    />
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <Input 
                        id="confirmPassword" 
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword} 
                        onChange={formik.handleChange}
                    /> */}
                    <Button colorScheme='blue' type="submit" >
                        Save Changes
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

            {error && <p style={{ color: "red" }}>{error}</p>}
            <p style={{ color: "red" }}>{formik.errors.name}</p>
            <p style={{ color: "red" }}>{formik.errors.email}</p>
            <p style={{ color: "red" }}>{formik.errors.password}</p>
            <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>

            <Button colorScheme="blue" onClick={handleHomeClick} >Home</Button>
        </div>
    )
}

export default EditUser