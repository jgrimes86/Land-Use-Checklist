import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField } from '@mui/material';

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
    overflow: 'scroll',
}

function TeamListModal({row, roles, setRoles, users}) {
    const params = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const formikSchema = yup.object().shape({
        name: yup.string(),
        user: yup.string().required("Must enter a team member's name")
    })

    const formik = useFormik({
        initialValues: {
            name: row.role,
            user: row.user_name,
            user_id: row.user_id,
        },
        validationSchema: formikSchema,
        validateOnChange: false,
        onSubmit: (values) => {
            fetch(`/roles/${row.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    r.json()
                    .then((updatedRole) => {
                        setRoles(roles.map(role => {
                            if (updatedRole.id === role.id) {
                                return updatedRole
                            } else return role
                        }));
                        handleClose()
                    })
                }
            })
        }
    })

    function handleDelete() {
        fetch(`/roles/${row.id}`, {
            method: "DELETE"
        })
        .then((r) => {
            if (r.ok) {
                setRoles(roles.filter(role => {
                    if (role.id !== row.id) return role
                }));
                handleClose()
            } else {
                r.json().then(({error}) => console.log(error))
            }
        })
    }

    const teamOptions = users ? users.map(user => {
        return <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
    }) : [];

    return (
        <Box>
            <Button
                variant="outlined"
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpen()
                }}
            >
                Edit
            </Button>
            
            <Modal open={open} >
                <Box sx={modalStyle}>
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="name"
                            name="name"
                            label="Team Member Role"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />

                        <FormControl 
                            fullWidth
                        >
                            <InputLabel id="team-member-label">Select a Team Member</InputLabel>
                            <Select 
                                labelId="team-member-label"
                                id="user_id"
                                name="user_id"
                                label="Select a Team Member"
                                value={formik.values.user_id}
                                onChange={formik.handleChange}
                            >
                                {teamOptions}
                            </Select>

                        </FormControl>

                        <Stack 
                            spacing={2} 
                            direction="row"
                        >
                            <Button 
                                type="submit" 
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                            <Button 
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => {
                                    handleClose();
                                    formik.resetForm({
                                        values: formik.initialValues
                                    })
                                }}
                            >
                                Close
                            </Button>
                            <Button 
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleDelete}
                            >
                                Remove Team Member
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default TeamListModal