import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

import TeamList from "./TeamList";

function EditTeam({setError, roles, setRoles, users}) {
    const params = useParams();

    const addTeamSchema = yup.object().shape({
        role: yup.string(),
        user_id: yup.string().required("You must select a team member")
    })

    const addTeamFormik = useFormik({
        initialValues: {
            role: "",
            user_id: "",
            project_id: params.id
        },
        // enableReinitialize: true,
        validationSchema: addTeamSchema,
        validateOnChange: false,
        onSubmit: (values) => {
            fetch('/roles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    r.json()
                    .then(newMember => {
                        setRoles([...roles, newMember]);
                        setError(null)
                    })
                }
            })
        }
    })

    const teamOptions = users ? users.map(u => {
        return <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>
    }) : [];

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '50%'
            }}
            >
            <Typography>Team Members</Typography>

            {roles ? <TeamList roles={roles} setRoles={setRoles} users={users} setError={setError} /> : null}
            
            <Box 
                component="form"
                onSubmit={addTeamFormik.handleSubmit}
                noValidate
                sx={{ 
                    mt: 1,
                    width: '90%'
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: 'nowrap',
                    }}
                >
                    <TextField 
                        id='role'
                        name='role'
                        placeholder="Team Member Role"
                        value={addTeamFormik.values.role}
                        onChange={addTeamFormik.handleChange}
                        sx={{
                            width: '50%'
                        }}
                    />
                    
                    <FormControl 
                        sx={{
                            width: '50%'
                        }}
                        error={!!addTeamFormik.errors.user_id}
                    >
                        <InputLabel id="team-member-label">Select a Team Member</InputLabel>
                        <Select 
                            labelId="team-member-label"
                            id="user_id"
                            name="user_id"
                            label="Select a Team Member"
                            value={addTeamFormik.values.user_id}
                            onChange={addTeamFormik.handleChange}
                        >
                            {teamOptions}
                        </Select>
                        <FormHelperText>{addTeamFormik.errors.name}</FormHelperText>
                    </FormControl>
                </Box>
                <Button 
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add Team Member
                </Button>
            </Box>
        </Box>
    )
}

export default EditTeam