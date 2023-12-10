
import { NavLink } from 'react-router-dom';

function NavBar({userId, handleLogout}) {

    return (
        <nav>
            <NavLink 
                to={`/users/${userId}/accounts`}
            >
                Edit Account
            </NavLink>
            <NavLink 
                to={`/users/${userId}`}
            >
                Home
            </NavLink>
            <NavLink 
                to="/login" 
                onClick={handleLogout} 
            >
                Log Out
            </NavLink>
        </nav>
    )
}

export default NavBar

