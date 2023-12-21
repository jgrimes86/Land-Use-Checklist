import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import TeamList from "./TeamList";

function EditTeam({setError, roles, setRoles, users}) {
    const params = useParams();
    const [inputValue, setInputValue] = useState("")

    const addTeamSchema = yup.object().shape({
        role: yup.string(),
        user_id: yup.string().required("You must select a team member")
    })

    const addTeamFormik = useFormik({
        initialValues: {
            role: "",
            user_name: "",
            user_id: "",
            project_id: params.id
        },
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

    const options = users ? users.map(user => {
            return {label: user.name, user_id: user.id}
        }) : [];

    return (
        <Paper
            elevation={2}
            sx={{
                mt: 2,
                ml: 1,
                pl: 2,
                pr: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '50%',
                maxHeight: 850,
                overflow: 'auto'
            }}
            >
            <Typography variant="h6" sx={{mt:2}}>Team Members</Typography>

            <Box sx={{width: "100%", mt:4}}>
                {roles ? <TeamList roles={roles} setRoles={setRoles} users={users} setError={setError} /> : null}
            </Box>
            
            <Box 
                component="form"
                onSubmit={addTeamFormik.handleSubmit}
                noValidate
                sx={{ 
                    mt: 1,

                    width: '95%'
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
                        label="Team Member Role"
                        value={addTeamFormik.values.role}
                        onChange={addTeamFormik.handleChange}
                        sx={{
                            width: '50%',
                            mr: 0.5,
                        }}
                    />
                    <Autocomplete 
                        id="user_name"
                        name="user_name"
                        options={options}
                        getOptionLabel={option => option.label}
                        onChange={(event, newValue) => {
                            addTeamFormik.setFieldValue('user_name', newValue.label);
                            addTeamFormik.setFieldValue('user_id', newValue.user_id)
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue)
                        }}
                        isOptionEqualToValue={(option, value) => option.label === addTeamFormik.values.user_name}

                        sx={{width: '50%'}}
                        disableClearable
                        renderInput={(params) => <TextField {...params} label="Select a Team Member" />}
                    />
                </Box>
                <Box sx={{display:'flex', justifyContent:"center"}}>
                    <Button 
                        type="submit"
                        variant="contained"
                        sx={{ m: 'auto', mt:2, mb:4}}
                    >
                        Add Team Member
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default EditTeam