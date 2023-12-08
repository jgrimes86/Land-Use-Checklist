import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

// import SignIn from "./SignIn";
// import UserHome from "./UserHome";
// import EditUser from "./EditUser";
import NavBar from "./Navbar";

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
                r.json().then(() => navigate('/login'))
            }
          });
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
        setSignup
    }


    
    return (
        <ChakraProvider>
            {user && <NavBar userId={user.id} handleLogout={handleLogout} />}
            <Outlet context={context} />
            {/* {user && <Button colorScheme="blue" onClick={handleLogout} >Log Out</Button>} */}
        </ChakraProvider>
    )
}

export default App;