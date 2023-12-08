
import { NavLink } from "react-router-dom";

function NavBar() {

    return (
        <nav>
            <NavLink 
                to = "/users/account/:id"
            >
                Edit Account
            </NavLink>
            <NavLink
                to = "/users/home/:id"
            >
                Home
            </NavLink>
            <NavLink
                to = "/signin"
            >
                Log Out
            </NavLink>
        </nav>
    )
}

export default NavBar

