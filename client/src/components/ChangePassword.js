import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, Stack, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: "75%",
    bgcolor: 'background.paper',
    border: '2px solid #2B2D42',
    boxShadow: 24,
    p: 4,
}

function ChangePassword({user, setMessage}) {
    const [error, setError] = useState(null);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        validateOnChange: false,
        onSubmit: (values) => {
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
                    setMessage(message);
                    passwordFormik.resetForm({
                        values: passwordFormik.initialValues
                    })
                });
                }
                else {
                r.json()
                    .then(({error}) => setError(error))
                }
            });
        },
    });

    function handleShowOldPassword() {
        setShowOldPassword((show) => !show)
    } 

    function handleShowNewPassword() {
        setShowNewPassword((show) => !show)
    } 

    function handleShowConfirmPassword() {
        setShowConfirmPassword((show) => !show)
    }  

    function handleMouseDownPassword(e) {
    e.preventDefault()
    }

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
                        <FormControl variant="outlined" sx={{mb:1, mt:1, width:"100%"}}>
                            <InputLabel htmlFor="oldPassword">Current Password</InputLabel>
                            <OutlinedInput 
                                // margin="normal"
                                fullWidth
                                name="oldPassword" 
                                type={showOldPassword ? "text" : "password" }
                                label="Current Password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleShowOldPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                  }
                                value={passwordFormik.values.oldPassword} 
                                onChange={passwordFormik.handleChange}
                                error={!!passwordFormik.errors.oldPassword}
                            />
                            <FormHelperText>{passwordFormik.errors.oldPassword}</FormHelperText>
                        </FormControl>

                        <FormControl variant="outlined" sx={{mb:1, mt:1, width:"100%"}}>
                            <InputLabel htmlFor="newPassword">New Password</InputLabel>
                            <OutlinedInput 
                                // margin="normal"
                                fullWidth
                                name="newPassword" 
                                type={showNewPassword ? "text" : "password" }
                                label="Current Password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleShowNewPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                  }
                                value={passwordFormik.values.newPassword} 
                                onChange={passwordFormik.handleChange}
                                error={!!passwordFormik.errors.newPassword}
                            />
                            <FormHelperText>{passwordFormik.errors.newPassword}</FormHelperText>
                        </FormControl>

                        <FormControl variant="outlined" sx={{mb:1, mt:1, width:"100%"}}>
                            <InputLabel htmlFor="confirmPassword">Current Password</InputLabel>
                            <OutlinedInput 
                                fullWidth
                                name="confirmPassword" 
                                type={showConfirmPassword ? "text" : "password" }
                                label="Confirm Password"
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
                                value={passwordFormik.values.confirmPassword} 
                                onChange={passwordFormik.handleChange}
                                error={!!passwordFormik.errors.confirmPassword}
                            />
                            <FormHelperText>{passwordFormik.errors.confirmPassword}</FormHelperText>
                        </FormControl>

                        <Stack spacing={2} direction="row" justifyContent='center'>
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