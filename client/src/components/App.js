import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

import SignIn from "./SignIn";
import UserHome from "./UserHome";
import EditUser from "./EditUser";
import TaskTable from "./TaskTable";

function App() {
    const [user, setUser] = useState(null);
    const [signup, setSignup] = useState(false);
    const navigate = useNavigate();

    console.log(user)
    
    
    useEffect(() => {
        fetch('/check_session')
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => {setUser(user)});
            }
            else {
                r.json().then(({error}) => navigate('/login'))
            }
          });
    }, [])


    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then((r) => {
            if (r.ok) {setUser(null); setSignup(false); navigate("/login")}
        })
    }



    if (user) {
        return (
            <ChakraProvider>
                <UserHome user={user} />
                <EditUser user={user} />
                {user && <Button colorScheme="blue" onClick={handleLogout} >Log Out</Button>}
                <TaskTable />
            </ChakraProvider>
        )
    }
    else {
        return (
            <ChakraProvider>
                <SignIn setUser={setUser} signup={signup} setSignup={setSignup} />
            </ChakraProvider>
        )
    }
}

export default App;