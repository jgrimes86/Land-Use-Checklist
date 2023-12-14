import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';

function NavBar({user, handleLogout, handleClose}) {
    const navigate = useNavigate();

    return (
        <>
            <MenuItem 
                onClick={() => {
                    handleClose();
                    navigate(`/users/${user.id}`);
                }}
            >
                Home
            </MenuItem>
            <MenuItem 
                onClick={() => {
                    handleClose();
                    navigate(`/users/${user.id}/account`);
                }}
            >
                Account
            </MenuItem>
            <MenuItem 
                onClick={() => {
                    handleClose();
                    navigate("/login");
                    handleLogout();
                }} 
            >
                Log Out
            </MenuItem>
        </>
    )
}

export default NavBar

