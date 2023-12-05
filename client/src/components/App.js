import React, { useState } from "react";

import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";

function App() {
    const [user, setUser] = useState(null)
    const [signup, setSignup] = useState(false)

    console.log(user)


    if (user) return <Home />
    
    return (
        <div>
            {signup ? <Signup setUser={setUser} /> : <Login setUser={setUser} />}
        </div>

    )
}

export default App;