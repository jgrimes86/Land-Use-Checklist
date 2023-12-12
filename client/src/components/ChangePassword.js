import { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

import { Box, Button, Container, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: "75%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

function ChangePassword({setUser}) {
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formikSchema = yup.object().shape({
        originalPassword: yup.string().required("Must enter current password"),
        newPassword: yup.string().required("Must enter new password"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Must match new password')
    });

    const formik = useFormik({
        initialValues: {
            originalPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: formikSchema,
        validateOnChange: false,
        onSubmit: (values) => {
            fetch('', {
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
                    // navigate(`/users/${user.id}`)
                    ////////////////// SHOW MESSAGE: PASSWORD CHANGED /////////////
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
            <Button
                sx={{ mt: 1, mb: 2 }}
                onClick={(e) => {
                    handleOpen()
                }}
            >
                Change password
            </Button>
            <Modal open={open}>
                <Box sx={modalStyle}>
                    <Box
                        component='form'
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="oldPassword" 
                            name="oldPassword" 
                            type="oldPassword"
                            label="Current Password"
                            value={formik.values.oldPassword} 
                            onChange={formik.handleChange}
                            error={formik.errors.oldPassword}
                            helperText={formik.errors.oldPassword}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="newPassword" 
                            name="newPassword" 
                            type="newPassword"
                            label="New Password"
                            value={formik.values.newPassword} 
                            onChange={formik.handleChange}
                            error={formik.errors.newPassword}
                            helperText={formik.errors.newPassword}
                        />
                        <TextField 
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
                        />

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <Stack spacing={2} direction="row">
                            <Button 
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Change Password
                            </Button>

                            <Button
                                onClick={() => {
                                    handleClose();
                                    formik.resetForm({
                                    values: formik.initialValues
                                    })
                                }}
                                type="reset"
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}

                            >
                                Cancel Changes
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </div>
    )

}

export default ChangePassword