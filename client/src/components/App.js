import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Banner from "./Banner";

const theme = createTheme({
    palette: {
        primary: {
            main:'#2B2D42'
        },
        secondary: {
            main:'#BE7C4D'
        },
      },
})

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
        if ((location.pathname === `/projects/${params.id}/edit`) && (params.id !== 0)) {
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
            <ThemeProvider theme={theme} >
                <Box>
                    {user && (location.pathname !== '/login') && <Banner user={user} handleLogout={handleLogout} setProject={setProject} />}
                    <Outlet context={context} />
                    <Box sx={{height:5}}></Box>
                </Box>
            </ThemeProvider>
        </LocalizationProvider>
    )
}

export default App;