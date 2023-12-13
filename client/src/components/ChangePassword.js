import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';

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

function ChangePassword({user, setMessage}) {
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formikSchema = yup.object().shape({
        oldPassword: yup.string().required("Must enter current password"),
        newPassword: yup.string().required("Must enter new password"),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Must match new password')
    });

    const passwordFormik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: formikSchema,
        // validateOnChange: false,
        onSubmit: (values) => {
            console.log('clicked')
            fetch(`/users/${user.id}/change-password`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                r.json().then(({message}) => {
                    handleClose();
                    setError(null);
                    ////////////////// SHOW MESSAGE: PASSWORD CHANGED /////////////
                    setMessage(message)
                    console.log("Success!", message)
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
        <Box>
            <Button
                sx={{ mt: 1, mb: 2 }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpen()
                }}
            >
                Change password
            </Button>

            <Modal open={open}>
                <Box sx={modalStyle}>
                    <Box
                        component="form"
                        onSubmit={passwordFormik.handleSubmit}
                    >
                        <TextField 
                            margin="normal"
                            fullWidth
                            name="oldPassword" 
                            type="password"
                            label="Current Password"
                            value={passwordFormik.values.oldPassword} 
                            onChange={passwordFormik.handleChange}
                            error={!!passwordFormik.errors.oldPassword}
                            helperText={passwordFormik.errors.oldPassword}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            name="newPassword" 
                            type="password"
                            label="New Password"
                            value={passwordFormik.values.newPassword} 
                            onChange={passwordFormik.handleChange}
                            error={!!passwordFormik.errors.newPassword}
                            helperText={passwordFormik.errors.newPassword}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            value={passwordFormik.values.confirmPassword} 
                            onChange={passwordFormik.handleChange}
                            error={!!passwordFormik.errors.confirmPassword}
                            helperText={passwordFormik.errors.confirmPassword}
                        />

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
                                    passwordFormik.resetForm({
                                    values: passwordFormik.initialValues
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

                    {error && <Typography style={{ color: "red" }}>{error}</Typography>}

                </Box>
            </Modal>
        </Box>
    )
}

export default ChangePassword