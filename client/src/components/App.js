import React, { useState } from "react";

import Signup from "./Signup";
import Home from "./Home";

function App() {
    const [user, setUser] = useState(null)

    console.log(user)

    if (user) return <Home />
    return (
        <Signup setUser={setUser} />
    )
}

export default App;