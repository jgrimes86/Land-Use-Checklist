import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom"
import { useFormik } from "formik";
import * as yup from "yup";

function EditUser() {
    const [error, setError] = useState(null);
    const {user, setUser} = useOutletContext();
    const navigate = useNavigate();

    function handleHomeClick() {
        navigate(`/users/${user.id}`)
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
          name: user ? user.name : "",
          company: user ? user.company : "",
          phoneNumber: user ? user.phone_number : "",
          email: user ? user.email : "",
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

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h1>This is for editing the user info</h1>

            <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name" 
                        name="name"
                        value={formik.values.name} 
                        onChange={formik.handleChange} 
                    />
                    <label htmlFor="company">Company</label>
                    <input 
                        id="company" 
                        name="company" 
                        value={formik.values.company} 
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input 
                        id="phoneNumber" 
                        name="phoneNumber" 
                        value={formik.values.phoneNumber} 
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        name="email" 
                        value={formik.values.email} 
                        onChange={formik.handleChange}
                    />
                    {/* <label htmlFor="oldPassword">Password</label>
                    <input 
                        id="oldPassword" 
                        name="oldPassword" 
                        type="oldPassword"
                        value={formik.values.password} 
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="newpassword">New Password</label>
                    <input 
                        id="newpassword"
                        name="newpassword"
                        type="password"
                        value={formik.values.newpassword}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        id="confirmPassword" 
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword} 
                        onChange={formik.handleChange}
                    /> */}
                    <button type="submit" >
                        Save Changes
                    </button>
                    <button
                        onClick={() => {
                            formik.resetForm({
                                values: formik.initialValues
                            })
                        }}
                        type="reset"
                    >
                        Discard Changes
                    </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            <p style={{ color: "red" }}>{formik.errors.name}</p>
            <p style={{ color: "red" }}>{formik.errors.email}</p>
            <p style={{ color: "red" }}>{formik.errors.password}</p>
            <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>

            {/* <Button colorScheme="blue" onClick={handleHomeClick} >Home</Button> */}
        </div>
    )
}

export default EditUser