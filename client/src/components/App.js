import React, { useEffect, useState } from "react";

import SignIn from "./SignIn";
import UserHome from "./UserHome";

function App() {
    const [user, setUser] = useState(null)
    const [signup, setSignup] = useState(false)

    console.log(user)

    useEffect(() => {
        fetch('/check_session')
        .then((r) => {
            if (r.ok) {
              r.json().then((user) => setUser(user));
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

    if (user) {
        return (
            <div>
                <UserHome user={user} />
                <button onClick={handleLogout} >Log Out</button>

            </div>
        )
    }
    else {
        return (
            <div>
                <SignIn setUser={setUser} signup={signup} setSignup={setSignup} />
            </div>
        )
    }
}

export default App;