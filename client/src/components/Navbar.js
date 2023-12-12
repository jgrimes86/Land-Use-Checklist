
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';


function NavBar({user, handleLogout}) {
    const navigate = useNavigate();

    return (
        <>
            <MenuItem 
                onClick={() => {
                    navigate(`/users/${user.id}`)
                }}
            >
                Home
            </MenuItem>
            <MenuItem 
                onClick={() => {
                    navigate(`/users/${user.id}/account`)
                }}
            >
                Account
            </MenuItem>
            <MenuItem 
                onClick={() => {
                    navigate("/login")
                    handleLogout()
                }} 
            >
                Log Out
            </MenuItem>
        </>
    )
}

export default NavBar

