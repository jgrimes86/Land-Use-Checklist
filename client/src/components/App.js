import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Banner from "./Banner";

function App() {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [signup, setSignup] = useState(false);
    const [project, setProject] = useState("");
    const [roles, setRoles] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/check_session')
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => {setUser(user)});
            }
            else {
                r.json().then(() => navigate('/login'))
            }
          });
    }, [])

    useMemo(() => {
        fetch('/users')
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => setUsers(data))
            }
        })
    }, [])

    useEffect(() => {
        if (location.pathname === `/projects/${params.id}` || `/projects/${params.id}/edit`) {
            fetch(`/projects/${params.id}`)
            .then((r) => {
                if (r.ok) {
                    r.json()
                    .then(data => setProject(data))
                }
            })
    
            fetch(`/projects/${params.id}/roles`)
            .then((r) => {
                if (r.ok) {
                    r.json()
                    .then(data => setRoles(data))
                }
            })
        }
    }, [])

    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then((r) => {
            if (r.ok) {setUser(null); setSignup(false)}
        })
    }

    const context = {
        user,
        setUser,
        signup,
        setSignup,
        project,
        setProject,
        roles,
        setRoles,
        users,
        setUsers
    }


    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                {user && (location.pathname !== '/login') && <Banner user={user} handleLogout={handleLogout}/>}
                <Outlet context={context} />
            </Box>
        </LocalizationProvider>
    )
}

export default App;