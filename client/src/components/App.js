import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// import SignIn from "./SignIn";
// import UserHome from "./UserHome";
// import EditUser from "./EditUser";
import NavBar from "./Navbar";

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [signup, setSignup] = useState(false);
    const [project, setProject] = useState("");
    const [team, setTeam] = useState("");
    const [users, setUsers] = useState([]);

    // console.log(user)
    
    
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
        setSignup,
        project,
        setProject,
        team,
        setTeam,
        users,
        setUsers
    }


    
    return (
        <div>
            {user && <NavBar userId={user.id} handleLogout={handleLogout} />}
            <Outlet context={context} />
            {/* {user && <button onClick={handleLogout} >Log Out</button>} */}
        </div>
    )
}

export default App;